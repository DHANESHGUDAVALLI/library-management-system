import { FaBookOpen } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import profilePic from "../assets/mb.jpg";

function Navbar() {

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white transition";

  return (

    <nav className="flex items-center justify-between px-8 py-5 bg-gray-950 border-b border-gray-800">

      {/* Logo */}
      <div className="flex items-center gap-3">

        <FaBookOpen className="text-2xl text-blue-500" />

        <h1 className="text-2xl font-bold text-white">
          LibSphere
        </h1>

      </div>

      {/* Navigation */}
      <div className="hidden md:flex items-center gap-6">

        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/books" className={navLinkClass}>
          Books
        </NavLink>

        <NavLink to="/favorites" className={navLinkClass}>
          Favorites
        </NavLink>

        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <NavLink
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
        >
          Login
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;