import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Formik, Form, Field } from "formik";
import Loader from "../../components/Loader/Loader";
import { fetchEventDetails, fetchUser } from "../../api/api";
import { selectUserId } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteEventAsync,
  updateEventAsync,
} from "../../redux/events/operations";

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

  const handleEditSubmit = (values) => {
    dispatch(updateEventAsync({ eventId, eventData: values }));
    navigate("/events");
  };

  const handleDeleteEvent = (id) => {
    // Dispatch delete event action
    dispatch(deleteEventAsync(id));
    navigate("/events");
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
              <Formik initialValues={event} onSubmit={handleEditSubmit}>
                <Form>
                  <Field name="title" placeholder="Title" />
                  <Field name="description" placeholder="Description" />
                  <Field name="category" placeholder="Category" />
                  <Field name="image" placeholder="Image URL" />
                  <Field name="venue" placeholder="Venue" />
                  <button type="submit">Save</button>
                </Form>
              </Formik>
            ) : (
              <div>
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

                {event.organizer === userID && (
                  <div>
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
