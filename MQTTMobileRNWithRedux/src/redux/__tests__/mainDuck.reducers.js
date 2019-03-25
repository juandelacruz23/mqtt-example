import { reducer } from "../mainDuck";

describe("main reducer", () => {
  it("should return initialState as default", () => {
    expect(reducer()).toMatchSnapshot();
  });
});
