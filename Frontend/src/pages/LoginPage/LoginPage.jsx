import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { selectUserError } from "../../redux/auth/selectors";

const LoginPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const submitForm = (values) => {
    dispatch(loginUser(values));
  };
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm submitLogin={submitForm} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
