import { Action } from "redux";
import { Observable } from "rxjs";
import { StateObservable } from "redux-observable";
import { withLatestFrom, map, filter } from "rxjs/operators";
import { AppState, changeValue, messageReceived } from "./mainDuck";

export default function HistoryEpic(
  actions$: Observable<Action>,
  state$: StateObservable<AppState>,
) {
  return actions$.pipe(
    filter(messageReceived.match),
    withLatestFrom(state$),
    map(([action, state]) =>
      changeValue({ messages: [...state.messages, action.payload] }),
    ),
  );
}
