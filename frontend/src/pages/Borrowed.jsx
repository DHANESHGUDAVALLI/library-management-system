import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";

function Borrowed() {

  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Borrowed Books
  useEffect(() => {

    const fetchBorrowedBooks = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_BASE_URL}/borrowed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBorrowedBooks(response.data);

      } catch (error) {

        console.error(error);

        toast.error("Failed to load borrowed books");

      } finally {

        setLoading(false);
      }
    };

    fetchBorrowedBooks();

  }, []);

  // Return Book
  const returnBook = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_BASE_URL}/borrowed/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI
      const updatedBooks = borrowedBooks.filter(
        (book) => book.id !== id
      );

      setBorrowedBooks(updatedBooks);

      toast.success("Book returned successfully 📚");

    } catch (error) {

      console.error(error);

      toast.error("Failed to return book");
    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="px-8 py-16">

        <h1 className="text-5xl font-bold mb-12">
          Borrowed Books 📚
        </h1>

        {/* Loading */}
        {loading ? (

          <div className="text-center text-gray-400 text-xl">

            Loading borrowed books...

          </div>

        ) : borrowedBooks.length === 0 ? (

          <p className="text-gray-400 text-lg">
            No borrowed books yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {borrowedBooks.map((book) => (

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

                  <p className="text-green-400 mt-3 font-semibold">
                    {book.status}
                  </p>

                  <button
                    onClick={() => returnBook(book.id)}
                    className="mt-5 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                  >
                    Return Book 📚
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

export default Borrowed;