import { useEffect, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import Comments from '../../components/Comments';
import PostSkeleton from '../../components/post/PostSkeleton';
import { PostType } from '../../@types/response';
import { useErrorContext } from '../../context/ErrorContext';
import { usePostsContext } from '../../context/PostsContext';
import apiCall from '../../api/apiCall';

export const Route = createFileRoute('/post/$postId')({
  component: Post,
})

function Post() {
  const { setError } = useErrorContext();
  const { posts, loading, setLoading } = usePostsContext();

  const [post, setPost] = useState<PostType | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load Post
  const { postId } = Route.useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiCall(`posts/${postId}`, "GET", {});
        if (!response.ok) {
          setError({ message: "Error while fetching the post" });
          return;
        }
        const { post }: { post: PostType } = await response.json();
        setPost({
          ...post,
          createdAt: new Date(post.createdAt),
        });
      } catch (error) {
        error instanceof Error ? setError(error) : setError({ message: "An error occurred" });
      } finally {
        setLoading(false);
      }
    };

    // Check if post is stored in posts array then get it from there, else fetch it from api
      const foundPost = posts.find((post) => post.id === parseInt(postId ?? "0"));
      if (foundPost) {
        setPost({
          ...foundPost,
          createdAt: new Date(foundPost.createdAt),
        });
        setLoading(false);
      } else {
        fetchPost();
      }
  }, []);

  const renderText = (text: string) => {
    return text.split("\n").map((line, index) => (
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
                  {post.createdAt.toLocaleString("en-DE")}
                </p>
              </div>
              <hr className="border-2 border-black" />
              <div className="my-8">{renderText(post.text)}</div>
              <h2 className="my-4 text-lg">Comments: {post._count.comments}</h2>
            </section>
          )
        )}
        <section>
          <Comments resource="posts" resourceId={parseInt(postId ?? "0")} />
        </section>
      </article>
    </>
  );
}
