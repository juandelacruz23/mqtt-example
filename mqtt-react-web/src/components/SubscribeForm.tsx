import React from 'react';
import { Stack, Label, TextField, IComboBoxOption, ComboBox, DefaultButton } from 'office-ui-fabric-react';

const QoSOptions : IComboBoxOption[] = [
  { key: 0, text: "0" },
  { key: 1, text: "1" },
  { key: 2, text: "2" },
];

const SubscribeForm = () => {
  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { textAlign: "start" } }}>
      <Stack horizontal>
        <Label>Topic</Label>
        <TextField defaultValue="message" />
      </Stack>
      <Stack horizontal>
        <Label>QoS</Label>
        <ComboBox options={QoSOptions} selectedKey={0} />
      </Stack>
      <Stack horizontal>
        <DefaultButton text="Subscribe" />
        <DefaultButton text="Unsubscribe" />
      </Stack>
    </Stack>
  );
};

export default SubscribeForm;