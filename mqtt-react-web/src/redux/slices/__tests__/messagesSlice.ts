import reducer, { messageReceived } from "../messagesSlice";
import HistoryItem from "../../../types/HistoryItem";
import getTimestamp from "../../../utils/getTimestamp";

describe("add", () => {
  const fakeMessage: HistoryItem = {
    payload: "fake payload",
    time: getTimestamp(),
    qos: 0,
    topic: "fakt topic",
  };
  const action = messageReceived(fakeMessage);
  test("action", () => {
    expect(action).toEqual({
      type: messageReceived.type,
      payload: fakeMessage,
    });
  });
  test("reducer", () => {
    const newState = reducer(undefined, action);
    expect(newState).toEqual([fakeMessage]);
  });
});
