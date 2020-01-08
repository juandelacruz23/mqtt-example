import { Observable } from "rxjs";
import { ofType, StateObservable } from "redux-observable";
import { withLatestFrom, map } from "rxjs/operators";
import {
  CONSOLE_EVENT,
  AppState,
  changeValue,
  BaseAction,
  ConsoleEventAction,
} from "./mainDuck";

export function consoleEventsEpic(
  actions$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return actions$.pipe(
    ofType<BaseAction, ConsoleEventAction>(CONSOLE_EVENT),
    withLatestFrom(state$),
    map(([consoleAction, state]: [ConsoleEventAction, AppState]) =>
      changeValue({ events: [...state.events, consoleAction.payload] }),
    ),
  );
}
