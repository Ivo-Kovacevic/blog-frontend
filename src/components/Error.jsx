import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ErrorContext } from "../context/ErrorContext";

export default function Error() {
  const { error, setError } = useContext(ErrorContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
      setShow(true);
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      setShow(false);
    }
  }, [error]);
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [location.pathname]);
  return (
    <>
      <div
        onClick={() => setError("")}
        className={`z-10 fixed p-4 left-1/2 -translate-x-1/2 -top-28 transition ease-out duration-500 text-white bg-red-700 shadow-md shadow-gray-500 hover:cursor-pointer w-max ${
          show && "translate-y-36 block"
        }`}
      >
        {/* Error will be array only when trying to register and failing. This way each error appears below each other. */}
        {Array.isArray(errorMessage)
          ? errorMessage.map((message, index) => <p key={index}>{message}</p>)
          : errorMessage}
      </div>
    </>
  );
}
