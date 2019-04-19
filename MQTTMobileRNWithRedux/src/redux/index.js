import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer } from "./mainDuck";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["connectionStatus", "subscriptionStatus", "showMessageDialog"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
