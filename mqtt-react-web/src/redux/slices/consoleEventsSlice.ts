import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ConsoleEvent from "../../types/ConsoleEvents";
import getTimestamp from "../../utils/getTimestamp";

const initialState = [
  {
    value: "INFO - Starting Eclipse Paho JavaScript Utility.",
    timestamp: getTimestamp(),
  },
];

type SliceState = typeof initialState;

const consoleEventsSlice = createSlice({
  name: "consoleEvents",
  initialState,
  reducers: {
    add(state: SliceState, action: PayloadAction<ConsoleEvent>) {
      state.push(action.payload);
    },
    clear: () => [],
  },
});

export const { add, clear } = consoleEventsSlice.actions;

const consoleEventsReducer = consoleEventsSlice.reducer;
export default consoleEventsReducer;
