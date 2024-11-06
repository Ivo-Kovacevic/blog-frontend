import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import Comments from "../components/Comments";
import Error from "../components/Error";
import apiCall from "../api/apiCall";

export default function User() {
  const api = useContext(ApiContext);

  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [forbiddenMessage, setForbiddenMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiCall(`${api}/users/${userId}`);
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const user = await response.json();
        setUser(user);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, []);

  if (error) return <Error resource={"user"}/>

  return (
    <>
      <div className="mx-auto px-4 sm:px-8 max-w-container">
        <section className="mb-8">
          <h1 className="text-2xl">
            <span className="text-gray-500">User:</span>{" "}
            <span className="font-bold hover:underline hover:cursor-pointer">{user.username}</span>
          </h1>
          <h2>
            <span className="text-gray-500">Role:</span>{" "}
            <span className="font-bold">{user.role}</span>
          </h2>
          <h2>
            <span className="text-gray-500">Number of posts:</span>{" "}
            <span className="font-bold">{user.numOfPosts}</span>
          </h2>
          <h2>
            <span className="text-gray-500">Number of comments:</span>{" "}
            <span className="font-bold">{user.numOfComments}</span>
          </h2>
        </section>
        <section>
          <Comments
            resource={"users"}
            resourceId={userId}
            setForbiddenMessage={setForbiddenMessage}
          />
        </section>
      </div>
    </>
  );
}
