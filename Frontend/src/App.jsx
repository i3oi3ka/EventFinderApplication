import { Route, Routes } from "react-router";
import "./App.css";
import RegistationPage from "./pages/RegistationPage/RegistationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";

const HomeLayout = lazy(() => import("./layout/HomeLayout/HomeLayout"));
const EventLayout = lazy(() => import("./layout/EventLayout/EventLayout"));
const RestrictedRoute = lazy(() =>
  import("./guards/RestrictedRoute/RestrictedRoute")
);
const EventPage = lazy(() => import("./pages/EventPage/EventPage"));
const CreateEventPage = lazy(() =>
  import("./pages/CreateEventPage/CreateEventPage")
);
const EventDetailPage = lazy(() =>
  import("./pages/EventDetailPage/EventDetailPage")
);

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
          <Route path="events/" element={<EventLayout />}>
            <Route path="" element={<EventPage />} />
            <Route path="create-event" element={<CreateEventPage />} />
            <Route path=":eventId" element={<EventDetailPage />} />
          </Route>
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
