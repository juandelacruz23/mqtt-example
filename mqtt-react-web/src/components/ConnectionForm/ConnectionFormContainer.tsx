import React from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import ConnectionForm, { formInitialValues } from "./ConnectionForm";
import { AppState } from "../../redux";
import {
  connectClient,
  disconnectClient,
} from "../../redux/slices/mqttConfigSlice";

const ConnectionFormContainer: React.FC = (): JSX.Element => {
  const isConnected: boolean = useSelector(
    (state: AppState) => state.mqttConfig.isConnected,
  );
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={(values, { setSubmitting }): void => {
        if (!isConnected)
          dispatch(connectClient({ ...values, port: +values.port }));
        else dispatch(disconnectClient());
        setSubmitting(false);
      }}
    >
      {ConnectionForm}
    </Formik>
  );
};

export default ConnectionFormContainer;
