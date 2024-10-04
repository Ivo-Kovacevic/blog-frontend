import { Link, Outlet } from "react-router-dom";

export default function HeaderFooter() {
  return (
    <>
      <header className="p-4">
        <nav className="container mx-auto flex justify-end items-center gap-4 px-4">
          <Link to="/" className="mr-auto text-lg font-bold">
            High
          </Link>
          <Link to="/" className="text-sm hover:text-main">
            HOME
          </Link>
          <Link className="text-sm hover:text-main">LOG IN</Link>
        </nav>
      </header>

      <Outlet />

      <footer className="p-4">
        <div className="container mx-auto px-4 py-8">
          <h3>High {new Date().getFullYear()} © All rights reserved</h3>
        </div>
      </footer>
    </>
  );
}
