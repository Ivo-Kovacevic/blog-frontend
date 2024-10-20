import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostSkeleton from "../components/PostSkeleton";
import { ApiContext } from "../ApiContext";
import Comments from "../components/Comments";

export default function Post() {
  const api = useContext(ApiContext);

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [forbiddenMessage, setForbiddenMessage] = useState("");

  // Load Post
  const params = useParams();
  const { postId } = params;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${api}/posts/${postId}`, { mode: "cors" });
        if (response.status >= 400) {
          throw new Error("Error");
        }
        const { post } = await response.json();
        setPost(post);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) return <PostSkeleton />;
  if (error) return <p className="container mx-auto text-red-700">Error getting post.</p>;

  const renderContent = (content) => {
    return content.split("\n").map((line, index) => (
      <p key={index} className="mb-4">
        {line}
      </p>
    ));
  };

  return (
    <>
      {/* Display message if user tries some action without being logged in */}
      <div
        onClick={() => setForbiddenMessage("")}
        className={`fixed p-4 left-1/2 -translate-x-1/2 -top-12 transition ease-out duration-300 text-white bg-red-700 shadow-md shadow-gray-500 hover:cursor-pointer w-max ${
          forbiddenMessage && "translate-y-24"
        }`}
      >
        {forbiddenMessage}
      </div>

      <article className="mx-auto px-4 sm:px-8 max-w-container">
        <section>
          <div className="my-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{post.title}</h1>
            <p>Author: {post.author.username}</p>
            <p>{post.createdAt}</p>
          </div>
          <hr className="border-2 border-black" />
          <div className="my-8">{renderContent(post.content)}</div>
        </section>
        <section>
          <Comments
            resource="posts"
            resourceId={postId}
            setForbiddenMessage={setForbiddenMessage}
          />
        </section>
      </article>
    </>
  );
}
