import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";

export default function User() {
  const api = useContext(ApiContext);

  const [user, setUser] = useState({});
  const [error, setError] = useState();

  const params = useParams();
  useEffect(() => {
    const { userId } = params;
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
      <div>THIS IS USER</div>
    </>
  );
}
