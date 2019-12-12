import { Action } from "redux";
import MQTTOptions from "../paho.mqtt.types/MQTTOptions";

const CHANGE_VALUE = "CHANGE_VALUE";
export const CONNECT = "CONNECT";

export interface AppAction<T> extends Action<string> {
  type: string;
  payload?: T;
}

export interface BaseAction extends AppAction<object> {
  type: string;
  payload?: object;
}

export function changeValue(newValue: object): AppAction<object> {
  return {
    type: CHANGE_VALUE,
    payload: newValue,
  } as const;
}

export function connectClient(
  mqttOptions: MQTTOptions,
): AppAction<MQTTOptions> {
  return {
    type: CONNECT,
    payload: mqttOptions,
  } as const;
}

const INITIAL_STATE = {
  host: "",
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
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
