import { Action } from "redux";
import { Observable, of, concat, merge } from "rxjs";
import {
  map,
  timestamp,
  startWith,
  mapTo,
  switchMap,
  endWith,
  switchMapTo,
  take,
  takeUntil,
  catchError,
  filter,
} from "rxjs/operators";

import {
  connectClient,
  disconnectClient,
  subscribe,
  unsubscribe,
  changeValue,
} from "../slices/mqttConfigSlice";
import { messageReceived } from "../slices/messagesSlice";
import { add } from "../slices/consoleEventsSlice";
import { Client, ConnectionError } from "../../mqtt-observable/MqttObservable";
import getTimestamp from "../../utils/getTimestamp";

export default function MQTTEpic(action$: Observable<Action>) {
  return action$.pipe(
    filter(connectClient.match),
    switchMap(({ payload }) => {
      const MqttClient = new Client(
        payload.host,
        payload.port,
        payload.path,
        payload.clientId,
      );
      let connectionOptions;
      if (payload.userName && payload.password) {
        connectionOptions = {
          userName: payload.userName,
          password: payload.password,
        };
      }

      const onConnect$ = MqttClient.connectObservable(connectionOptions).pipe(
        mapTo(
          `INFO - Connection Success [URI: ${MqttClient.host}${MqttClient.path}, ID: ${MqttClient.clientId}]`,
        ),
        catchError((error: ConnectionError) =>
          of(
            `ERROR - Code: ${error.errorCode}, Message: ${error.errorMessage}`,
          ),
        ),
      );

      const onDisconnect$ = MqttClient.disconnectObservable().pipe(
        mapTo("INFO - Disconnecting from server."),
        catchError(error => of(`ERROR - ${error}`)),
      );

      const disconnect$ = action$.pipe(
        filter(disconnectClient.match),
        take(1),
        switchMapTo(onDisconnect$),
      );

      const connectionEvents$: Observable<string> = concat(
        of(
          `INFO - Connecting to Server: [Host: ${MqttClient.host}, Port: ${MqttClient.port}, Path: ${MqttClient.path}, ID: ${MqttClient.clientId}]`,
        ),
        onConnect$,
      );
      const messages$ = action$.pipe(
        filter(subscribe.match),
        switchMap(({ payload }) =>
          MqttClient.subscribeObservable(payload.topic).pipe(
            map(message =>
              messageReceived({
                time: getTimestamp(),
                qos: message.qos,
                payload: message.payloadString,
                topic: payload.topic,
              }),
            ),
          ),
        ),
        takeUntil(disconnect$),
      );

      const unsubscribe$ = action$.pipe(
        filter(unsubscribe.match),
        switchMap(({ payload }) =>
          MqttClient.unsubscribeObservable(payload).pipe(
            map(() => `INFO - Unsubscribed. [Topic: ${payload}]`),
            startWith(`INFO - Unsubscribing. [Topic: ${payload}]`),
          ),
        ),
        takeUntil(disconnect$),
      );

      const consoleEvents$ = merge(
        connectionEvents$,
        disconnect$,
        action$.pipe(
          filter(subscribe.match),
          map(
            ({ payload }) =>
              `INFO - Subscribing to: [Topic: ${payload.topic}, QoS: ${payload.qos}]`,
          ),
          takeUntil(disconnect$),
        ),
        unsubscribe$,
      ).pipe(timestamp(), map(add));

      return merge(consoleEvents$, messages$).pipe(
        startWith(changeValue({ isConnected: true })),
        endWith(changeValue({ isConnected: false })),
      );
    }),
  );
}
