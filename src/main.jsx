import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HeaderFooter from "./components/HeaderFooter";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import Post from "./pages/post/Post";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./assets/styles/output.css";
import { ErrorProvider } from "./context/ErrorContext";
import { PostsProvider } from "./context/PostsContext";

export default function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<HeaderFooter username={username} setUsername={setUsername} />}
        errorElement={<Error />}
      >
        <Route path="" element={<Home />} />
        <Route path="user/:userId" element={<User />} />
        <Route path="post/:postId" element={<Post />} />
        <Route path="login" element={<Login setUsername={setUsername} />} />
        <Route path="register" element={<Register setUsername={setUsername} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </ErrorProvider>
  </StrictMode>
);
