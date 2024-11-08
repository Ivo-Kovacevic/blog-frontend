import { createContext, useContext, useEffect, useState } from "react";
import { ErrorContext } from "./ErrorContext";
import apiCall from "../api/apiCall";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { error, setError } = useContext(ErrorContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiCall(`posts?page=${page}&limit=10`);
        if (!response.ok) {
          setError({ message: "Error while fetching posts" });
          return;
        }
        const { posts, hasMore } = await response.json();
        setPosts((prevPosts) => {
          const existingPostsIds = new Set(prevPosts.map((post) => post.id));
          const uniquePosts = posts
            .filter((post) => !existingPostsIds.has(post.id))
            .map((post) => ({
              ...post,
              createdAt: new Date(post.createdAt),
            }));
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

  return (
    <PostsContext.Provider value={{ posts, setPage, loading, setLoading, hasMore }}>
      {children}
    </PostsContext.Provider>
  );
};
