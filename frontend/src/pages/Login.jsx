import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginBg from "../assets/library-bg.png";
import { Link } from "react-router-dom";
import API_BASE_URL from "../api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(
      `${API_BASE_URL}/login`,
      {
        email,
        password,
      }
    );

    // Save Token
    localStorage.setItem(
      "token",
      response.data.token
    );

    // Save User
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: response.data.username,
        email: response.data.email,
      })
    );

    toast.success("Login successful 🚀");

    // Redirect
    navigate("/dashboard");

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Login failed ❌"
    );
  }
};

  return (

    <div
      className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-black/70 backdrop-blur-lg p-10 rounded-3xl w-full max-w-md shadow-2xl border border-gray-700">

        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to continue your reading journey
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-gray-700 text-white outline-none focus:border-blue-500 transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-gray-700 text-white outline-none focus:border-blue-500 transition"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-white font-semibold transition duration-300"
          >
            Login
          </button>
          <p className="text-gray-400 mt-6 text-center">

  Don't have an account?{" "}

  <Link
    to="/register"
    className="text-blue-500 hover:text-blue-400 font-semibold"
  >
    Register
  </Link>

</p>

        </form>

      </div>

    </div>
  );
}

export default Login;