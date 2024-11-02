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
import Home from "./pages/Home";
import User from "./pages/User";
import Post from "./pages/Post";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./assets/styles/output.css";
import { ApiContext } from "./ApiContext";

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
    <ApiContext.Provider value={import.meta.env.VITE_API_URL}>
      <App />
    </ApiContext.Provider>
  </StrictMode>
);
