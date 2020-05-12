import { createAction, createReducer } from "@reduxjs/toolkit";
import HistoryItem from "../types/HistoryItem";
import MQTTOptions from "../types/MQTTOptions";
import Subscription from "../types/Subscription";
import ConsoleEvent from "../types/ConsoleEvents";

export const INITIAL_STATE = {
  host: "",
  isConnected: false,
  port: 0,
  clientId: ``,
  path: "",
  events: [
    {
      value: "INFO - Starting Eclipse Paho JavaScript Utility.",
      timestamp: Date.now(),
    },
  ],
  messages: [],
  topic: "message",
};

// Little hack to override the "messages" type
export type AppState = Omit<typeof INITIAL_STATE, "messages"> & {
  messages: HistoryItem[];
};

export const changeValue = createAction<Partial<AppState>>("CHANGE_VALUE");

export const connectClient = createAction<MQTTOptions>("CONNECT");

export const consoleEvent = createAction<ConsoleEvent>("CONSOLE_EVENT");

export const disconnectClient = createAction("DISCONNECT");

export const messageReceived = createAction<HistoryItem>("MESSAGE_RECEIVED");

export const subscribe = createAction<Subscription>("SUBSCRIBE");

export const unsubscribe = createAction<string>("UNSUBSCRIBE");

export const reducer = createReducer<AppState>(INITIAL_STATE, builder =>
  builder
    .addCase(changeValue, (state, action) => ({ ...state, ...action.payload }))
    .addCase(connectClient, (state, action) => ({
      ...state,
      ...action.payload,
    })),
);

export default {
  connectClient,
  changeValue,
  disconnectClient,
};
