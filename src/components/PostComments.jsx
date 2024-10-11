import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import CommentsSkeleton from "./CommentsSkeleton";
import PropTypes from "prop-types";

export default function PostComments({ setForbiddenMessage }) {
  const api = useContext(ApiContext);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [comment, setComment] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);

  const userId = parseInt(localStorage.getItem("userId"));

  // Load Comments
  const params = useParams();
  const { postId } = params;
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${api}/posts/${postId}/comments`, {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Error");
        }
        const { comments } = await response.json();
        setComments(comments);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  // Add new comment on submit
  const postComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${api}/posts/${postId}/comments`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      });
      if (!response.ok) {
        setForbiddenMessage("You must be logged in to comment");
        throw new Error("You must be logged in to comment");
      }
      const data = await response.json();
      setComments((prevComments) => [data.comment, ...prevComments]);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${api}/posts/${postId}/comments/${commentId}`, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setForbiddenMessage("Can't delete comment");
        throw new Error("Can't delete comment");
      }
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleEditForm = (commentId, commentText) => {
    if (editedCommentId === commentId) {
      setEditedCommentId(null);
    } else {
      setEditedCommentId(commentId);
      setEditedText(commentText);
    }
  };

  const handleEditComment = async (e, commentId) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${api}/posts/${postId}/comments/${commentId}`, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editedText }),
      });
      if (!response.ok) {
        setForbiddenMessage("You must be logged in to edit comment");
        throw new Error("You must be logged in to edit comment");
      }
      const data = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, text: data.comment.text } : comment
        )
      );
      setEditedCommentId(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <CommentsSkeleton />;
  if (error) return <p>Error getting getting post.</p>;

  return (
    <>
      <h2 className="my-4 text-lg">Comments: {comments.length}</h2>

      {/* Comment form */}
      <form
        onSubmit={postComment}
        className="mb-4 flex flex-col sm:flex-row shadow-md shadow-gray-500"
      >
        <textarea
          className="w-full p-2 border-2 border-black"
          placeholder="Leave a comment..."
          rows={2}
          name="text"
          id="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="px-8 py-4 border-2 border-t-0 sm:border-t-2 sm:border-l-0 border-black transition-all hover:text-white hover:bg-black hover:border-black">
          Comment
        </button>
      </form>

      {/* Rest of the comments */}
      {comments.map((comment, index) => (
        <div
          key={index}
          className="flex flex-col justify-between mb-4 p-4 border-2 border-black shadow-md shadow-gray-500"
        >
          {/* Top comment bar */}
          <div className="flex justify-between flex-1 mb-2">
            <h3 className="text-gray-600">
              By{" "}
              <Link
                to={`/user/${comment.authorId}`}
                className="font-bold text-gray-900 hover:underline"
              >
                {comment.author.username}
              </Link>{" "}
              | {comment.createdAt}
            </h3>
            {/* Edit and delete buttons */}
            {comment.authorId === userId && (
              <div>
                <button
                  className="text-sm px-4 transition-all hover:text-main"
                  onClick={() => toggleEditForm(comment.id, comment.text)}
                >
                  {editedCommentId === comment.id ? "Cancel" : "Edit"}
                </button>
                <button
                  className="text-sm px-4 transition-all hover:text-red-700"
                  onClick={(e) => deleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Show comment or form for editing comments */}
          <div>
            {editedCommentId === comment.id ? (
              <form
                onSubmit={(e) => handleEditComment(e, comment.id)}
                className="edit flex flex-col sm:flex-row shadow-md shadow-gray-500"
              >
                <textarea
                  className="w-full p-2 border-2 border-black"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={2}
                ></textarea>
                <button className="px-8 py-4 border-2 border-t-0 sm:border-t-2 sm:border-l-0 border-black transition-all hover:text-white hover:bg-black hover:border-black">
                  Edit
                </button>
              </form>
            ) : (
              <p className="comment">{comment.text}</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

PostComments.propTypes = {
  setForbiddenMessage: PropTypes.func.isRequired,
};
