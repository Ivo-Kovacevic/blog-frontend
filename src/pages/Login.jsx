import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";

export default function Login({ setUsername }) {
  const api = useContext(ApiContext);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/login`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      if (!response.ok) {
        setError("Incorrect username or password");
        throw new Error("Incorrect username or password");
      }
      const data = await response.json();
      const userId = data.userId;
      const name = data.username;
      const token = data.token;
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", name);
      localStorage.setItem("jwt", token);
      setUsername(loginUsername);
      return navigate("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      {/* Display message if user tries some action without being logged in */}
      {error && (
        <div
          onClick={() => setError("")}
          className="fixed p-4 left-1/2 -translate-x-1/2 text-white bg-red-700 shadow-md shadow-gray-500 hover:cursor-pointer"
        >
          {error}
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="my-6 sm:my-16 flex justify-center">
          <form
            onSubmit={handleLogin}
            className="shadow-md shadow-gray-500 p-8 border-2 border-black flex flex-col text-center"
          >
            <h1 className="mb-8 text-3xl font-bold">Log in</h1>

            <label htmlFor="username" className="mt-8">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setLoginUsername(e.target.value)}
              className="p-2 border-2 border-black shadow-md shadow-gray-500"
              required
            />

            <label htmlFor="password" className="mt-8">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setLoginPassword(e.target.value)}
              className="p-2 border-2 border-black shadow-md shadow-gray-500"
              required
            />

            <button
              type="submit"
              className="my-8 px-8 py-2 w-full shadow-md shadow-gray-500 border-2 bg-white border-black font-bold hover:bg-black hover:text-white transition-all"
            >
              Log in
            </button>

            <a href="/register" className="hover:underline">
              Don't have an account? Register
            </a>
          </form>
        </div>
      </div>
    </>
  );
}
