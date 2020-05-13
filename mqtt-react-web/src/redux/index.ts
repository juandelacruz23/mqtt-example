import { combineReducers } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import MQTTEpic from "./epics/MQTTEpic";
import mqttConfigReducer from "./slices/mqttConfigSlice";
import consoleEventsReducer from "./slices/consoleEventsSlice";
import messagesReducer from "./slices/messagesSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  mqttConfig: mqttConfigReducer,
  consoleEvents: consoleEventsReducer,
  messages: messagesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const rootEpic = combineEpics(MQTTEpic);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false, // or true if you want to use thunks
    }),
    epicMiddleware,
  ],
});

epicMiddleware.run(rootEpic);
