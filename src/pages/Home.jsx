import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { ApiContext } from "../ApiContext";
import Posts from "../components/Posts";

export default function Home() {
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      const img = new Image();
      img.src = "images/hero.webp";
      img.onload = () => setHeroLoading(false);
    };

    loadImage();
  }, []);

  return (
    <>
      <main>
        {heroLoading ? (
          <HomeSkeleton />
        ) : (
          <section className="flex flex-col md:flex-row justify-around items-center gap-8 p-4 sm:p-16">
            <div>
              <h1 className="font-bold text-4xl lg:text-6xl">Welcome to my blog!</h1>
            </div>
            <div>
              <img src="images/hero.webp" alt="Hero" />
            </div>
          </section>
        )}
        <section className="p-4">
          <Posts />
        </section>
      </main>
    </>
  );
}
