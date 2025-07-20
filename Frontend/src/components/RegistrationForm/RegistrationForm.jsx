import { Field, Form, Formik } from "formik";

const RegistationForm = ({ submitSignUP }) => {
  const submitForm = (values, actions) => {
    console.log("Registration values:", values);
    submitSignUP(values);
    actions.reset;
  };

  return (
    <Formik
      initialValues={{
        nickname: "",
        username: "",
        password: "",
        password2: "",
      }}
      onSubmit={submitForm}
    >
      <Form>
        <Field type="text" name="nickname" placeholder="nickname" />
        <Field type="text" name="username" placeholder="username" />
        <Field type="password" name="password" placeholder="Password" />
        <Field type="password" name="password2" placeholder="Password" />
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistationForm;
