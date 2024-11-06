export default function Error({ resource }) {
  return (
    <>
      <h1 className="text-center text-xl text-red-500">Error getting {resource}.</h1>
    </>
  );
}
