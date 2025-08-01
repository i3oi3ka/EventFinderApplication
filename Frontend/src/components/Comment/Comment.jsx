const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.text}</p>
      <small>By {comment.author}</small>
    </div>
  );
};

export default Comment;
