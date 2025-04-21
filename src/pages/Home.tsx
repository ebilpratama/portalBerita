import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-16 h-16 border-2 border-black flex items-center justify-center text-sm font-bold">
            LOGO
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 py-2 px-4 rounded-full border border-gray-300 shadow focus:outline-none"
          />
          <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-1/4 space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">Kategori</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Olahraga</li>
                <li>Kesehatan</li>
                <li>Politik</li>
                <li>Pendidikan</li>
                <li>Lainnya</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Tersimpan</h3>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-3/4 space-y-10">
            {/* Berita Terhangat */}
            <section>
              <h2 className="font-semibold text-xl mb-3">Berita Terhangat</h2>
              <div className="bg-white h-36 flex items-center justify-center text-lg shadow-md rounded-lg cursor-pointer"
                onClick={() => navigate("/news")}>
                Judul Berita
              </div>
            </section>

            {/* Trending */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-xl">Trending</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/newslist")}>
                  Lainnya
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white h-20 flex items-center justify-center rounded shadow-md cursor-pointer"
                    onClick={() => navigate("/news")}>
                    Judul
                  </div>
                ))}
              </div>
            </section>

            {/* Berita Untukmu */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-xl">Berita Untukmu</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/newslist")}>
                  Lainnya
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white h-20 flex items-center justify-center rounded shadow-md cursor-pointer"
                    onClick={() => navigate("/news")}>
                    Judul
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
