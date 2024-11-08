import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useErrorContext } from "./ErrorContext";
import apiCall from "../api/apiCall";
import { PostType } from "../@types/response";

type PostsContext = {
  posts: PostType[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
};

export const PostsContext = createContext<PostsContext | null>(null);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const { setError } = useErrorContext();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiCall(`posts?page=${page}&limit=10`, "GET", {});
        if (!response.ok) {
          setError({ message: "Error while fetching posts" });
          return;
        }
        const { posts, hasMore }: { posts: PostType[]; hasMore: boolean } = await response.json();
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
        error instanceof Error ? setError(error) : setError({ message: "An error occurred" });
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

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (context === null) {
    throw new Error("usePostsContext must be used within an PostsProvider");
  }
  return context;
};
