import { changeValue } from "../mainDuck";
describe("change value action", () => {
  it("should return CHANGE_VALUE with payload", () => {
    expect(changeValue({ example: "value" })).toEqual({
      type: "CHANGE_VALUE",
      payload: {
        example: "value",
      },
    });
    expect(changeValue({ example: "value" })).toMatchSnapshot();
    expect(changeValue({ second: "example" })).toEqual({
      type: "CHANGE_VALUE",
      payload: {
        second: "example",
      },
    });
    expect(changeValue({ second: "example" })).toMatchSnapshot();
  });
});
