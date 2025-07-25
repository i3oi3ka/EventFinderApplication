import { NavLink } from "react-router";

const Event = ({ event, deleteEvent }) => {
  const handleDelete = () => {
    deleteEvent(event.id);
  };
  return (
    <div>
      <NavLink to={`/events/${event.id}`}>{event.title}</NavLink> <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Event;
