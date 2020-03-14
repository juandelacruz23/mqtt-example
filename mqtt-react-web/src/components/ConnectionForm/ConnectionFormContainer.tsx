import React from "react";
import { Formik } from "formik";
import ConnectionForm, {
  formInitialValues,
  ConnectionFormProps,
} from "./ConnectionForm";
import { connect, useSelector } from "react-redux";
import actions, { AppState } from "../../redux/mainDuck";

const mapDispatchToProps = {
  connectClient: (props: ConnectionFormProps) => actions.connectClient(props),
  disconnectClient: (): ReturnType<typeof actions.disconnectClient> =>
    actions.disconnectClient(),
};

const ConnectionFormContainer: React.FC<typeof mapDispatchToProps> = ({
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

export default connect(null, mapDispatchToProps)(ConnectionFormContainer);
