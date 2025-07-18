import { Outlet } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";

const HomeLayout = () => {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
