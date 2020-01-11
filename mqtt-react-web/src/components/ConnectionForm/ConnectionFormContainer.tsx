import React from "react";
import { Formik } from "formik";
import ConnectionForm, {
  formInitialValues,
  ConnectionFormProps,
} from "./ConnectionForm";
import { connect, useSelector } from "react-redux";
import actions, { AppAction, AppState } from "../../redux/mainDuck";
import MQTTOptions from "../../types/MQTTOptions";

interface ConnectionContainerProps {
  connectClient: (props: ConnectionFormProps) => AppAction<MQTTOptions>;
  disconnectClient: () => AppAction<undefined>;
}

const ConnectionFormContainer: React.FC<ConnectionContainerProps> = ({
  connectClient,
  disconnectClient,
}): JSX.Element => {
  const isConnected: boolean = useSelector(
    (state: AppState) => state.isConnected,
  );
  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={(values, { setSubmitting }): void => {
        if (!isConnected) connectClient({ ...values, port: +values.port });
        else disconnectClient();
        setSubmitting(false);
      }}
    >
      {ConnectionForm}
    </Formik>
  );
};

const mapDispatchToProps: ConnectionContainerProps = {
  connectClient: (props: ConnectionFormProps) => actions.connectClient(props),
  disconnectClient: () => actions.disconnectClient(),
};

export default connect(null, mapDispatchToProps)(ConnectionFormContainer);
