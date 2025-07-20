import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const submitForm = (values) => {
    dispatch(loginUser(values));
  };
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm submitLogin={submitForm} />
    </div>
  );
};

export default LoginPage;
