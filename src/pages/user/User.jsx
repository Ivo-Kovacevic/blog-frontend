import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import Comments from "../../components/Comments";
import Error from "../../components/Error";
import apiCall from "../../api/apiCall";
import { ErrorContext } from "../../context/ErrorContext";
import UserSkeleton from "./UserSkeleton";

export default function User() {
  const api = useContext(ApiContext);
  const { error, setError } = useContext(ErrorContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
        if (!response.ok) {
          setError({ message: "Error while fetching the user" });
          return;
        }
        const user = await response.json();
        setUser(user);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="mx-auto px-4 sm:px-8 max-w-container">
        {loading ? (
          <UserSkeleton />
        ) : (
          user && (
            <section className="mb-8">
              <h1 className="text-2xl">
                <span className="text-gray-500">User:</span>{" "}
                <span className="font-bold hover:underline hover:cursor-pointer">
                  {user.username}
                </span>
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
          )
        )}
        <section>
          <Comments
            resource={"users"}
            resourceId={parseInt(userId)}
            setForbiddenMessage={setForbiddenMessage}
          />
        </section>
      </div>
    </>
  );
}
