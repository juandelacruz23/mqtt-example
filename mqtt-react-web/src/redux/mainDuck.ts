import { createAction, getType } from "typesafe-actions";
import MQTTOptions from "../types/MQTTOptions";
import HistoryItem from "../types/HistoryItem";
import { ConsoleEvent } from "./MQTTEpic";
import Subscription from "../types/Subscription";

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

export type AppAction = BaseAction | PayloadlessAction | StringAction;

export const changeValue = createAction(
  CHANGE_VALUE,
  (payload: object) => payload,
)();

export const connectClient = createAction(
  CONNECT,
  (mqttOptions: MQTTOptions) => mqttOptions,
)();

export const consoleEvent = createAction(
  CONSOLE_EVENT,
  (event: ConsoleEvent) => event,
)();

export const disconnectClient = createAction(DISCONNECT)();

export const messageReceived = createAction(
  MESSAGE_RECEIVED,
  (newMessage: HistoryItem) => newMessage,
)();

export const subscribe = createAction(
  SUBSCRIBE,
  (subscription: Subscription) => subscription,
)();

export const unsubscribe = createAction(
  UNSUBSCRIBE,
  (topic: string) => topic,
)();

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

export function reducer(
  state: AppState = INITIAL_STATE,
  action: BaseAction,
): AppState {
  switch (action.type) {
    case getType(changeValue):
    case getType(connectClient):
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
