import React from "react";
import { Formik } from "formik";
import ConnectionForm, { formInitialValues } from "./ConnectionForm";

const ConnectionFormContainer = (): JSX.Element => {
  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={(values, { setSubmitting }): void => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {ConnectionForm}
    </Formik>
  );
};

export default ConnectionFormContainer;
