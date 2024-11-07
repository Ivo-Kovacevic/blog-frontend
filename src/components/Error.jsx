import { useEffect, useState } from "react";

export default function Error({ error }) {
  const [errorMessage, setErrorMessage] = useState(error.message);
  useEffect(() => {
    setErrorMessage(error.message);
  }, [error]);
  return (
    <>
      <div
        onClick={() => setErrorMessage("")}
        className={`z-10 fixed p-4 left-1/2 -translate-x-1/2 -top-16 transition ease-out duration-300 text-white bg-red-700 shadow-md shadow-gray-500 hover:cursor-pointer w-max ${
          errorMessage && "translate-y-24"
        }`}
      >
        {error.message}
      </div>
    </>
  );
}
