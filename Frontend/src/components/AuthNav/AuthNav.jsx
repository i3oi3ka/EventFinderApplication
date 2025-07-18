import { NavLink } from "react-router-dom";

const AuthNav = () => {
  return (
    <nav>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">SignUp</NavLink>
    </nav>
  );
};

export default AuthNav;
