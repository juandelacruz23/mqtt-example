import { Action } from "redux";

const CHANGE_VALUE = "CHANGE_VALUE";

export interface AppAction extends Action<string> {
  type: string;
  payload?: object;
}

export function changeValue(newValue: object): AppAction {
  return {
    type: CHANGE_VALUE,
    payload: newValue,
  } as const;
}

const INITIAL_STATE = {
  host: "",
  port: 0,
  clientId: ``,
  path: "",
};

export type AppState = typeof INITIAL_STATE;

export function reducer(
  state: AppState = INITIAL_STATE,
  action: AppAction = { type: "DEFAULT" },
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
