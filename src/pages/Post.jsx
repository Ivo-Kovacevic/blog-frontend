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
            <p>Author: {post.authorId}</p>
            <p>{post.createdAt}</p>
          </div>
          <hr className="border-2 border-black" />
          <div className="my-8">
            <p>{post.content}</p>
          </div>
        </section>
        <section></section>
      </article>
    </>
  );
}

export default Post;
