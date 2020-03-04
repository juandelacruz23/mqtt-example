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
import { useSelector } from "react-redux";
import { AppState } from "../../redux/mainDuck";

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
  userName: "",
  password: "",
};

export type ConnectionFormProps = typeof formInitialValues;

function ConnectionForm(formik: FormikProps<ConnectionFormProps>): JSX.Element {
  const isConnected: boolean = useSelector(
    (state: AppState) => state.isConnected,
  );

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
            disabled={isConnected}
            {...formik.getFieldProps("host")}
          />
          <TextField
            className="port-field"
            label="Port"
            disabled={isConnected}
            {...formik.getFieldProps("port")}
          />
          <TextField
            className="client-id-field"
            label="Client ID"
            disabled={isConnected}
            {...formik.getFieldProps("clientId")}
          />
          <Stack.Item className="connect-button-field" align="end">
            <DefaultButton
              type="submit"
              text={isConnected ? "Disconnect" : "Connect"}
              allowDisabledFocus
            />
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
            disabled={isConnected}
            {...formik.getFieldProps("path")}
          />
          <TextField
            label="Username"
            {...formik.getFieldProps("userName")}
            disabled={isConnected}
          />
          <TextField
            label="Password"
            {...formik.getFieldProps("password")}
            type="password"
            disabled={isConnected}
          />
          <TextField
            label="Keepalive"
            defaultValue="60"
            type="number"
            disabled={isConnected}
          />
          <TextField
            label="Timeout"
            defaultValue="3"
            type="number"
            disabled={isConnected}
          />
          <div>
            <Label htmlFor="tls">TLS</Label>
            <Checkbox id="tls" disabled={isConnected} />
          </div>
          <div>
            <Label htmlFor="clean-session">Clean Session</Label>
            <Checkbox id="clean-session" disabled={isConnected} />
          </div>
          <div>
            <Label htmlFor="auto-reconnect">Automatic Reconnect</Label>
            <Checkbox id="auto-reconnect" disabled={isConnected} />
          </div>
        </Stack>
        <Separator styles={{ root: { width: "100%" } }} />
        <Stack
          horizontal
          tokens={{ childrenGap: 50 }}
          styles={{ root: { width: "100%", textAlign: "start" } }}
        >
          <TextField label="Last Will Topic" disabled={isConnected} />
          <ComboBox
            label="QoS"
            options={QoSOptions}
            selectedKey={0}
            disabled={isConnected}
          />
          <div>
            <Label htmlFor="retain-last-will">Retain</Label>
            <Checkbox id="retain-last-will" disabled={isConnected} />
          </div>
          <TextField
            className="fill-space"
            label="Last Will Message"
            multiline
            resizable={false}
            disabled={isConnected}
          />
        </Stack>
      </Stack>
    </Form>
  );
}

export default ConnectionForm;
