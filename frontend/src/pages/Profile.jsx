import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import profileImage from "../assets/mb.jpg";

function Profile() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Fetch Profile
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchProfile();

  }, []);

  // Loading State
  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">

        Loading Profile...

      </div>
    );
  }

  return (

    <div className="flex bg-black min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Topbar */}
        <Topbar />

        {/* Profile Card */}
        <div className="bg-gray-900 rounded-3xl p-10 max-w-3xl mx-auto shadow-xl">

          {/* Profile Image */}
          <div className="flex flex-col items-center">

            <img
              src={profileImage}
              alt="profile"
              className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover"
            />

            <h1 className="text-4xl font-bold text-white mt-6">
              {user?.username}
            </h1>

            <p className="text-gray-400 text-lg mt-2">
              Library Member
            </p>

          </div>

          {/* User Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-black p-6 rounded-2xl border border-gray-800">

              <p className="text-gray-400 mb-2">
                Username
              </p>

              <h2 className="text-2xl font-semibold text-white">
                {user?.username}
              </h2>

            </div>

            <div className="bg-black p-6 rounded-2xl border border-gray-800">

              <p className="text-gray-400 mb-2">
                Email
              </p>

              <h2 className="text-2xl font-semibold text-white break-all">
                {user?.email}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;