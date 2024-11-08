export default function UserSkeleton() {
  return (
    <>
      <section className="mb-8 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="h-8 w-16 animate-pulse bg-gray-300 rounded" />
          <div className="h-8 w-44 animate-pulse bg-gray-300 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-12 animate-pulse bg-gray-300 rounded" />
          <div className="h-5 w-12 animate-pulse bg-gray-300 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-32 animate-pulse bg-gray-300 rounded" />
          <div className="h-5 w-8 animate-pulse bg-gray-300 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-44 animate-pulse bg-gray-300 rounded" />
          <div className="h-5 w-8 animate-pulse bg-gray-300 rounded" />
        </div>
      </section>
    </>
  );
}
