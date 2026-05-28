import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";

function Favorites() {

  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Favorites
  useEffect(() => {

    const fetchFavorites = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_BASE_URL}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavoriteBooks(response.data);

      } catch (error) {

        console.error(error);

        toast.error("Failed to load favorites");

      } finally {

        setLoading(false);
      }
    };

    fetchFavorites();

  }, []);
  // Remove Favorite
const removeFavorite = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `${API_BASE_URL}/favorites/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update UI
    const updatedFavorites = favoriteBooks.filter(
      (book) => book.id !== id
    );

    setFavoriteBooks(updatedFavorites);

    toast.success("Favorite removed ❌");

  } catch (error) {

    console.error(error);

    toast.error("Failed to remove favorite");
  }
};

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="px-8 py-16">

        <h1 className="text-5xl font-bold mb-12">
          Favorite Books ❤️
        </h1>

        {/* Loading */}
        {loading ? (

          <div className="text-center text-gray-400 text-xl">

            Loading favorites...

          </div>

        ) : favoriteBooks.length === 0 ? (

          <p className="text-gray-400 text-lg">
            No favorite books added yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {favoriteBooks.map((book) => (

              <div
                key={book.id}
                className="bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
              >

                <img
                  src={
                    book.image ||
                    "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={book.title}
                  className="w-full h-80 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold line-clamp-2">
                    {book.title}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {book.author}
                  </p>
                  <button
                     onClick={() => removeFavorite(book.id)}
                     className="mt-5 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                  >
                    Remove Favorite ❌
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Favorites;