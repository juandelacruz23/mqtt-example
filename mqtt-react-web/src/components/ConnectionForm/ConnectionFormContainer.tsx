import React from "react";
import { Formik } from "formik";
import ConnectionForm, {
  formInitialValues,
  ConnectionFormProps,
} from "./ConnectionForm";
import { connect } from "react-redux";
import { changeValue, AppAction } from "../../redux/mainDuck";

interface ConnectionContainerProps {
  setConnectionData: (props: ConnectionFormProps) => AppAction;
}

const ConnectionFormContainer: React.FC<ConnectionContainerProps> = ({
  setConnectionData,
}): JSX.Element => {
  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={(values, { setSubmitting }): void => {
        setConnectionData(values);
        setSubmitting(false);
      }}
    >
      {ConnectionForm}
    </Formik>
  );
};

const mapDispatchToProps: ConnectionContainerProps = {
  setConnectionData: (props: ConnectionFormProps): AppAction =>
    changeValue(props),
};

export default connect(null, mapDispatchToProps)(ConnectionFormContainer);
