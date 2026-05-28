import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import API_BASE_URL from "../api";
import { useEffect, useState } from "react";

import axios from "axios";

import {
  FaBars,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Dashboard() {

  const [stats, setStats] = useState({
    books_read: 0,
    favorites: 0,
    borrowed: 0,
    reading_hours: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  // Fetch Dashboard Stats
  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_BASE_URL}/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);

      } catch (error) {

        console.error(error);
      }
    };

    fetchStats();

  }, []);

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="flex bg-black min-h-screen"
    >

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-6">

          <button
            onClick={() => setIsOpen(true)}
            className="bg-gray-900 p-4 rounded-2xl"
          >
            <FaBars className="text-white text-2xl" />
          </button>

        </div>

        {/* Topbar */}
        <div className="mb-10">

          <Topbar />

        </div>

        {/* Welcome */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Discover and manage your books easily.
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          <StatsCard
            title="Books Read"
            value={stats.books_read}
          />

          <StatsCard
            title="Favorites"
            value={stats.favorites}
          />

          <StatsCard
            title="Borrowed"
            value={stats.borrowed}
          />

          <StatsCard
            title="Reading Hours"
            value={stats.reading_hours}
          />

        </div>

        {/* Trending Books */}
        <div>

          <h2 className="text-3xl font-bold text-white mb-8">
            Trending Books
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                title: "Atomic Habits",
                author: "James Clear",
                image:
                  "https://images.unsplash.com/photo-1512820790803-83ca734da794",
              },

              {
                title: "Deep Work",
                author: "Cal Newport",
                image:
                  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
              },

              {
                title: "The Psychology of Money",
                author: "Morgan Housel",
                image:
                  "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
              },
            ].map((book, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                }}
                className="bg-gray-900 rounded-3xl overflow-hidden hover:shadow-blue-500/20 transition duration-300 shadow-lg"
              >

                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-white">
                    {book.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {book.author}
                  </p>

                  <button className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white font-semibold transition">
                    Read More
                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default Dashboard;