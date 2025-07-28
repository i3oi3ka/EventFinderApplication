import { useDispatch } from "react-redux";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";
import { createEventAsync } from "../../redux/events/operations";
import { useNavigate } from "react-router";

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createEvent = (values) => {
    dispatch(createEventAsync(values));
    navigate("/events");
  };

  return (
    <div>
      <h1>Create Event</h1>
      <CreateEventForm createEvent={createEvent} />
    </div>
  );
};

export default CreateEventPage;
