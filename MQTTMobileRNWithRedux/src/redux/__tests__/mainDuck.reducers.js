import { reducer, changeValue } from "../mainDuck";

describe("main reducer", () => {
  it("should return initialState as default", () => {
    expect(reducer()).toMatchSnapshot();
  });

  it("should handle CHANGE_VALUE action with initialState", () => {
    const action1 = changeValue({ host: "fake value" });
    expect(reducer(undefined, action1)).toHaveProperty("host", "fake value");
  });
});
