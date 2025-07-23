import { Route, Routes } from "react-router";
import "./App.css";
import RegistationPage from "./pages/RegistationPage/RegistationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HomeLayout from "./layout/HomeLayout/HomeLayout";
import RestrictedRoute from "./guards/RestrictedRoute/RestrictedRoute";
import EventPage from "./pages/EventPage/EventPage";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Loading...</div>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegistationPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
