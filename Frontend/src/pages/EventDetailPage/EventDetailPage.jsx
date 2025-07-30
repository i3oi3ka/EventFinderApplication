import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../../components/Loader/Loader";
import { fetchEventDetails, fetchUser } from "../../api/api";
import { selectUserId } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteEventAsync,
  updateEventAsync,
} from "../../redux/events/operations";
import EditingEventForm from "../../components/EditingEventForm/EditingEventForm";
import EventDetail from "../../components/EventDetail/EventDetail";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const userID = useSelector(selectUserId);
  const dispatch = useDispatch();

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
        const data = await fetchUser(userID);

        setOrganizer(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const editEvent = (values) => {
    dispatch(updateEventAsync({ eventId, eventData: values }));
    navigate("/events");
  };

  const handleDeleteEvent = (id) => {
    // Dispatch delete event action
    dispatch(deleteEventAsync(id));
    navigate("/events");
  };

  const handleGetTickets = () => {
    console.log("reserveTickets");
  };

  return (
    <div>
      <h1>Event Detail Page</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <p>Error loading event details.</p>}
          {event ? (
            isEditing ? (
              <EditingEventForm event={event} editEvent={editEvent} />
            ) : (
              <div>
                <EventDetail event={event} organizer={organizer} />
                {event.organizer === userID && (
                  <div>
                    {event.free_tickets > 0 && (
                      <button onClick={handleGetTickets}>Get Tickets</button>
                    )}
                    <button onClick={() => setIsEditing(!isEditing)}>
                      Edit Event
                    </button>
                    <button onClick={() => handleDeleteEvent(event.id)}>
                      Delete Event
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            <p>No event found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default EventDetailPage;
