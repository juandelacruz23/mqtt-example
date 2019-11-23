import React from "react";
import {
  Stack,
  TextField,
  DefaultButton,
  Checkbox,
  Label,
  Separator,
  IComboBoxOption,
  ComboBox,
} from "office-ui-fabric-react";

const QoSOptions: IComboBoxOption[] = [
  { key: 0, text: "0" },
  { key: 1, text: "1" },
  { key: 2, text: "2" },
];

const ConnectionForm: React.FC = () => {
  return (
    <Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 50 }}
        styles={{ root: { width: "100%", textAlign: "start" } }}
      >
        <TextField
          className="host-field"
          label="Host"
          defaultValue="localhost"
        />
        <TextField className="port-field" label="Port" defaultValue="5000" />
        <TextField
          className="client-id-field"
          label="Client ID"
          defaultValue="js-utility-aZsoR"
        />
        <Stack.Item className="connect-button-field" align="end">
          <DefaultButton text="Connect" allowDisabledFocus />
        </Stack.Item>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: 50 }}
        styles={{ root: { width: "100%", textAlign: "start" } }}
      >
        <TextField className="path-field" label="Path" defaultValue="/mqtt" />
        <TextField label="Username" />
        <TextField label="Password" type="password" />
        <TextField label="Keepalive" defaultValue="60" type="number" />
        <TextField label="Timeout" defaultValue="3" type="number" />
        <div>
          <Label htmlFor="tls">TLS</Label>
          <Checkbox id="tls" />
        </div>
        <div>
          <Label htmlFor="clean-session">Clean Session</Label>
          <Checkbox id="clean-session" />
        </div>
        <div>
          <Label htmlFor="auto-reconnect">Automatic Reconnect</Label>
          <Checkbox id="auto-reconnect" />
        </div>
      </Stack>
      <Separator styles={{ root: { width: "100%" } }} />
      <Stack
        horizontal
        tokens={{ childrenGap: 50 }}
        styles={{ root: { width: "100%", textAlign: "start" } }}
      >
        <TextField label="Last Will Topic" defaultValue="/mqtt" />
        <ComboBox label="QoS" options={QoSOptions} selectedKey={0} />
        <div>
          <Label htmlFor="retain-last-will">Retain</Label>
          <Checkbox id="retain-last-will" />
        </div>
        <TextField
          className="fill-space"
          label="Last Will Message"
          multiline
          resizable={false}
        />
      </Stack>
    </Stack>
  );
};

export default ConnectionForm;
