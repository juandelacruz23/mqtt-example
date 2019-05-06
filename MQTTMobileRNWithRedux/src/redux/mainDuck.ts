/**
 * What is a duck?
 * https://github.com/erikras/ducks-modular-redux
 */

import { Action } from "redux";
import ConnectionStatus from "../ConnectionStatus";
import SubscriptionStatus from "../SubscriptionStatus";

const CHANGE_AND_PUSH = "CHANGE_AND_PUSH";
const CHANGE_VALUE = "CHANGE_VALUE";
const PUSH_TEXT = "PUSH_TEXT";

export interface AppAction extends Action<string> {
  type: string,
  payload?: any,
}

export const changeAndPush = (newValue: Object, textToPush: string) : AppAction => ({
  type: CHANGE_AND_PUSH,
  payload: {
    value: newValue,
    text: textToPush,
  },
});

export const changeValue = (newValue: Object) : AppAction => ({
  type: CHANGE_VALUE,
  payload: newValue,
});

export const pushText = (text: string): AppAction => ({
  type: PUSH_TEXT,
  payload: text,
});

export interface AppState {
  connectionStatus: ConnectionStatus,
  host: string,
  loading: boolean,
  message: string,
  port: string,
  showMessageDialog: boolean,
  subscriptionStatus: SubscriptionStatus,
  text: string[],
  topic: string,
}

const initialState: AppState = {
  text: [],
  connectionStatus: ConnectionStatus.DISCONNECTED,
  subscriptionStatus: SubscriptionStatus.UNSUBSCRIBED,
  host: "",
  port: "",
  topic: "",
  showMessageDialog: false,
  message: "",
  loading: false,
};

export function reducer(state = initialState, action: AppAction = { type: 'DEFAULT'} ): AppState {
  switch (action.type) {
    case CHANGE_AND_PUSH:
      return {
        ...state,
        ...action.payload.value,
        text: [...state.text, action.payload.text],
      };
    case CHANGE_VALUE:
      return { ...state, ...action.payload };
    case PUSH_TEXT:
      return { ...state, text: [...state.text, action.payload] };
    default:
      return state;
  }
}
