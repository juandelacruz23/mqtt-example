import { createAction } from "@reduxjs/toolkit";
import HistoryItem from "../types/HistoryItem";
import MQTTOptions from "../types/MQTTOptions";
import Subscription from "../types/Subscription";
import ConsoleEvent from "../types/ConsoleEvents";

const CHANGE_VALUE = "CHANGE_VALUE";
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";
export const CONSOLE_EVENT = "CONSOLE_EVENT";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export interface BaseAction {
  readonly type: string;
  readonly payload: object;
}

export interface StringAction {
  readonly type: string;
  readonly payload: string;
}

export interface PayloadlessAction {
  readonly type: string;
}

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

export type AppAction = BaseAction | PayloadlessAction | StringAction;

export const changeValue = createAction<Partial<AppState>>(CHANGE_VALUE);

export const connectClient = createAction<MQTTOptions>(CONNECT);

export const consoleEvent = createAction<ConsoleEvent>(CONSOLE_EVENT);

export const disconnectClient = createAction(DISCONNECT);

export const messageReceived = createAction<HistoryItem>(MESSAGE_RECEIVED);

export const subscribe = createAction<Subscription>(SUBSCRIBE);

export const unsubscribe = createAction<string>(UNSUBSCRIBE);

export function reducer(
  state: AppState = INITIAL_STATE,
  action: BaseAction,
): AppState {
  switch (action.type) {
    case changeValue.type:
    case connectClient.type:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default {
  connectClient,
  changeValue,
  disconnectClient,
};
