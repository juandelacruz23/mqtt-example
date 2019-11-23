import React, { FC } from "react";
import {
  Stack,
  TextField,
  ComboBox,
  IComboBoxOption,
  Checkbox,
  Label,
  DefaultButton,
} from "office-ui-fabric-react";

const QoSOptions: IComboBoxOption[] = [
  { key: 0, text: "0" },
  { key: 1, text: "1" },
  { key: 2, text: "2" },
];

const PublishMessageForm: FC = () => {
  return (
    <Stack
      tokens={{ childrenGap: 5 }}
      styles={{ root: { textAlign: "start" } }}
    >
      <Stack tokens={{ childrenGap: 10 }} horizontal>
        <Stack.Item>
          <TextField label="Topic" defaultValue="message" />
        </Stack.Item>
        <ComboBox label="QoS" options={QoSOptions} selectedKey={0} />
        <div>
          <Label htmlFor="retain-message">Retain</Label>
          <Checkbox id="retain-message" />
        </div>
        <Stack.Item align="center">
          <DefaultButton text="Publish" allowDisabledFocus />
        </Stack.Item>
      </Stack>
      <TextField label="Last Will Message" multiline resizable={false} />
    </Stack>
  );
};

export default PublishMessageForm;
