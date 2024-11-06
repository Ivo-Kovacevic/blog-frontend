export default function HomeSkeleton() {
  return (
    <>
        <section className="flex flex-col md:flex-row justify-around items-center gap-8 p-16">
          <div className="w-1/2">
            <div className="my-2 h-14 w-full animate-pulse bg-gray-300 rounded"></div>
            <div className="h-14 w-3/4 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="w-1/2">
            <div className="w-full h-64 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </section>
    </>
  );
}
