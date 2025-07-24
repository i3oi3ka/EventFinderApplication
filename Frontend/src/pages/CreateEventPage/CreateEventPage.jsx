import { useDispatch } from "react-redux";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";
import { createEventAsync } from "../../redux/events/operations";

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const createEvent = (values) => {
    dispatch(createEventAsync(values));
  };

  return (
    <div>
      <h1>Create Event</h1>
      <CreateEventForm createEvent={createEvent} />
    </div>
  );
};

export default CreateEventPage;
