import { Field, Form, Formik } from "formik";

const CreateEventForm = ({ createEvent }) => {
  const categories = [
    "sports",
    "conferences",
    "expos",
    "concerts",
    "festivals",
    "community",
    "another",
  ];
  const SubmitEvent = (values, actions) => {
    createEvent(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        category: "",
        title: "",
        description: "",
        num_of_seats: 0,
        date: "",
        venue: "",
      }}
      onSubmit={SubmitEvent}
    >
      <Form>
        <Field name="category" as="select">
          <option value="" disabled>
            Event Category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </Field>
        <Field name="title" placeholder="Event Title" />
        <Field name="description" placeholder="Event Description" />
        <Field
          name="num_of_seats"
          type="number"
          placeholder="Number of Seats"
        />
        <Field name="date" type="date" />
        <Field name="venue" placeholder="Event Location" />
        <button type="submit">Create Event</button>
      </Form>
    </Formik>
  );
};

export default CreateEventForm;
