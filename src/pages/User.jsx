import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import Comments from "../components/Comments";

export default function User() {
  const api = useContext(ApiContext);

  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [forbiddenMessage, setForbiddenMessage] = useState("");

  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${api}/users/${userId}`, { mode: "cors" });
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const user = await response.json();
        setUser(user);
        console.log(user);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="mx-auto px-4 sm:px-8 max-w-container">
        <section>
          <h1 className="text-xl">
            <span className="text-gray-500">User:</span>{" "}
            <span className="font-bold">{user.username}</span>
          </h1>
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
