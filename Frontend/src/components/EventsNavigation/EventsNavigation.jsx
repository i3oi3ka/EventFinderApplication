import { NavLink } from "react-router-dom";

const EventsNavigation = () => {
  return (
    <nav>
      <ul>
        <NavLink to="create-event">Create Event</NavLink>
      </ul>
    </nav>
  );
};

export default EventsNavigation;
