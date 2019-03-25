import { reducer, changeValue, pushText, changeAndPush } from "../mainDuck";

describe("main reducer", () => {
  it("should return initialState as default", () => {
    expect(reducer()).toMatchSnapshot();
  });

  it("should handle CHANGE_VALUE action with initialState", () => {
    const action1 = changeValue({ host: "fake value" });
    expect(reducer(undefined, action1)).toHaveProperty("host", "fake value");
  });

  it("should handle PUSH_TEXT action with initialState", () => {
    const { text: result1 } = reducer(undefined, pushText("fake text 1"));
    const { text: result2 } = reducer(undefined, pushText("fake text 2"));
    expect(result1).toContain("fake text 1");
    expect(result2).toContain("fake text 2");
  });

  it("should handle CHANGE_AND_PUSH action with initialState", () => {
    const result1 = reducer(
      undefined,
      changeAndPush({ host: "fake host" }, "fake text 1")
    );
    const result2 = reducer(
      undefined,
      changeAndPush({ port: "fake port" }, "fake text 2")
    );
    expect(result1).toHaveProperty("host", "fake host");
    expect(result1.text).toContain("fake text 1");
    expect(result2).toHaveProperty("port", "fake port");
    expect(result2.text).toContain("fake text 2");
  });
});
