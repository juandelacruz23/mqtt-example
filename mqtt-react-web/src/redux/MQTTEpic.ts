import { Observable, of, concat, merge } from "rxjs";
import {
  map,
  timestamp,
  withLatestFrom,
  startWith,
  mapTo,
  switchMap,
  endWith,
  switchMapTo,
  take,
} from "rxjs/operators";
import { ofType, StateObservable } from "redux-observable";
import {
  CONNECT,
  changeValue,
  BaseAction,
  AppState,
  DISCONNECT,
  MQTTConnectAction,
} from "./mainDuck";
import { Client } from "../mqtt-observable/MqttObservable";

export function sendEventsEpic(
  action$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
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

        const disconnect$ = MqttClient.disconnectObservable().pipe(
          mapTo("INFO - Disconnecting from server."),
        );

        const connectionEvents$: Observable<string> = concat(
          of(
            `INFO - Connecting to Server: [Host: ${MqttClient.host}, Port: ${MqttClient.port}, Path: ${MqttClient.path}, ID: ${MqttClient.clientId}]`,
          ),
          onConnect$,
        );

        return merge(
          connectionEvents$,
          action$.pipe(ofType(DISCONNECT), switchMapTo(disconnect$), take(1)),
        ).pipe(
          timestamp(),
          withLatestFrom(state$),
          map(([event, state]: [ConsoleEvent, AppState]) =>
            changeValue({ events: [...state.events, event] }),
          ),
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
