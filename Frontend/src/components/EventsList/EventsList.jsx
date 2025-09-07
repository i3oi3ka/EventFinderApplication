import Event from "../Event/Event";

const EventsList = ({ events, deleteEvent }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          {<Event event={event} deleteEvent={deleteEvent} />}
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
