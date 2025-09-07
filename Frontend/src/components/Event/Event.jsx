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
      <p>{event.description}</p>
      <p>Category: {event.category}</p>
      <p>Venue: {event.venue}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Seats Available: {event.num_of_seats}</p>
      {event.organizer === userID && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
};

export default Event;
