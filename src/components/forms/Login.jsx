import React, { useState } from "react";
import { API_URL } from "../../utils/apiPath";

const Login = ({ showMainPageHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginhandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successfully");
        localStorage.setItem("loginToken", data.token);
        setEmail("");
        setPassword("");
        showMainPageHandler();
      }
    } catch (err) {
      console.error("Login failed ", err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back 👋
        </h2>

        <form onSubmit={loginhandler} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Log in
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => (window.location.href = `${API_URL}/auth/google`)}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
            Continue with Google
          </button>

          <button
            onClick={() => (window.location.href = `${API_URL}/auth/github`)}
            className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition"
          >
            <img src="https://img.icons8.com/ios-glyphs/16/ffffff/github.png" alt="GitHub" className="mr-2" />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
