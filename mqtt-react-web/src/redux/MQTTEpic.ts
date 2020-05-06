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
  share,
  catchError,
  filter,
} from "rxjs/operators";
import { ofType } from "redux-observable";
import {
  BaseAction,
  changeValue,
  consoleEvent,
  messageReceived,
  DISCONNECT,
  connectClient,
  subscribe,
  unsubscribe,
} from "./mainDuck";
import { Client, ConnectionError } from "../mqtt-observable/MqttObservable";
import { isActionOf } from "typesafe-actions";

export function sendEventsEpic(action$: Observable<BaseAction>) {
  return action$.pipe(
    filter(isActionOf(connectClient)),
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
        ofType(DISCONNECT),
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
        filter(isActionOf(subscribe)),
        switchMap(({ payload }) =>
          MqttClient.subscribeObservable(payload.topic).pipe(
            map(message =>
              messageReceived({
                time: new Date(),
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
        filter(isActionOf(unsubscribe)),
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
          filter(isActionOf(subscribe)),
          map(
            ({ payload }) =>
              `INFO - Subscribing to: [Topic: ${payload.topic}, QoS: ${payload.qos}]`,
          ),
          takeUntil(disconnect$),
        ),
        unsubscribe$,
      ).pipe(timestamp(), map(consoleEvent));

      return merge(consoleEvents$, messages$).pipe(
        startWith(changeValue({ isConnected: true })),
        endWith(changeValue({ isConnected: false })),
      );
    }),
  );
}

export interface ConsoleEvent {
  value: string;
  timestamp: number;
}
