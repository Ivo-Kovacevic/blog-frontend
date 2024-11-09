import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useErrorContext } from "../context/ErrorContext";
import apiCall from "../api/apiCall";
import { useUserContext } from "../context/UserContext";
import { LoginType } from "../@types/response";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { setError } = useErrorContext();
  const { setUsername } = useUserContext();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiCall(`login`, "POST", {
        username: loginUsername,
        password: loginPassword,
      });
      if (!response.ok) {
        setError({ message: "Invalid username or password" });
        return;
      }
      const data: LoginType = await response.json();
      const userId = data.userId;
      const name = data.username;
      const token = data.token;
      localStorage.setItem("userId", userId.toString());
      localStorage.setItem("username", name);
      localStorage.setItem("jwt", token);
      setUsername(loginUsername);
      navigate({ to: "/" });
    } catch (error) {
      console.log(error);

      error instanceof Error ? setError(error) : setError({ message: "An error occurred" });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="my-6 sm:my-10 flex justify-center">
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

            <Link to="/register" className="hover:underline">
              Don't have an account? Register
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
