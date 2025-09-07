import { Field, Form, Formik } from "formik";

const EditingEventForm = ({ event, editEvent }) => {
  const handleEditSubmit = (values, actions) => {
    editEvent(values);
    actions.resetForm();
  };

  return (
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
  );
};

export default EditingEventForm;
