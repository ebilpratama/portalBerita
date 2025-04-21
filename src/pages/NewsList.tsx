import React from "react";
import { useNavigate } from "react-router-dom";

const NewsList: React.FC = () => {
    const navigate = useNavigate();
  // Contoh data berita
  const newsData = [
    "Judul Berita 1",
    "Judul Berita 2",
    "Judul Berita 3",
    "Judul Berita 4",
    "Judul Berita 5",
    "Judul Berita 6",
    "Judul Berita 7",
    "Judul Berita 8",
    "Judul Berita 9",
    "Judul Berita 10",
    "Judul Berita 11",
    "Judul Berita 12",
  ];

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
          <main className="w-3/4 space-y-6">
            <section>
              <h2 className="font-semibold text-xl mb-4">List Berita</h2>
              <div className="space-y-4">
                {newsData.map((judul, index) => (
                  <div
                    key={index}
                    className="bg-white h-36 flex items-center justify-center text-lg shadow-md rounded-lg cursor-pointer"
                    onClick={() => navigate("/news")}>
                    {judul}
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

export default NewsList;
