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
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
      alert("Thank you for your message! We'll get back to you soon.");
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg mt-16 mb-20">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-orange-500">
        Get In Touch
      </h1>
      
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="John Doe"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="your@email.com"
              />
              <ErrorMessage 
                name="email" 
                component="div" 
                className="text-sm text-red-500 mt-1" 
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="How can we help you?"
              />
              <ErrorMessage 
                name="message" 
                component="div" 
                className="text-sm text-red-500 mt-1" 
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition duration-200 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;