import React from "react";
import { useNavigate } from "react-router-dom";

const News: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button className="w-16 h-16 border-2 border-black flex items-center justify-center text-sm font-bold"
            onClick={() => navigate("/")}>
            LOGO
          </button>
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 py-2 px-4 rounded-full border border-gray-300 shadow focus:outline-none"
          />
          <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-1/4 space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">Kategori</h3>
              <div className="space-y-2 text-gray-700">
              {["Olahraga", "Kesehatan", "Politik", "Pendidikan", "Lainnya"].map((kategori) => (
              <button
              key={kategori}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded transition"
              onClick={() => console.log(`Navigasi ke kategori: ${kategori}`)}>
              {kategori}
              </button>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Tersimpan</h3>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-4/5 pl-6 flex gap-6">
            {/* Konten Berita */}
            <div className="flex-1 space-y-6">
              <div className="bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold text-center mb-6">JUDUL BERITA</h1>
                <div className="w-full bg-gray-300 h-64 flex items-center justify-center mb-6">
                  Gambar
                </div>
                <p className="text-sm leading-relaxed text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                  <br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Morbi tristique senectus et netus et malesuada fames ac turpis
                  egestas. Aenean sed adipiscing diam donec adipiscing tristique
                  risus nec. In ornare quam viverra orci sagittis eu volutpat
                  odio facilisis. Quis commodo odio aenean sed adipiscing diam
                  donec.
                </p>
              </div>

              {/* Komentar */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Comment</h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div>
                    <strong>User</strong>
                    <p>lorem ipsum</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Kanan */}
            <aside className="w-1/4 space-y-4">
              <h3 className="font-semibold">Berita Serupa</h3>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white h-16 rounded shadow"></div>
              ))}
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default News;
