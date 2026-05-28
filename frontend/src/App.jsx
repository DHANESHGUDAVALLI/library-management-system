import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import BookDetails from "./pages/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Borrowed from "./pages/Borrowed";
import Admin from "./pages/Admin";
import Chatbot from "./components/Chatbot";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="/book/:id" element={<BookDetails />} />

        <Route
          path="/borrowed"
          element={
            <ProtectedRoute>
              <Borrowed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

      <Chatbot />

    </BrowserRouter>

  );
}

export default App;