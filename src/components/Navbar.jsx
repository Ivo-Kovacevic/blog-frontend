import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className="p-4">
        <nav className="container mx-auto flex justify-end items-center gap-4 px-4">
          <Link to="/" className="mr-auto text-lg font-bold">
            High
          </Link>
          <Link to="/" className="text-sm">
            HOME
          </Link>
          <Link className="text-sm">LOG IN</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
