import reducer, { add, clear } from "../consoleEventsSlice";
import getTimestamp from "../../../utils/getTimestamp";
jest.mock("../../../utils/getTimestamp");

describe("slice", () => {
  test("add", () => {
    const fakeValue = "fake value";
    const fakeTimestamp = getTimestamp();
    const action = add({
      value: fakeValue,
      timestamp: fakeTimestamp,
    });

    // actions
    expect(action).toMatchSnapshot();

    // reducer
    const newState = reducer([], action);
    expect(newState).toEqual([action.payload]);
  });
  test("clear", () => {
    const action = clear();

    // actions
    expect(action).toMatchSnapshot();

    //reducer
    const newState = reducer(undefined, action);
    expect(newState).toEqual([]);
  });
});
