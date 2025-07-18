import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/auth/selectors";

const UserMenu = ({ handleLogOut }) => {
  const userName = useSelector(selectUserName);
  return (
    <div>
      <p>Hello {userName}</p>
      <button type="button" onClick={handleLogOut}>
        LogOut
      </button>
    </div>
  );
};

export default UserMenu;
