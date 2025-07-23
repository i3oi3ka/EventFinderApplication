import { useDispatch } from "react-redux";
import { fetchEventsAsync } from "../../redux/events/operations";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EventsList from "../../components/EventsList/EventsList";

const EventPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventsAsync());
  }, [dispatch]);
  const events = useSelector((state) => state.events.events);
  return (
    <div>
      <h1>Event Page</h1>
      {events.length > 0 ? (
        <EventsList events={events} />
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventPage;
