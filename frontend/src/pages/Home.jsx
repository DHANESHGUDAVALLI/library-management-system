import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {

    if (!search.trim()) return;

    try {

      setLoading(true);

      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}`
      );

      const formattedBooks = response.data.docs.slice(0, 20);

      setBooks(formattedBooks);

    } catch (error) {

      console.error(error);

      setBooks([]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28">

        <h1 className="text-6xl md:text-7xl font-bold leading-tight max-w-5xl">
          Modern
          <span className="text-blue-500"> Library </span>
          Management
          <br />
          Platform
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
          Search and explore millions of books instantly.
        </p>

        {/* Search */}
        <div className="mt-10 flex w-full max-w-2xl">

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchBooks();
              }
            }}
            className="flex-1 px-6 py-4 rounded-l-xl bg-gray-900 border border-gray-700 text-white outline-none"
          />

          <button
            onClick={searchBooks}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-r-xl font-semibold transition"
          >
            Search
          </button>

        </div>

      </section>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-10 text-lg text-gray-400">
          Loading books...
        </p>
      )}

      {/* Books */}
      <section className="px-8 py-20">

        {books.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {books.map((book) => {

              const coverId = book.cover_i;

              return (
                <div
                  key={book.key}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
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

                    <h2 className="text-xl font-bold line-clamp-2">
                      {book.title}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Unknown Author"}
                    </p>

                    <p className="text-gray-500 text-sm mt-3">
                      First Published:
                      {" "}
                      {book.first_publish_year || "Unknown"}
                    </p>
                    
                    <button
  onClick={() =>
    navigate(`/book/${encodeURIComponent(book.key)}`, {
      state: book,
    })
  }
  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
>
  View Details
</button>
                    
                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          !loading &&
          <p className="text-center text-gray-500">
            Search for books to display results.
          </p>

        )}

      </section>

    </div>
  );
}

export default Home;