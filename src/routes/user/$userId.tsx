import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useErrorContext } from "../../context/ErrorContext.js";
import apiCall from "../../api/apiCall.js";
import { UserType } from "../../@types/response.js";
import UserSkeleton from "../../components/user/UserSkeleton.js";
import Comments from "../../components/Comments.js";

export const Route = createFileRoute("/user/$userId")({
  component: User,
});

function User() {
  const { setError } = useErrorContext();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userId } = Route.useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiCall(`users/${userId}`, "GET", {});
        if (!response.ok) {
          setError({ message: "Error while fetching the user" });
          return;
        }
        const user = await response.json();
        setUser(user);
      } catch (error) {
        error instanceof Error ? setError(error) : setError({ message: "An error occurred" });
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
          <Comments resource={"users"} resourceId={parseInt(userId ?? "0")} />
        </section>
      </div>
    </>
  );
}
