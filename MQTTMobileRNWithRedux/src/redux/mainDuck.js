/**
 * What is a duck?
 * https://github.com/erikras/ducks-modular-redux
 */

import { connectionStatuses, subscriptionStatuses } from "../statuses";

const CHANGE_VALUE = "CHANGE_VALUE";

export const changeValue = newValue => ({
  type: CHANGE_VALUE,
  payload: newValue,
});

const initialState = {
  text: [],
  connectionStatus: connectionStatuses.DISCONNECTED,
  subscriptionStatus: subscriptionStatuses.UNSUBSCRIBED,
  host: "",
  port: "",
  topic: "",
};

export function reducer(state = initialState) {
  return state;
}
