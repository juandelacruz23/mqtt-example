import React, { Fragment } from 'react';
import { Stack, TextField, DefaultButton, Checkbox, Label, Separator, IComboBoxOption, ComboBox } from 'office-ui-fabric-react';

const QoSOptions : IComboBoxOption[] = [
  { key: 0, text: "0" },
  { key: 1, text: "1" },
  { key: 2, text: "2" },
];

const ConnectionForm : React.FC = () => {
  return (
    <Fragment>
      <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: "100%", textAlign: "start" } }}>
        <TextField label="Host" defaultValue="localhost" />
        <TextField label="Port" defaultValue="5000" />
        <TextField label="Client ID" defaultValue="js-utility-aZsoR" />
        <Stack.Item align="end">
          <DefaultButton text="Connect" allowDisabledFocus />
        </Stack.Item>
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: "100%", textAlign: "start" } }}>
        <TextField label="Path" defaultValue="/mqtt" />
        <TextField label="Username"/>
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
      <Separator styles={{ root: {width: "100%"}}} />
      <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: "100%", textAlign: "start" } }}>
        <TextField label="Last Will Topic" defaultValue="/mqtt" />
        <ComboBox label="QoS" options={QoSOptions} selectedKey={0} />
        <div>
          <Label htmlFor="retain">Retain</Label>
          <Checkbox id="Retain" />
        </div>
        <TextField label="Last Will Message" multiline resizable={false} />
      </Stack>      
    </Fragment>
  );
};

export default ConnectionForm;