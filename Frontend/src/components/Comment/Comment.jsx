const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.text}</p>
      <small>{comment.rating}</small>
      <small>{comment.comment}</small>
    </div>
  );
};

export default Comment;
