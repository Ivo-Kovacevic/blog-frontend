import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen.js";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import NotFound from "./components/NotFound";
import "./assets/styles/output.css";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
