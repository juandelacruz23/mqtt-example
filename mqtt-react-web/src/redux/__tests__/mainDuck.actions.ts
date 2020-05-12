import { changeValue } from "../mainDuck";
describe("change value action", () => {
  it("should return CHANGE_VALUE with payload", () => {
    const fakePath = "fake path";
    const firstAction = changeValue({ path: fakePath });
    expect(firstAction).toEqual({
      type: "CHANGE_VALUE",
      payload: {
        path: fakePath,
      },
    });
    expect(firstAction).toMatchSnapshot();

    const fakeTopic = "fakeTopic";
    const secondAction = changeValue({ topic: fakeTopic });
    expect(secondAction).toEqual({
      type: "CHANGE_VALUE",
      payload: {
        topic: fakeTopic,
      },
    });
    expect(secondAction).toMatchSnapshot();
  });
});
