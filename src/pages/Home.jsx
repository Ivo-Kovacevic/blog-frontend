export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-around items-center gap-8 p-16 bg-gray-200">
        <div>
          <h1 className="font-bold text-4xl md:text-6xl">Welcome to my blog!</h1>
        </div>
        <div>
          <img src="images/hero.webp" alt="" />
        </div>
      </div>
    </>
  );
}
