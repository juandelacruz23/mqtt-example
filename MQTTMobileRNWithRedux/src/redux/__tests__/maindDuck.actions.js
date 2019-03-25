import { changeValue } from "../mainDuck";

describe("change value action", () => {
  it("should return CHANGE_VALUE with payload", () => {
    expect(changeValue({ example: "value" })).toMatchSnapshot();
    expect(changeValue({ second: "example" })).toMatchSnapshot();
  });
});
