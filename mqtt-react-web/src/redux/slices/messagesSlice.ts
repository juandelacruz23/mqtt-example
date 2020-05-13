import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HistoryItem from "../../types/HistoryItem";

type MessagesState = HistoryItem[];

const initialState: MessagesState = [];

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messageReceived(state, action: PayloadAction<HistoryItem>) {
      state.push(action.payload);
    },
  },
});

export const { messageReceived } = slice.actions;

const messagesReducer = slice.reducer;
export default messagesReducer;
