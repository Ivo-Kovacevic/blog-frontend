import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostSkeleton from "../components/PostSkeleton";

function Post({ api }) {
  const [post, setPost] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { postId } = params;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${api}/posts/${postId}`, { mode: "cors" });
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const { post } = await response.json();
        setPost(post);
        console.log(post);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

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
          <form
            action={`/posts/${post.id}/comments`}
            method="post"
            className="mb-4 flex shadow-md shadow-gray-500"
          >
            <textarea
              className="w-full p-2 border-2 border-black"
              placeholder="Leave a comment..."
              rows={2}
              name="text"
              id="text"
            ></textarea>
            <button className="px-8 py-4 border-2 border-l-0 border-black transition-all hover:text-white hover:bg-black hover:border-black">
              Comment
            </button>
          </form>
          {post.comments.map((comment, index) => (
            <div key={index} className="mb-4 p-4 border-2 border-black shadow-md shadow-gray-500">
              <h3 className="text-gray-600">
                By <span className="font-bold text-gray-900">{comment.author.username}</span> |{" "}
                {comment.createdAt}
              </h3>
              <p>{comment.text}</p>
            </div>
          ))}
        </section>
      </article>
    </>
  );
}

export default Post;
