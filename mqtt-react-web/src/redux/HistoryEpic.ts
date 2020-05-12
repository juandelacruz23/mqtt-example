import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { withLatestFrom, map, filter } from "rxjs/operators";
import { AppState, BaseAction, changeValue, messageReceived } from "./mainDuck";

export default function HistoryEpic(
  actions$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return actions$.pipe(
    filter(messageReceived.match),
    withLatestFrom(state$),
    map(([action, state]) =>
      changeValue({ messages: [...state.messages, action.payload] }),
    ),
  );
}
