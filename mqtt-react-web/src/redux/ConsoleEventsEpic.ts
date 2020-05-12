import { Observable } from "rxjs";
import { StateObservable } from "redux-observable";
import { withLatestFrom, map, filter } from "rxjs/operators";
import { AppState, changeValue, BaseAction, consoleEvent } from "./mainDuck";

export function consoleEventsEpic(
  actions$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return actions$.pipe(
    filter(consoleEvent.match),
    withLatestFrom(state$),
    map(([consoleAction, state]) =>
      changeValue({ events: [...state.events, consoleAction.payload] }),
    ),
  );
}
