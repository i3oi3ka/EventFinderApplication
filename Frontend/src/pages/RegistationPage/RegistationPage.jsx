import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";
import RegistationForm from "../../components/RegistrationForm/RegistrationForm.jsx";

const RegistationPage = () => {
  const dispatch = useDispatch();
  const submitForm = (values) => {
    console.log("Registration values:", values);
    dispatch(registerUser(values));
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <RegistationForm submitSignUP={submitForm} />
    </div>
  );
};

export default RegistationPage;
