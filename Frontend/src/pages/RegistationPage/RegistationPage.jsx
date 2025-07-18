import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";

const RegistationPage = () => {
  const dispatch = useDispatch();
  const submitForm = (values, actions) => {
    dispatch(registerUser(values));
    actions.reset;
  };

  return (
    <div>
      RegistationPage
      <h1>Registration Page</h1>
      <Formik
        initialValues={{
          nickname: "",
          username: "",
          password: "",
          password2: "",
        }}
        onSubmit={submitForm}
      >
        {({ handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nickname"
              placeholder="nickname"
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Password"
              onChange={handleChange}
            />
            <button type="submit">Register</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegistationPage;
