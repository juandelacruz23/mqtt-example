import {
  changeValue,
  connectClient,
  subscribe,
  disconnectClient,
  unsubscribe,
} from "../mqttConfigSlice";

describe("change value action", () => {
  it("should return CHANGE_VALUE with payload", () => {
    const fakePath = "fake path";
    const firstAction = changeValue({ path: fakePath });
    expect(firstAction).toEqual({
      type: "config/CHANGE_VALUE",
      payload: {
        path: fakePath,
      },
    });
    expect(firstAction).toMatchSnapshot();

    const fakeTopic = "fakeTopic";
    const secondAction = changeValue({ topic: fakeTopic });
    expect(secondAction).toEqual({
      type: "config/CHANGE_VALUE",
      payload: {
        topic: fakeTopic,
      },
    });
    expect(secondAction).toMatchSnapshot();
  });
});

describe("connect client action", () => {
  const action = connectClient({
    clientId: "fake id",
    host: "fake host",
    path: "path",
    port: 1234,
  });
  expect(action).toMatchSnapshot();
});

describe("disconnect client action", () => {
  const action = disconnectClient();
  expect(action).toMatchSnapshot();
});

describe("subscribe action", () => {
  const action = subscribe({
    qos: 0,
    topic: "fake topic",
  });
  expect(action).toMatchSnapshot();
});

describe("unsubscribe action", () => {
  const action = unsubscribe("fake topic");
  expect(action).toMatchSnapshot();
});
