/**
 * What is a duck?
 * https://github.com/erikras/ducks-modular-redux
 */

import { connectionStatuses, subscriptionStatuses } from "../statuses";

const CHANGE_VALUE = "CHANGE_VALUE";
const PUSH_TEXT = "PUSH_TEXT";

export const changeValue = newValue => ({
  type: CHANGE_VALUE,
  payload: newValue,
});

export const pushText = text => ({
  type: PUSH_TEXT,
  payload: text,
});

const initialState = {
  text: [],
  connectionStatus: connectionStatuses.DISCONNECTED,
  subscriptionStatus: subscriptionStatuses.UNSUBSCRIBED,
  host: "",
  port: "",
  topic: "",
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_VALUE:
      return { ...state, ...action.payload };
    case PUSH_TEXT:
      return { ...state, text: [...state.text, action.payload] };
    default:
      return state;
  }
}
