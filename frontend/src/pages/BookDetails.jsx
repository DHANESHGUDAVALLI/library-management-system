import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../api";
import axios from "axios";
import toast from "react-hot-toast";

function BookDetails() {

  const location = useLocation();

  const navigate = useNavigate();

  const book = location.state;

  // If no book found
  if (!book) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl font-bold">

        Book Not Found

      </div>

    );
  }

  // Add To Favorites
  const addToFavorites = async () => {

    try {

      const token = localStorage.getItem("token");

      // Redirect if not logged in
      if (!token) {

        navigate("/login");

        return;
      }

      await axios.post(
        `${API_BASE_URL}/favorites`,
        {
          title: book.title,

          author: book.author_name
            ? book.author_name.join(", ")
            : "Unknown Author",

          image: coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
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

      toast.error("Failed to add favorite");
    }
  };

  // Borrow Book
  const borrowBook = async () => {

    try {

      const token = localStorage.getItem("token");

      // Redirect if not logged in
      if (!token) {

        navigate("/login");

        return;
      }

      await axios.post(
        `${API_BASE_URL}/borrow`,
        {
          title: book.title,

          author: book.author_name
            ? book.author_name.join(", ")
            : "Unknown Author",

          image: coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
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

      toast.error("Failed to borrow book");
    }
  };

  const coverId = book.cover_i;

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Image */}
          <div>

            <img
              src={
                typeof coverId === "string"
                  ? coverId
                  : coverId
                    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                    : "https://via.placeholder.com/400x600?text=No+Image"
              }
              alt={book.title}
              className="w-full max-w-md rounded-3xl shadow-2xl object-cover"
            />

          </div>

          {/* Details */}
          <div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {book.title || "Unknown Title"}
            </h1>

            <p className="text-2xl text-gray-400 mt-6">
              {book.author_name
                ? book.author_name.join(", ")
                : "Unknown Author"}
            </p>

            <p className="text-gray-500 mt-6 text-lg">
              First Published:
              {" "}
              {book.first_publish_year || "Unknown"}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">

              <button
                onClick={addToFavorites}
                className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-2xl font-semibold transition"
              >
                Add to Favorites ❤️
              </button>

              <button
                onClick={borrowBook}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold transition"
              >
                Borrow Book 📚
              </button>

            </div>

            {/* Subjects */}
            <div className="mt-12">

              <h2 className="text-3xl font-bold mb-6">
                Subjects
              </h2>

              <div className="flex flex-wrap gap-4">

                {book.subject && Array.isArray(book.subject) ? (

                  book.subject.slice(0, 10).map((subject, index) => (

                    <span
                      key={index}
                      className="bg-gray-900 px-5 py-3 rounded-2xl text-gray-300"
                    >
                      {subject}
                    </span>

                  ))

                ) : (

                  <p className="text-gray-500">
                    No subjects available.
                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;