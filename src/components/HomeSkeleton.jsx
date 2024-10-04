export default function HomeSkeleton() {
  return (
    <>
      <main>
        <section className="flex flex-col md:flex-row justify-around items-center gap-8 p-16">
          <div className="w-1/2">
            <div className="my-2 h-14 w-full animate-pulse bg-gray-300 rounded"></div>
            <div className="h-14 w-3/4 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="w-1/2">
            <div className="w-full h-64 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </section>
        <section className="p-4">
          <div className="container mx-auto grid gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] items-start">
            {Array.from({ length: 6 }, (_, index) => (
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
          </div>
        </section>
      </main>
    </>
  );
}
