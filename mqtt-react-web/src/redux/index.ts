import { createStore, Store } from "redux";

import { reducer, AppState, AppAction } from "./mainDuck";

export const store: Store<AppState, AppAction> = createStore<
  AppState,
  AppAction,
  {},
  {}
>(reducer);
