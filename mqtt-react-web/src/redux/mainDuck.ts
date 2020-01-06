import { Action } from "redux";
import MQTTOptions from "../paho.mqtt.types/MQTTOptions";

const CHANGE_VALUE = "CHANGE_VALUE";
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";

export interface AppAction<T> extends Action<string> {
  type: string;
  payload?: T;
}

export interface FixedAppAction<T> extends AppAction<T> {
  payload: T;
}

export interface BaseAction extends FixedAppAction<object> {
  payload: object;
}

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

export function disconnectClient(): AppAction<undefined> {
  return {
    type: DISCONNECT,
  };
}

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
};

export type AppState = typeof INITIAL_STATE;

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
