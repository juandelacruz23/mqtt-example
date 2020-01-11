import { StateObservable, ofType } from "redux-observable";
import {
  AppState,
  BaseAction,
  MESSAGE_RECEIVED,
  MesssageReceivedAction,
  changeValue,
} from "./mainDuck";
import { Observable } from "rxjs";
import { withLatestFrom, map } from "rxjs/operators";

export default function HistoryEpic(
  actions$: Observable<BaseAction>,
  state$: StateObservable<AppState>,
): Observable<BaseAction> {
  return actions$.pipe(
    ofType<BaseAction, MesssageReceivedAction>(MESSAGE_RECEIVED),
    withLatestFrom(state$),
    map(([action, state]: [MesssageReceivedAction, AppState]) =>
      changeValue({ messages: [...state.messages, action.payload] }),
    ),
  );
}
