import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-red-50 rounded-2xl p-10 shadow-md w-full max-w-md">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="Masukkan nama"
            />
          </div>

          <div>
            <label htmlFor="password1" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password1"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password2"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
              placeholder="Ulangi password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-200 text-gray-800 font-medium py-2 rounded-full hover:bg-gray-300 transition"
            onClick={() => navigate("/login")}>
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
