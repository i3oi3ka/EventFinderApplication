const Event = ({ event, deleteEvent }) => {
  const handleDelete = () => {
    deleteEvent(event.id);
  };
  return (
    <div>
      {event.title} <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Event;
