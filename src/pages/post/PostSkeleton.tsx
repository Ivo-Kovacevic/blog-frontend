export default function PostSkeleton() {
  return (
    <>
      <section className="mb-4">
        <div className="my-8">
          <div className="my-2 h-14 w-full animate-pulse bg-gray-300 rounded"></div>
          <div className="my-2 h-14 w-4/5 animate-pulse bg-gray-300 rounded"></div>
          <div className="my-2 h-4 w-32 animate-pulse bg-gray-300 rounded"></div>
          <div className="my-2 h-4 w-32 animate-pulse bg-gray-300 rounded"></div>
        </div>
        <hr className="border-2 border-gray-300 animate-pulse" />
        <div className="my-8">
          {Array.from({ length: 10 }, (_, i) => (
            <p
              key={i}
              className={`my-2 h-4 ${
                i === 9 ? "w-4/5" : "w-full"
              } animate-pulse bg-gray-300 rounded`}
            ></p>
          ))}
        </div>
        <div className="h-16 bg-gray-300 animate-pulse rounded">
          <div className="h-full w-36 float-right bg-gray-400 animate-pulse rounded" />
        </div>
      </section>
    </>
  );
}
