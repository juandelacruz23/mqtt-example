import "../date.mock";
import { reducer, changeValue } from "../mainDuck";

describe("main reducer", () => {
  it("should return initialState as default", () => {
    expect(reducer()).toMatchSnapshot();
  });
  it("should handle CHANGE_VALUE action with initialState", () => {
    const action = changeValue({ host: "fake value" });
    expect(reducer(undefined, action)).toHaveProperty("host", "fake value");
  });
});
