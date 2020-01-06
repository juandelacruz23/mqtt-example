import React from "react";
import { Formik } from "formik";
import ConnectionForm, {
  formInitialValues,
  ConnectionFormProps,
} from "./ConnectionForm";
import { connect } from "react-redux";
import { AppAction, connectClient } from "../../redux/mainDuck";
import MQTTOptions from "../../paho.mqtt.types/MQTTOptions";

interface ConnectionContainerProps {
  setConnectionData: (props: ConnectionFormProps) => AppAction<MQTTOptions>;
}

const ConnectionFormContainer: React.FC<ConnectionContainerProps> = ({
  setConnectionData,
}): JSX.Element => {
  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={(values, { setSubmitting }): void => {
        setConnectionData({ ...values, port: +values.port });
        setSubmitting(false);
      }}
    >
      {ConnectionForm}
    </Formik>
  );
};

const mapDispatchToProps: ConnectionContainerProps = {
  setConnectionData: (props: ConnectionFormProps) => connectClient(props),
};

export default connect(null, mapDispatchToProps)(ConnectionFormContainer);
