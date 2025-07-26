import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../../components/Loader/Loader";
import { fetchEventDetails, fetchEventOrganizer } from "../../api/api";
import { selectUserId } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();

  const userID = useSelector(selectUserId);

  useEffect(() => {
    // Fetch event details using eventId
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await fetchEventDetails(eventId);
        setEvent(data);
        fetchOrganizer(data.organizer);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchOrganizer = async (userID) => {
      try {
        setLoading(true);
        const data = await fetchEventOrganizer(userID);

        setOrganizer(data);
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
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <p>Error loading event details.</p>}
          {event ? (
            <div>
              {event.organizer === userID && (
                <>
                  <button onClick={() => console.log("Edit Event")}>
                    Edit Event
                  </button>
                  <button onClick={() => console.log("Delete Event")}>
                    Delete Event
                  </button>
                </>
              )}
              <h2>{event.title}</h2>
              {event.image && <img src={event.image} alt={event.title} />}
              <p>{organizer && organizer.nickname}</p>
              <p>{event.rating}</p>
              <p>{event.category}</p>
              <p>{event.description}</p>
              <p>{event.num_of_seats}</p>
              <p>{event.date}</p>
              <p>{event.venue}</p>
              <p>{event.free_tickets}</p>
            </div>
          ) : (
            <p>No event details available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default EventDetailPage;
