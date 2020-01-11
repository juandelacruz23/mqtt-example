import { createStore, Store, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { reducer, AppState, BaseAction } from "./mainDuck";
import { sendEventsEpic } from "./MQTTEpic";
import { consoleEventsEpic } from "./ConsoleEventsEpic";
import historyEpic from "./HistoryEpic";

export const rootEpic = combineEpics(
  sendEventsEpic,
  consoleEventsEpic,
  historyEpic,
);

const epicMiddleware = createEpicMiddleware<BaseAction, BaseAction, AppState>();

export const store: Store<AppState, BaseAction> = createStore<
  AppState,
  BaseAction,
  {},
  {}
>(reducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
