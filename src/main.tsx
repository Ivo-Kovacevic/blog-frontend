import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/output.css";
import { routeTree } from "./routeTree.gen.js";
import { createRouter, RouterProvider } from "@tanstack/react-router";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
});

export default function App() {
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
