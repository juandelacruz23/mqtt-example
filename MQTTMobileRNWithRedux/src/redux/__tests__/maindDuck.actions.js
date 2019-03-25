import { changeValue, pushText } from "../mainDuck";

describe("change value action", () => {
  it("should return CHANGE_VALUE with payload", () => {
    expect(changeValue({ example: "value" })).toMatchSnapshot();
    expect(changeValue({ second: "example" })).toMatchSnapshot();
  });
});

describe("push text action", () => {
  it("should return PUSH_TEXT with payload", () => {
    expect(pushText("fake text")).toMatchSnapshot();
  });
});
