import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
import "./assets/styles/output.css";

const api = "http://localhost:3000";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HeaderFooter />} errorElement={<Error />}>
      <Route path="" element={<Home api={api} />} />
      <Route path="user" element={<User />} />
      <Route path="post" element={<Post />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
