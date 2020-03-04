import { createStore, Store, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { INITIAL_STATE ,reducer, AppState, BaseAction, AppAction } from "./mainDuck";
import { sendEventsEpic } from "./MQTTEpic";
import { consoleEventsEpic } from "./ConsoleEventsEpic";
import historyEpic from "./HistoryEpic";

export const rootEpic = combineEpics(
  sendEventsEpic,
  consoleEventsEpic,
  historyEpic,
);

const epicMiddleware = createEpicMiddleware<BaseAction, BaseAction, AppState>();

export const store: Store<AppState, AppAction<object>> = createStore<
  AppState,
  AppAction<object>,
  {},
  {}
>(reducer, INITIAL_STATE, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
