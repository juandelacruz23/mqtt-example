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
} from "rxjs/operators";
import { ofType } from "redux-observable";
import {
  CONNECT,
  changeValue,
  BaseAction,
  DISCONNECT,
  MQTTConnectAction,
  consoleEvent,
  messageReceived,
  SUBSCRIBE,
  SubscribeAction,
  UNSUBSCRIBE,
} from "./mainDuck";
import { Client } from "../mqtt-observable/MqttObservable";

export function sendEventsEpic(
  action$: Observable<BaseAction>,
): Observable<BaseAction> {
  return action$.pipe(
    ofType<BaseAction, MQTTConnectAction>(CONNECT),
    switchMap<MQTTConnectAction, Observable<BaseAction>>(
      ({ payload }: MQTTConnectAction) => {
        const MqttClient = new Client(
          payload.host,
          payload.port,
          payload.path,
          payload.clientId,
        );
        const onConnect$ = MqttClient.connectObservable().pipe(
          mapTo(
            `INFO - Connection Success [URI: ${MqttClient.host}${MqttClient.path}, ID: ${MqttClient.clientId}]`,
          ),
        );

        const onDisconnect$ = MqttClient.disconnectObservable().pipe(
          mapTo("INFO - Disconnecting from server."),
        );

        const disconnect$ = action$.pipe(
          ofType(DISCONNECT),
          take(1),
          switchMapTo(onDisconnect$),
          share(),
        );

        const connectionEvents$: Observable<string> = concat(
          of(
            `INFO - Connecting to Server: [Host: ${MqttClient.host}, Port: ${MqttClient.port}, Path: ${MqttClient.path}, ID: ${MqttClient.clientId}]`,
          ),
          onConnect$,
        );
        const topic = "message";
        const messages$ = action$.pipe(
          ofType<BaseAction, SubscribeAction>(SUBSCRIBE),
          switchMap(({ payload }) =>
            MqttClient.subscribeObservable(payload.topic).pipe(
              takeUntil(action$.pipe(ofType(UNSUBSCRIBE))),
            ),
          ),
          map(message =>
            messageReceived({
              time: new Date(),
              qos: message.qos,
              payload: message.payloadString,
              topic,
            }),
          ),
          takeUntil(disconnect$),
        );

        const consoleEvents$ = merge(connectionEvents$, disconnect$).pipe(
          timestamp(),
          map(consoleEvent),
        );

        return merge(consoleEvents$, messages$).pipe(
          startWith(changeValue({ isConnected: true })),
          endWith(changeValue({ isConnected: false })),
        );
      },
    ),
  );
}

export interface ConsoleEvent {
  value: string;
  timestamp: number;
}
