import { Field, Form, Formik } from "formik";

const LoginForm = ({ submitLogin }) => {
  const submitForm = (values, actions) => {
    submitLogin(values);
    actions.reset;
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={submitForm}
    >
      <Form>
        <Field type="text" name="username" placeholder="username" />
        <Field type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
