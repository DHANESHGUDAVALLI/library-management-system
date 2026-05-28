import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import API_BASE_URL from "../api";

function Books() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("programming");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Add To Favorites
  const addToFavorites = async (book) => {

  const token = localStorage.getItem("token");

  // If not logged in
  if (!token) {

    toast.error("Please login first");

    navigate("/login");

    return;
  }

  try {

    await axios.post(
      `${API_BASE_URL}/favorites`,
      {
        title: book.title,

        author: book.author_name
          ? book.author_name.join(", ")
          : "Unknown Author",

        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Book added to favorites ❤️");

  } catch (error) {

    console.error(error);

    toast.error("Failed to add favorite ❌");
  }
};

 // Borrow Book
const borrowBook = async (book) => {

  const token = localStorage.getItem("token");

  // If not logged in
  if (!token) {

    toast.error("Please login first");

    navigate("/login");

    return;
  }

  try {

    await axios.post(
      `${API_BASE_URL}/borrow`,
      {
        title: book.title,

        author: book.author_name
          ? book.author_name.join(", ")
          : "Unknown Author",

        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Book borrowed successfully 📚");

  } catch (error) {

    console.error(error);

    toast.error("Failed to borrow book ❌");
  }
};

  // Fetch Books
  const fetchBooks = async (query) => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/books/search?q=${query}`
      );

      setBooks(response.data.docs.slice(0, 24));

    } catch (error) {

      console.error(error);

      toast.error("Failed to fetch books ❌");

    } finally {

      setLoading(false);

    }
  };

  // Initial Load
  useEffect(() => {

    fetchBooks(search);

  }, []);

  // Search Handler
  const handleSearch = () => {

    fetchBooks(search);
  };

  // Categories
  const categories = [
    "Programming",
    "Science",
    "History",
    "AI",
    "Business",
    "Psychology",
  ];

  return (

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="min-h-screen bg-black text-white"
  >

    <Navbar />

    {/* Header */}
    <div className="px-8 pt-16">

      <h1 className="text-5xl font-bold">
        Explore Books
      </h1>

      <p className="text-gray-400 mt-4 text-lg">
        Discover trending books from different categories.
      </p>

    </div>

    {/* Search */}
    <div className="px-8 mt-10 flex flex-col md:flex-row gap-4">

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-1 px-6 py-4 rounded-2xl bg-gray-900 border border-gray-700 outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold transition"
      >
        Search
      </button>

    </div>

    {/* Categories */}
    <div className="px-8 mt-10 flex flex-wrap gap-4">

      {categories.map((category, index) => (

        <button
          key={index}
          onClick={() => {
            setSearch(category);
            fetchBooks(category);
          }}
          className="bg-gray-900 hover:bg-blue-600 transition px-6 py-3 rounded-2xl text-gray-300 hover:text-white"
        >
          {category}
        </button>

      ))}

    </div>

    {/* Loading */}
    {loading && (
      <p className="text-center mt-16 text-gray-400 text-lg">
        Loading books...
      </p>
    )}

    {/* Books Grid */}
    <div className="px-8 py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {books.map((book, index) => {

          const coverId = book.cover_i;

          return (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="bg-gray-900 rounded-3xl overflow-hidden hover:shadow-blue-500/20 transition duration-300 shadow-lg"
            >

              <img
                src={
                  coverId
                    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                    : "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={book.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold line-clamp-2">
                  {book.title}
                </h2>

                <p className="text-gray-400 mt-2">
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Unknown Author"}
                </p>

                <p className="text-gray-500 mt-3 text-sm">
                  First Published:
                  {" "}
                  {book.first_publish_year || "Unknown"}
                </p>

                {/* Read More */}
                <button
                  onClick={() =>
                    navigate(`/book/${index}`, {
                      state: book,
                    })
                  }
                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
                >
                  Read More
                </button>

                {/* Favorite */}
                <button
                  onClick={() => addToFavorites(book)}
                  className="mt-3 w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-xl font-semibold transition"
                >
                  Add to Favorites ❤️
                </button>

                {/* Borrow */}
                <button
                  onClick={() => borrowBook(book)}
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
                >
                  Borrow Book 📚
                </button>

              </div>

            </motion.div>

          );
        })}

      </div>

    </div>

  </motion.div>
);
}

export default Books;