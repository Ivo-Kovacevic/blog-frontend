import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "../../ApiContext";
import apiCall from "../../api/apiCall";
import Comments from "../../components/Comments";
import PostSkeleton from "./PostSkeleton";
import CommentsSkeleton from "../../components/CommentsSkeleton";
import Error from "../../components/Error";

export default function Post() {
  const api = useContext(ApiContext);

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [forbiddenMessage, setForbiddenMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load Post
  const params = useParams();
  const { postId } = params;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiCall(`${api}/posts/${postId}`);
        if (response.status >= 400) {
          throw new Error("Error");
        }
        const { post } = await response.json();
        setPost({
          ...post,
          createdAt: new Date(post.createdAt),
        });
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (error) return <Error resource={"post"} />;

  const renderText = (content) => {
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
        {loading ? (
          <PostSkeleton />
        ) : (
          <section>
            <div className="my-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{post.title}</h1>
              <h3 className="text-gray-600">
                By{" "}
                <Link
                  to={`/user/${post.author.id}`}
                  className="font-bold text-gray-900 hover:underline"
                >
                  {post.author.username}
                </Link>
              </h3>
              <p>
                {post.createdAt.toLocaleString("en-DE", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <hr className="border-2 border-black" />
            <div className="my-8">{renderText(post.text)}</div>
          </section>
        )}
        <section>
          {loading ? (
            <CommentsSkeleton />
          ) : (
            <>
              <h2 className="my-4 text-lg">Comments: {post._count.comments}</h2>
              <Comments
                resource="posts"
                resourceId={parseInt(postId)}
                setForbiddenMessage={setForbiddenMessage}
              />
            </>
          )}
        </section>
      </article>
    </>
  );
}
