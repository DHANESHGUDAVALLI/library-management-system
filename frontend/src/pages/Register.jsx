import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import bgImage from "../assets/library-bg.png";
import API_BASE_URL from "../api";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      toast.error("Passwords do not match ❌");

      return;
    }

    try {

      const response = await axios.post(
        `${API_BASE_URL}/register`,
        {
          username,
          email,
          password,
        }
      );

      toast.success(
        response.data.message || "Registration successful 🚀"
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed ❌"
      );
    }
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/10">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-gray-300 text-center mt-3">
          Join the modern library platform
        </p>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="mt-10 space-y-6"
        >

          {/* Full Name */}
          <div>

            <label className="text-gray-200 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-600 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Email */}
          <div>

            <label className="text-gray-200 block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-600 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Password */}
          <div>

            <label className="text-gray-200 block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-600 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="text-gray-200 block mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-600 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-xl text-white font-semibold text-lg"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className="text-gray-300 text-center mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-400 ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;