import { NavLink } from "react-router";
import { selectUserId } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const Event = ({ event, deleteEvent }) => {
  const userID = useSelector(selectUserId);
  const handleDelete = () => {
    deleteEvent(event.id);
  };
  return (
    <div>
      <NavLink to={`/events/${event.id}`}>{event.title}</NavLink>{" "}
      {event.organizer === userID && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
};

export default Event;
