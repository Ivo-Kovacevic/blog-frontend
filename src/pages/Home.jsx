import React, { useState, useEffect } from "react";

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
        <section className="flex flex-col md:flex-row justify-around items-center gap-8 p-16 bg-gray-200">
          <div>
            <h1 className="font-bold text-4xl lg:text-6xl">Welcome to my blog!</h1>
          </div>
          <div>
            <img src="images/hero.webp" alt="" />
          </div>
        </section>
        <section className="p-4 bg-gray-200">
          <div className="container mx-auto grid gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] items-start">
            {posts.map((post, index) => (
              <div key={index} className="bg-white p-4 shadow-md shadow-gray-500">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
