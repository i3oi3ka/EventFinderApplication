import { Field, Form, Formik } from "formik";
import { createComment } from "../../api/api";

const CreateCommentForm = ({ eventId }) => {
  const handleSubmit = (values, { resetForm }) => {
    // Dispatch action to create a comment
    console.log("Comment submitted:", values);
    createComment(eventId, values);
    resetForm();
  };
  return (
    <Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
      <Form onSubmit={handleSubmit}>
        <Field as="textarea" name="comment" placeholder="Add a comment..." />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default CreateCommentForm;
