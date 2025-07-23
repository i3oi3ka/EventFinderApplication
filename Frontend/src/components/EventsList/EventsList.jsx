import Event from "../Event/Event";

const EventsList = ({ events }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{<Event event={event} />}</li>
      ))}
    </ul>
  );
};

export default EventsList;
