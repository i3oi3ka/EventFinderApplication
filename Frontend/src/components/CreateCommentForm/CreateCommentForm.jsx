import { Field, Form, Formik } from "formik";

const CreateCommentForm = ({ handleCreateComment }) => {
  const handleSubmit = (values) => {
    handleCreateComment(values);
  };
  return (
    <Formik initialValues={{ comment: "", rating: "" }} onSubmit={handleSubmit}>
      <Form>
        <Field
          as="input"
          type="number"
          name="rating"
          placeholder="Add a rating..."
        />
        <Field as="textarea" name="comment" placeholder="Add a comment..." />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default CreateCommentForm;
