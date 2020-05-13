import { createAction, createSlice, CaseReducer } from "@reduxjs/toolkit";
import MQTTOptions from "../../types/MQTTOptions";
import Subscription from "../../types/Subscription";

const initialState = {
  host: "",
  isConnected: false,
  port: 0,
  clientId: ``,
  path: "",
  topic: "message",
};

type ConfigState = typeof initialState;

function getName(actionName: string) {
  return `config/${actionName}`;
}

export const changeValue = createAction<Partial<ConfigState>>(
  getName("CHANGE_VALUE"),
);
export const connectClient = createAction<MQTTOptions>(getName("CONNECT"));
export const disconnectClient = createAction(getName("DISCONNECT"));
export const subscribe = createAction<Subscription>(getName("SUBSCRIBE"));
export const unsubscribe = createAction<string>(getName("UNSUBSCRIBE"));

const changeValueCase: CaseReducer<
  ConfigState,
  ReturnType<typeof changeValue> | ReturnType<typeof connectClient>
> = (state, action) => ({ ...state, ...action.payload });

export const slice = createSlice({
  name: "MQTTConfig",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(changeValue, changeValueCase)
      .addCase(connectClient, changeValueCase),
});

const mqttConfigReducer = slice.reducer;
export default mqttConfigReducer;
