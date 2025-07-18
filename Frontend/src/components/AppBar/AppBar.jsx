import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

import style from "./AppBar.module.css";
import { logoutUser } from "../../redux/auth/operations";

const AppBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={style.container}>
      <Navigation />
      {isLoggedIn ? <UserMenu handleLogOut={handleLogOut} /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
