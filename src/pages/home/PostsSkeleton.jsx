export default function PostsSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <article key={index} className="bg-gray-400 p-4 animate-pulse rounded">
          <div className="mb-1 h-6 w-full bg-gray-300 animate-pulse rounded"></div>
          <div className="mb-4 h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
          <div className="mb-1 h-4 w-full bg-gray-300 animate-pulse rounded"></div>
          <div className="mb-1 h-4 w-full bg-gray-300 animate-pulse rounded"></div>
          <div className="mb-4 h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
          <div className="flex justify-between items-end text-sm">
            <div>
              <div className="my-1 h-4 w-32 animate-pulse bg-gray-300 rounded"></div>
              <div className="my-1 h-4 w-32 animate-pulse bg-gray-300 rounded"></div>
              <div className="my-1 h-4 w-32 animate-pulse bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="my-1 h-4 w-32 animate-pulse bg-gray-300 rounded"></div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
