import { StateObservable } from "redux-observable";
import { AppState, BaseAction, changeValue, messageReceived } from "./mainDuck";
import { Observable } from "rxjs";
import { withLatestFrom, map, filter } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

export default function HistoryEpic(
  actions$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return actions$.pipe(
    filter(isActionOf(messageReceived)),
    withLatestFrom(state$),
    map(([action, state]) =>
      changeValue({ messages: [...state.messages, action.payload] }),
    ),
  );
}
