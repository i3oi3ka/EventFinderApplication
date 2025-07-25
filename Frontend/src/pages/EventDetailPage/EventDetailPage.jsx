import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../../components/Loader/Loader";
import { fetchEventDetails } from "../../api/api";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    // Fetch event details using eventId
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await fetchEventDetails(eventId);
        setEvent(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  return (
    <div>
      <h1>Event Detail Page</h1>
      {loading && <Loader />}
      {error && <p>Error loading event details.</p>}
      {event && (
        <div>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
