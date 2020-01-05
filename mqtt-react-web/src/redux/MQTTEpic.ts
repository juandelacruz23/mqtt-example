import { Observable, of, concat } from "rxjs";
import {
  switchMapTo,
  map,
  timestamp,
  withLatestFrom,
  startWith,
  mapTo,
  delay,
} from "rxjs/operators";
import { ofType, StateObservable } from "redux-observable";
import { CONNECT, changeValue, BaseAction, AppState } from "./mainDuck";
import { Client } from "../mqtt-observable/MqttObservable";

const MqttClient = new Client("localhost", 5000, "/mqtt", "js-utility-SKNTV");

const onConnect$ = MqttClient.connectObservable().pipe(
  mapTo(
    `INFO - Connection Success [URI: ${MqttClient.host}${MqttClient.path}, ID: ${MqttClient.clientId}]`,
  ),
);

const onDisconnect$ = MqttClient.disconnectObservable().pipe(
  mapTo("INFO - Disconnecting from Server."),
  delay(1000),
);

const MQTTObservable$ = concat(
  of(
    `INFO - Connecting to Server: [Host: ${MqttClient.host}, Port: ${MqttClient.port}, Path: ${MqttClient.path}, ID: ${MqttClient.clientId}]`,
  ),
  onConnect$,
  onDisconnect$,
).pipe(timestamp());

export function sendEventsEpic(
  action$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return action$.pipe(
    ofType(CONNECT),
    switchMapTo(
      concat(
        MQTTObservable$.pipe(
          withLatestFrom(state$),
          map(([event, state]: [ConsoleEvent, AppState]) =>
            changeValue({ events: [...state.events, event] }),
          ),
          startWith(changeValue({ isConnected: true })),
        ),
        of(changeValue({ isConnected: false })),
      ),
    ),
  );
}

export interface ConsoleEvent {
  value: string;
  timestamp: number;
}
