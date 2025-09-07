import { Outlet } from "react-router";
import EventsNavigation from "../../components/EventsNavigation/EventsNavigation";

const EventLayout = () => {
  return (
    <div>
      <EventsNavigation />
      <Outlet />
    </div>
  );
};

export default EventLayout;
