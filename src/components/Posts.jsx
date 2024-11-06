import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import PostsSkeleton from "./PostsSkeleton";
import Error from "./Error";
import apiCall from "../api/apiCall";

export default function Posts() {
  const api = useContext(ApiContext);

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastPostElement = useCallback(
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiCall(`${api}/posts?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { posts, hasMore } = await response.json();
        setPosts((prevPosts) => {
          const existingPostsIds = new Set(prevPosts.map((post) => post.id));
          const uniquePosts = posts.filter((post) => !existingPostsIds.has(post.id));
          return [...prevPosts, ...uniquePosts];
        });
        setHasMore(hasMore);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (error) return <Error resource={"posts"} />;

  return (
    <>
      <div className="container mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start">
        {posts.map((post, index) => (
          <article
            key={index}
            className="bg-white p-4 shadow-md shadow-gray-500 border-black border-2 transition-all transform hover:scale-105"
          >
            {posts.length === index + 1 && <div ref={lastPostElement}></div>}
            <Link to={`post/${post.id}`} className="text-2xl font-bold hover:text-main">
              {post.title}
            </Link>
            <p className="text-gray-700 line-clamp-3 my-4">{post.text}</p>
            <div className="flex justify-between items-end text-sm">
              <div>
                <h3>
                  Author:{" "}
                  <Link
                    to={`/user/${post.authorId}`}
                    className="font-bold text-gray-900 hover:underline"
                  >
                    {post.author.username}
                  </Link>
                </h3>
                <h3>
                  Comments: <span className="font-bold text-gray-900">{post._count.comments}</span>
                </h3>
                <h3>{post.createdAt}</h3>
              </div>
              <div>
                <Link to={`post/${post.id}`} className="hover:text-main">
                  Read more
                </Link>
              </div>
            </div>
          </article>
        ))}
        {loading && hasMore && <PostsSkeleton />}
      </div>
    </>
  );
}
