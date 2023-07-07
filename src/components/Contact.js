import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-black rounded">
      <h1 className="text-center mb-5">Contact Us</h1>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <div className="mb-5">
              <label htmlFor="name" className="mb-1">
                Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-[470px] p-3 rounded border border-slate-200"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400 mt-1"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-[470px] p-3 rounded border border-slate-200"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="mb-5">
              <label htmlFor="message">Message:</label>
              <Field
                as="textarea"
                id="message"
                name="message"
                className="w-[470px] p-3 rounded border border-slate-200"
              />
              <ErrorMessage name="message" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-400 text-white py-3 px-4 border-none rounded cursor-pointer"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
