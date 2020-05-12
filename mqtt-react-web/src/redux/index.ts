import { createStore, Store, applyMiddleware, Action } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { INITIAL_STATE, reducer, AppState } from "./mainDuck";
import { sendEventsEpic } from "./MQTTEpic";
import { consoleEventsEpic } from "./ConsoleEventsEpic";
import historyEpic from "./HistoryEpic";

export const rootEpic = combineEpics(
  sendEventsEpic,
  consoleEventsEpic,
  historyEpic,
);

const epicMiddleware = createEpicMiddleware<Action, Action, AppState>();

export const store: Store<AppState, Action> = createStore<
  AppState,
  Action,
  {},
  {}
>(reducer, INITIAL_STATE, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
