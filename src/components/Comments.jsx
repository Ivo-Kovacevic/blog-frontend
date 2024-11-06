import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import CommentsSkeleton from "./CommentsSkeleton";
import PropTypes from "prop-types";

export default function Comments({ resource, resourceId, setForbiddenMessage }) {
  const api = useContext(ApiContext);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [comment, setComment] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastCommentElement = useCallback(
    (element) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (element) observer.current.observe(element);
    },
    [loading, hasMore]
  );

  const userId = parseInt(localStorage.getItem("userId"));

  // Load Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${api}/${resource}/${resourceId}/comments?page=${page}&limit=5`,
          {
            mode: "cors",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { comments, hasMore } = await response.json();
        setComments((prevComments) => {
          const existingCommentsIds = new Set(prevComments.map((comment) => comment.id));
          const uniqueComments = comments.filter((comment) => !existingCommentsIds.has(comment.id));
          return [...prevComments, ...uniqueComments];
        });
        setHasMore(hasMore);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [page]);

  // Add new comment on submit
  const postComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${api}/${resource}/${resourceId}/comments`, {
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
      const response = await fetch(`${api}/${resource}/${resourceId}/comments/${commentId}`, {
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
      const response = await fetch(`${api}/${resource}/${resourceId}/comments/${commentId}`, {
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

  if (error) return <p>Error getting getting post.</p>;

  return (
    <>
      {/* Comment form */}
      {resource === "posts" && (
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
      )}

      {/* Rest of the comments */}
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          className="flex flex-col justify-between mb-4 p-4 border-2 border-black shadow-md shadow-gray-500"
        >
          {comments.length === index + 1 && <div ref={lastCommentElement}></div>}

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
      {loading && hasMore && <CommentsSkeleton />}
    </>
  );
}

Comments.propTypes = {
  resource: PropTypes.string,
  resourceId: PropTypes.number,
  setForbiddenMessage: PropTypes.func.isRequired,
};
