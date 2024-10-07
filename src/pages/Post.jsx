import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostSkeleton from "../components/PostSkeleton";
import { ApiContext } from "../ApiContext";

export default function Post() {
  const api = useContext(ApiContext);

  const [post, setPost] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const userId = parseInt(localStorage.getItem("userId"));

  // Load page
  const params = useParams();
  useEffect(() => {
    const { postId } = params;
    const fetchPost = async () => {
      try {
        const response = await fetch(`${api}/posts/${postId}`, { mode: "cors" });
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const { post } = await response.json();
        setPost(post);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [comments]);

  // Add new comment on submit
  const postComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${api}/posts/${post.id}/comments`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      });
      if (!response.ok) {
        throw new Error("You must be logged in to comment");
      }
      const newComment = response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${api}/posts/${post.id}/comments/${commentId}`, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
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
      const response = await fetch(`${api}/posts/${post.id}/comments/${commentId}`, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editedText }),
      });
      if (!response.ok) {
        throw new Error("You must be logged in to edit comment");
      }
      const newComment = response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      setEditedCommentId(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <PostSkeleton />;
  if (error) return <p>Error getting getting post.</p>;

  return (
    <>
      <article className="mx-auto px-8 max-w-container">
        <section>
          <div className="my-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{post.title}</h1>
            <p>Author: {post.author.username}</p>
            <p>{post.createdAt}</p>
          </div>
          <hr className="border-2 border-black" />
          <div className="my-8">
            <p>{post.content}</p>
          </div>
        </section>
        <section>
          <h2 className="my-4 text-lg">Comments: {post.comments.length}</h2>

          {/* Comment form */}
          <form onSubmit={postComment} className="mb-4 flex shadow-md shadow-gray-500">
            <textarea
              className="w-full p-2 border-2 border-black"
              placeholder="Leave a comment..."
              rows={2}
              name="text"
              id="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="px-8 py-4 border-2 border-l-0 border-black transition-all hover:text-white hover:bg-black hover:border-black">
              Comment
            </button>
          </form>

          {/* Rest of the comments */}
          {post.comments.map((comment, index) => (
            <div
              key={index}
              className="flex justify-between mb-4 p-4 border-2 border-black shadow-md shadow-gray-500"
            >
              <div className="flex-1">
                <h3 className="text-gray-600">
                  By <span className="font-bold text-gray-900">{comment.author.username}</span> |{" "}
                  {comment.createdAt}
                </h3>

                {/* Show comment or form for editing comments */}
                {editedCommentId === comment.id ? (
                  <form
                    onSubmit={(e) => handleEditComment(e, comment.id)}
                    className="edit flex shadow-md shadow-gray-500"
                  >
                    <textarea
                      className="w-full p-2 border-2 border-black"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={2}
                    ></textarea>
                    <button className="px-8 py-4 border-2 border-l-0 border-black transition-all hover:text-white hover:bg-black hover:border-black">
                      Edit
                    </button>
                  </form>
                ) : (
                  <p className="comment">{comment.text}</p>
                )}
              </div>

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
          ))}
        </section>
      </article>
    </>
  );
}
