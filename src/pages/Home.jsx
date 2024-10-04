import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({ api }) {
  const [posts, setPosts] = useState([]);

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
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <main>
        <section className="flex flex-col md:flex-row justify-around items-center gap-8 p-16">
          <div>
            <h1 className="font-bold text-4xl lg:text-6xl">Welcome to my blog!</h1>
          </div>
          <div>
            <img src="images/hero.webp" alt="" />
          </div>
        </section>
        <section className="p-4">
          <div className="container mx-auto grid gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] items-start">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-white p-4 shadow-md shadow-gray-500 border-black border-2 transition-all transform hover:scale-105"
              >
                <Link className="text-2xl font-bold hover:text-main">{post.title}</Link>
                <p className="text-gray-700 line-clamp-3 my-4">{post.content}</p>
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <h3>Author: {post.authorId}</h3>
                    <h3>Comments: {post.comments.length}</h3>
                    <h3>{post.createdAt}</h3>
                  </div>
                  <div>
                    <Link className="hover:text-main">Read more</Link>
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
