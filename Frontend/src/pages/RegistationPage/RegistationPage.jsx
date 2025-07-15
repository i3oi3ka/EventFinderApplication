import { Formik } from "formik";
import { createUser } from "../../api/api.js";

const RegistationPage = () => {
  // const [user, setUser] = useState();
  const submitForm = async (values) => {
    const user = await createUser(values);
    console.log(user);
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
