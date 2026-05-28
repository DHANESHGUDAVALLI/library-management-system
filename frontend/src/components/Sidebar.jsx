import {
  FaHome,
  FaBook,
  FaHeart,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaClipboardList,
  FaUserShield,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {

  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {

    // Remove Auth Data
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    // Redirect
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "w-full flex items-center gap-4 bg-blue-600 text-white px-5 py-4 rounded-2xl"
      : "w-full flex items-center gap-4 hover:bg-gray-900 text-gray-300 px-5 py-4 rounded-2xl transition";

  return (

    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          w-72 min-h-screen bg-gray-950 border-r border-gray-800 p-6
          flex flex-col justify-between
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >

        {/* Top */}
        <div>

          {/* Mobile Close */}
          <div className="flex items-center justify-between mb-12 lg:hidden">

            <h1 className="text-3xl font-bold text-white">
              LibSphere
            </h1>

            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-white text-2xl" />
            </button>

          </div>

          {/* Desktop Logo */}
          <h1 className="hidden lg:block text-3xl font-bold text-white mb-12">
            LibSphere
          </h1>

          {/* Navigation */}
          <div className="space-y-3">

            <NavLink
              to="/dashboard"
              className={navClass}
              onClick={() => setIsOpen(false)}
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/books"
              className={navClass}
              onClick={() => setIsOpen(false)}
            >
              <FaBook />
              Browse Books
            </NavLink>

            <NavLink
              to="/favorites"
              className={navClass}
              onClick={() => setIsOpen(false)}
            >
              <FaHeart />
              Favorites
            </NavLink>

            <NavLink
  to="/borrowed"
  className={navClass}
  onClick={() => setIsOpen(false)}
>
  <FaClipboardList />
  Borrowed Books
</NavLink>


            <NavLink
  to="/admin"
  className={navClass}
  onClick={() => setIsOpen(false)}
>
  <FaUserShield />
  Admin
</NavLink>

            <NavLink
              to="/profile"
              className={navClass}
              onClick={() => setIsOpen(false)}
            >
              <FaUser />
              Profile
            </NavLink>

            <NavLink
              to="/settings"
              className={navClass}
              onClick={() => setIsOpen(false)}
            >
              <FaCog />
              Settings
            </NavLink>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 hover:bg-red-500/20 text-red-400 px-5 py-4 rounded-2xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </>
  );
}

export default Sidebar;