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
import { Form, FormikProps } from "formik";
import makeid from "../../utils/makeId";

const QoSOptions: IComboBoxOption[] = [
  { key: 0, text: "0" },
  { key: 1, text: "1" },
  { key: 2, text: "2" },
];

export const formInitialValues = {
  host: "localhost",
  port: 5000,
  clientId: `js-utility-${makeid()}`,
  path: "/mqtt",
};

type ConnectionFormProps = typeof formInitialValues;

function ConnectionForm(formik: FormikProps<ConnectionFormProps>): JSX.Element {
  return (
    <Form>
      <Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 50 }}
          styles={{ root: { width: "100%", textAlign: "start" } }}
        >
          <TextField
            className="host-field"
            label="Host"
            {...formik.getFieldProps("host")}
          />
          <TextField
            className="port-field"
            label="Port"
            {...formik.getFieldProps("port")}
          />
          <TextField
            className="client-id-field"
            label="Client ID"
            {...formik.getFieldProps("clientId")}
          />
          <Stack.Item className="connect-button-field" align="end">
            <DefaultButton type="submit" text="Connect" allowDisabledFocus />
          </Stack.Item>
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 50 }}
          styles={{ root: { width: "100%", textAlign: "start" } }}
        >
          <TextField
            className="path-field"
            label="Path"
            {...formik.getFieldProps("path")}
          />
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
          <TextField label="Last Will Topic" />
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
    </Form>
  );
}

export default ConnectionForm;
