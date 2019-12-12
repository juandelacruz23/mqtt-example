import { createStore, Store, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { reducer, AppState, BaseAction } from "./mainDuck";
import { sendEventsEpic } from "./MQTTEpic";

export const rootEpic = combineEpics(sendEventsEpic);

const epicMiddleware = createEpicMiddleware<BaseAction, BaseAction, AppState>();

export const store: Store<AppState, BaseAction> = createStore<
  AppState,
  BaseAction,
  {},
  {}
>(reducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
