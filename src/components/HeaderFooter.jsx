import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export default function HeaderFooter({ username, setUsername }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("jwt");
    setUsername("");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <header className="p-4">
        <nav className="container mx-auto flex justify-end items-center gap-16 px-4">
          <Link to="/" className="mr-auto text-lg font-bold">
            High
          </Link>
          <Link to="/" className="text-sm hover:text-main">
            HOME
          </Link>
          {username ? (
            <div className="relative group">
              <button className="text-sm hover:text-main">{username}</button>
              <div className="flex flex-col absolute -right-1/2 bg-white border shadow-lg z-10 opacity-0 w-max group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
                <Link className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-sm hover:text-main">
              LOG IN
            </Link>
          )}
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
