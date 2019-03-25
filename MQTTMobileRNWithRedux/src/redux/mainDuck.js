/**
 * What is a duck?
 * https://github.com/erikras/ducks-modular-redux
 */

import { connectionStatuses, subscriptionStatuses } from "../statuses";

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
