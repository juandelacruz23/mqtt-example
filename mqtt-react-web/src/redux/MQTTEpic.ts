import { Observable, of, concat } from "rxjs";
import {
  map,
  timestamp,
  withLatestFrom,
  startWith,
  mapTo,
  delay,
  switchMap,
  endWith,
} from "rxjs/operators";
import { ofType, StateObservable } from "redux-observable";
import { CONNECT, changeValue, BaseAction, AppState } from "./mainDuck";
import { Client } from "../mqtt-observable/MqttObservable";

export function sendEventsEpic(
  action$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return action$.pipe(
    ofType(CONNECT),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const MqttClient = new Client(
        state.host,
        state.port,
        state.path,
        state.clientId,
      );

      const onConnect$ = MqttClient.connectObservable().pipe(
        mapTo(
          `INFO - Connection Success [URI: ${MqttClient.host}${MqttClient.path}, ID: ${MqttClient.clientId}]`,
        ),
      );

      const onDisconnect$ = MqttClient.disconnectObservable().pipe(
        mapTo("INFO - Disconnecting from Server."),
        delay(1000),
      );

      return concat(
        of(
          `INFO - Connecting to Server: [Host: ${MqttClient.host}, Port: ${MqttClient.port}, Path: ${MqttClient.path}, ID: ${MqttClient.clientId}]`,
        ),
        onConnect$,
        onDisconnect$,
      ).pipe(
        timestamp(),
        withLatestFrom(state$),
        map(([event, state]: [ConsoleEvent, AppState]) =>
          changeValue({ events: [...state.events, event] }),
        ),
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
