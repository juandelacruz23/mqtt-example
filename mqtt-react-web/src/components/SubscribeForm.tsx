import React, { FC } from "react";
import {
  Stack,
  Label,
  TextField,
  IComboBoxOption,
  DefaultButton,
} from "office-ui-fabric-react";
import { Form, Formik, FormikProps } from "formik";
import { useSelector } from "react-redux";
import { AppState } from "../redux/mainDuck";

const defaultSubscriptionValues = {
  topic: "message",
  qos: 0,
};

const QoSOptions: IComboBoxOption[] = [
  { key: 0, text: "0" },
  { key: 1, text: "1" },
  { key: 2, text: "2" },
];

const FormInternal = (
  formik: FormikProps<{ qos: number; topic: string }>,
): JSX.Element => {
  const isConnected: boolean = useSelector(
    (state: AppState) => state.isConnected,
  );
  const hasEmptyValues = formik.values.qos == null || !formik.values.topic;
  const disabled = hasEmptyValues || !isConnected;
  return (
    <Form>
      <Stack
        tokens={{ childrenGap: 10 }}
        styles={{ root: { textAlign: "start" } }}
      >
        <Stack horizontal>
          <Label className="subscribe-label">Topic</Label>
          <TextField
            {...formik.getFieldProps("topic")}
            className="fill-space"
            disabled={disabled}
          />
        </Stack>
        <Stack horizontal>
          <Label className="subscribe-label">QoS</Label>
          <select
            {...formik.getFieldProps("qos")}
            className="fill-space"
            disabled={disabled}
          >
            {QoSOptions.map(qosOption => (
              <option
                key={`subscribe-qos-${qosOption.key}`}
                value={qosOption.key}
              >
                {qosOption.text}
              </option>
            ))}
          </select>
        </Stack>
        <Stack
          className="subscribe-buttons"
          tokens={{ childrenGap: 5 }}
          horizontal
        >
          <DefaultButton type="submit" text="Subscribe" disabled={disabled} />
        </Stack>
      </Stack>
    </Form>
  );
};

const SubscribeForm: FC = () => {
  return (
    <Formik
      initialValues={defaultSubscriptionValues}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {FormInternal}
    </Formik>
  );
};

export default SubscribeForm;
