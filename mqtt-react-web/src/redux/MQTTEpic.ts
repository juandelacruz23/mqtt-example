import { Observable, from, of, concat } from "rxjs";
import {
  switchMapTo,
  delay,
  map,
  concatMap,
  timestamp,
  withLatestFrom,
  startWith,
} from "rxjs/operators";
import { ofType, StateObservable } from "redux-observable";
import { CONNECT, changeValue, BaseAction, AppState } from "./mainDuck";

const consoleEvents$ = from([
  "INFO - Connecting to Server: [Host: localhost, Port: 5000, Path: /mqtt, ID: js-utility-BnDHz]",
  "INFO - Connection Success [URI: localhost:5000/mqtt, ID: js-utility-BnDHz]",
  "INFO - Subscribing to: [Topic: message, QoS: 0]",
  "INFO - Message Recieved: [Topic: message, Payload: Mqtt is still awesome at 22/11/2019 11:13:37 a. m., QoS: 0, Retained: false, Duplicate: false]",
]).pipe(
  concatMap(x => of(x).pipe(delay(500))),
  timestamp(),
);

export function sendEventsEpic(
  action$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return action$.pipe(
    ofType(CONNECT),
    switchMapTo(
      concat(
        consoleEvents$.pipe(
          withLatestFrom(state$),
          map(([event, state]) =>
            changeValue({ events: [...state.events, event] }),
          ),
          startWith(changeValue({ isConnected: true })),
        ),
        of(changeValue({ isConnected: false })),
      ),
    ),
  );
}
