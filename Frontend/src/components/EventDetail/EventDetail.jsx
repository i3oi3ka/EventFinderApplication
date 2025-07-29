const EventDetail = ({ event, organizer }) => {
  return (
    <>
      <h2>{event.title}</h2>
      {event.image && <img src={event.image} alt={event.title} />}
      <p>{organizer && organizer.nickname}</p>
      <p>{event.rating}</p>
      <p>{event.category}</p>
      <p>{event.description}</p>
      <p>{event.num_of_seats}</p>
      <p>{event.date}</p>
      <p>{event.venue}</p>
      <p>{event.free_tickets}</p> );
    </>
  );
};

export default EventDetail;
