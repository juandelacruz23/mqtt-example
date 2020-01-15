import { Action } from "redux";
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

export interface AppAction<T> extends Action<string> {
  type: string;
  payload?: T;
}

export type FixedAppAction<T> = Required<AppAction<T>>;

export type BaseAction = FixedAppAction<object>;

export function changeValue(newValue: object): BaseAction {
  return {
    type: CHANGE_VALUE,
    payload: newValue,
  } as const;
}

export function connectClient(
  mqttOptions: MQTTOptions,
): FixedAppAction<MQTTOptions> {
  return {
    type: CONNECT,
    payload: mqttOptions,
  } as const;
}

export type MQTTConnectAction = ReturnType<typeof connectClient>;

export function consoleEvent(
  event: ConsoleEvent,
): FixedAppAction<ConsoleEvent> {
  return {
    type: CONSOLE_EVENT,
    payload: event,
  } as const;
}

export type ConsoleEventAction = ReturnType<typeof consoleEvent>;

/* eslint-disable */
export function messageReceived(newMessage: HistoryItem) {
  return {
    type: MESSAGE_RECEIVED,
    payload: newMessage,
  } as const;
}

export type MesssageReceivedAction = ReturnType<typeof messageReceived>;

export function disconnectClient(): AppAction<undefined> {
  return {
    type: DISCONNECT,
  };
}

export function subscribe(subscription: Subscription) {
  return {
    type: SUBSCRIBE,
    payload: subscription,
  };
}

export type SubscribeAction = ReturnType<typeof subscribe>;

export function unsubscribe() {
  return {
    type: UNSUBSCRIBE,
  };
}

export type UnsubscribeAction = ReturnType<typeof unsubscribe>;
/* eslint-enable */

const INITIAL_STATE = {
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
  action: AppAction<object> = { type: "DEFAULT" },
): AppState {
  switch (action.type) {
    case CHANGE_VALUE:
    case CONNECT:
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
