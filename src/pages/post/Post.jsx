import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ErrorContext } from "../../context/ErrorContext";
import apiCall from "../../api/apiCall";
import Comments from "../../components/Comments";
import PostSkeleton from "./PostSkeleton";

export default function Post() {
  const { error, setError } = useContext(ErrorContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load Post
  const params = useParams();
  const { postId } = params;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiCall(`posts/${postId}`);
        if (!response.ok) {
          setError({ message: "Error while fetching the post" });
          return;
        }
        const { post } = await response.json();
        setPost({
          ...post,
          createdAt: new Date(post.createdAt),
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const renderText = (content) => {
    return content.split("\n").map((line, index) => (
      <p key={index} className="mb-4">
        {line}
      </p>
    ));
  };

  return (
    <>
      <article className="mx-auto px-4 sm:px-8 max-w-container">
        {loading ? (
          <PostSkeleton />
        ) : (
          post && (
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
              <h2 className="my-4 text-lg">Comments: {post._count.comments}</h2>
            </section>
          )
        )}
        <section>
          <Comments resource="posts" resourceId={parseInt(postId)} />
        </section>
      </article>
    </>
  );
}
