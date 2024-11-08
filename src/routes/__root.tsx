import { Outlet, createRootRoute } from "@tanstack/react-router";
import HeaderFooter from "../components/HeaderFooter";
import { ErrorProvider } from "../context/ErrorContext";
import { PostsProvider } from "../context/PostsContext";
import { UserProvider } from "../context/UserContext";

export const Route = createRootRoute({
  component: () => (
    <UserProvider>
      <ErrorProvider>
        <PostsProvider>
          <HeaderFooter>
            <Outlet />
          </HeaderFooter>
        </PostsProvider>
      </ErrorProvider>
    </UserProvider>
  ),
});
