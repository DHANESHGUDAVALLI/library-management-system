import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";

function Admin() {

  const [stats, setStats] = useState({
    total_users: 0,
    total_favorites: 0,
    total_borrowed: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch Stats
  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await axios.get(
          `${API_BASE_URL}/admin/stats`
        );

        setStats(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchStats();

  }, []);

  // Loading
  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">

        Loading Admin Dashboard...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="px-8 py-16">

        <h1 className="text-5xl font-bold mb-12">
          Admin Dashboard 👨‍💼
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Users */}
          <div className="bg-gray-900 rounded-3xl p-8 shadow-lg">

            <h2 className="text-2xl text-gray-400">
              Total Users
            </h2>

            <p className="text-5xl font-bold mt-6">
              {stats.total_users}
            </p>

          </div>

          {/* Favorites */}
          <div className="bg-gray-900 rounded-3xl p-8 shadow-lg">

            <h2 className="text-2xl text-gray-400">
              Total Favorites
            </h2>

            <p className="text-5xl font-bold mt-6">
              {stats.total_favorites}
            </p>

          </div>

          {/* Borrowed */}
          <div className="bg-gray-900 rounded-3xl p-8 shadow-lg">

            <h2 className="text-2xl text-gray-400">
              Borrowed Books
            </h2>

            <p className="text-5xl font-bold mt-6">
              {stats.total_borrowed}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;