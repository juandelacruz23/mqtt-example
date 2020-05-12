import { Action } from "redux";
import { Observable } from "rxjs";
import { withLatestFrom, map, filter } from "rxjs/operators";
import { StateObservable } from "redux-observable";
import { AppState, changeValue, consoleEvent } from "./mainDuck";

export function consoleEventsEpic(
  actions$: Observable<Action>,
  state$: StateObservable<AppState>,
) {
  return actions$.pipe(
    filter(consoleEvent.match),
    withLatestFrom(state$),
    map(([consoleAction, state]) =>
      changeValue({ events: [...state.events, consoleAction.payload] }),
    ),
  );
}
