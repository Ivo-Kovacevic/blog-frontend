export default function Error() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl">This page doesnt exist :/</h1>
        <a href="/" className="hover:text-main hover:underline">
          Return to home page
        </a>
      </div>
    </>
  );
}
