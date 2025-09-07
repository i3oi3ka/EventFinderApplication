import { useDispatch } from "react-redux";
import {
  deleteEventAsync,
  fetchEventsAsync,
} from "../../redux/events/operations";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EventsList from "../../components/EventsList/EventsList";
import { selectEvents } from "../../redux/events/selectors";

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  useEffect(() => {
    dispatch(fetchEventsAsync());
  }, [dispatch]);

  const deleteEvent = (eventId) => {
    // Dispatch an action to delete the event
    dispatch(deleteEventAsync(eventId));
  };

  return (
    <div>
      <h1>Event Page</h1>
      {events.length > 0 ? (
        <EventsList events={events} deleteEvent={deleteEvent} />
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventPage;
