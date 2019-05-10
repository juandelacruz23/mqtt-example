import { createStore, Store } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer, AppState, AppAction } from "./mainDuck";

const persistConfig: PersistConfig = {
  key: "root",
  storage,
  blacklist: [
    "connectionStatus",
    "subscriptionStatus",
    "showMessageDialog",
    "loading",
  ],
};

const persistedReducer = persistReducer<AppState, AppAction>(persistConfig, reducer);

export const store: Store<AppState, AppAction> = createStore<AppState, AppAction, {}, {}>(persistedReducer);
export const persistor = persistStore(store);
