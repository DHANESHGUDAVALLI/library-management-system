import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

import toast from "react-hot-toast";

import profilePic from "../assets/mb.jpg";

function Topbar() {

  return (

    <div className="flex items-center justify-between gap-6">

      {/* Search */}
      <div className="flex items-center bg-gray-900 px-6 py-4 rounded-2xl w-full max-w-2xl">

        <FaSearch className="text-gray-400 text-xl" />

        <input
          type="text"
          placeholder="Search books..."
          className="bg-transparent outline-none text-white ml-4 w-full"
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button
          onClick={() =>
            toast("No new notifications 🔔")
          }
          className="bg-gray-900 hover:bg-gray-800 transition p-5 rounded-2xl"
        >
          <FaBell className="text-white text-xl" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-4 bg-gray-900 px-5 py-3 rounded-2xl">

          <img
            src={profilePic}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>

            <h2 className="text-white font-bold text-lg">
              Dhanesh
            </h2>

            <p className="text-gray-400 text-sm">
              Student
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;