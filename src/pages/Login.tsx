import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-red-50 rounded-2xl p-10 shadow-md w-full max-w-md">
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-200 text-gray-800 font-medium py-2 rounded-full hover:bg-gray-300 transition"
            onClick={() => navigate("/")}>
            LOGIN
          </button>

          <div className="text-center mt-2">
            <a href="#" className="text-sm font-semibold text-black hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>

      {/* Tombol Create Account di bawah form */}
      <div className="absolute bottom-10">
        <button
          className="px-6 py-2 border border-black rounded-full bg-white text-black hover:bg-gray-100 transition"
          onClick={() => navigate("/register")}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
