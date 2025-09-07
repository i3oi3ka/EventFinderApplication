import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";
import RegistationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import { useSelector } from "react-redux";
import { selectUserError } from "../../redux/auth/selectors.js";

const RegistationPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const submitForm = (values) => {
    console.log("Registration values:", values);
    dispatch(registerUser(values));
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <RegistationForm submitSignUP={submitForm} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegistationPage;
