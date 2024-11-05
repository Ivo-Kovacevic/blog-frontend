import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { ApiContext } from "../ApiContext";

export default function Home() {
  const api = useContext(ApiContext);

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${api}/posts`, { mode: "cors" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { posts } = await response.json();
        setPosts(posts);
        console.log(posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const loadImage = async () => {
      const img = new Image();
      img.src = "images/hero.webp";
      img.onload = () => setImageLoading(false);
    };

    loadImage();
    fetchPosts();
  }, []);

  if (loading || imageLoading) return <HomeSkeleton />;
  if (error) return <p>Error getting getting posts.</p>;

  return (
    <>
      <main>
        <section className="flex flex-col md:flex-row justify-around items-center gap-8 p-4 sm:p-16">
          <div>
            <h1 className="font-bold text-4xl lg:text-6xl">Welcome to my blog!</h1>
          </div>
          <div>
            <img src="images/hero.webp" alt="Hero" />
          </div>
        </section>
        <section className="p-4">
          <div className="container mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-white p-4 shadow-md shadow-gray-500 border-black border-2 transition-all transform hover:scale-105"
              >
                <Link to={`post/${post.id}`} className="text-2xl font-bold hover:text-main">
                  {post.title}
                </Link>
                <p className="text-gray-700 line-clamp-3 my-4">{post.text}</p>
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <h3>Author: {post.author.username}</h3>
                    <h3>Comments: {post._count.comments}</h3>
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
          </div>
        </section>
      </main>
    </>
  );
}
