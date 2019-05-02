/**
 * What is a duck?
 * https://github.com/erikras/ducks-modular-redux
 */

import { connectionStatuses, subscriptionStatuses } from "../statuses";

const CHANGE_AND_PUSH = "CHANGE_AND_PUSH";
const CHANGE_VALUE = "CHANGE_VALUE";
const PUSH_TEXT = "PUSH_TEXT";

export const changeAndPush = (newValue, textToPush) => ({
  type: CHANGE_AND_PUSH,
  payload: {
    value: newValue,
    text: textToPush,
  },
});

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
  showMessageDialog: false,
  message: "",
  connecting: false,
};

export function reducer(state = initialState, action = {}) {
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
