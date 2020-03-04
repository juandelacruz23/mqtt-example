import "../date.mock";
import { reducer, changeValue, connectClient } from "../mainDuck";

describe("main reducer", () => {
  it("should handle CHANGE_VALUE action with initialState", () => {
    const action = changeValue({ host: "fake value" });
    expect(reducer(undefined, action)).toHaveProperty("host", "fake value");
  });
  it("should handle CONNECT action with initialState", () => {
    const mqttOptions = {
      host: "fake host",
      port: 5000,
      clientId: "fake client id",
      path: "fake path",
    };
    const action = connectClient(mqttOptions);
    const newState = reducer(undefined, action);
    expect(newState).toEqual(expect.objectContaining(mqttOptions));
    expect(newState).toMatchSnapshot();
  });
});
