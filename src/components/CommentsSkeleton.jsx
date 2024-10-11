export default function CommentsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between gap-4 mb-4 bg-gray-300 p-4 animate-pulse rounded"
        >
          {/* Top comment bar */}
          <div className="flex gap-4">
            <div className="min-w-36 h-6 bg-gray-400 animate-pulse rounded"></div>
            <div className="min-w-36 h-6 bg-gray-400 animate-pulse rounded"></div>
            <div className="ml-auto min-w-36 h-6 bg-gray-400 animate-pulse rounded"></div>
          </div>
          {/* Comment text */}
          <div>
            <div className="bg-gray-400 h-6 mb-1 animate-pulse rounded"></div>
            <div className="w-4/5 h-6 bg-gray-400 animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}
