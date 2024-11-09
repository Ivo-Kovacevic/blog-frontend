import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useErrorContext } from "../context/ErrorContext";
import apiCall from "../api/apiCall";
import { useUserContext } from "../context/UserContext";
import { LoginType } from "../@types/response";

export const Route = createFileRoute("/register")({
  component: Login,
});

type ErrorType = {
  errors: {
    msg: string;
  }[];
};

export default function Login() {
  const { setError } = useErrorContext();
  const { setUsername } = useUserContext();

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiCall(`users`, "POST", {
        username: registerUsername,
        password: registerPassword,
        confirmPassword: confirmRegisterPassword,
      });
      if (!response.ok) {
        const data: ErrorType = await response.json();
        if (data.errors) {
          const newErrors: string[] = [];
          data.errors.forEach((error) => {
            newErrors.push(error.msg);
          });

          setError({ message: "Registration failed", messages: newErrors });
        } else {
          setError({ message: "An error occurred" });
        }
        return;
      }
      const data: LoginType = await response.json();
      const userId = data.userId;
      const name = data.username;
      const token = data.token;
      localStorage.setItem("userId", userId.toString());
      localStorage.setItem("username", name);
      localStorage.setItem("jwt", token);
      setUsername(registerUsername);
      navigate({ to: "/" });
    } catch (error) {
      setError({ message: "Registration failed" });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="my-6 sm:my-10 flex justify-center">
          <form
            onSubmit={handleRegister}
            className="shadow-md shadow-gray-500 p-8 border-2 border-black flex flex-col text-center"
          >
            <h1 className="mb-8 text-3xl font-bold">Register</h1>

            <label htmlFor="username" className="mt-8">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setRegisterUsername(e.target.value)}
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
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="p-2 border-2 border-black shadow-md shadow-gray-500"
              required
            />

            <label htmlFor="confirmPassword" className="mt-8">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={(e) => setConfirmRegisterPassword(e.target.value)}
              className="p-2 border-2 border-black shadow-md shadow-gray-500"
              required
            />

            <button
              type="submit"
              className="my-8 px-8 py-2 w-full shadow-md shadow-gray-500 border-2 bg-white border-black font-bold hover:bg-black hover:text-white transition-all"
            >
              Register
            </button>

            <Link to="/login" className="hover:underline">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
