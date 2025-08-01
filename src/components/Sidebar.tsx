import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Category data
const categories = [
  { id: "olahraga", name: "Olahraga" },
  { id: "kesehatan", name: "Kesehatan" },
  { id: "politik", name: "Politik" },
  { id: "pendidikan", name: "Pendidikan" },
  { id: "ekonomi", name: "Ekonomi" },
  { id: "teknologi", name: "Teknologi" },
  { id: "budaya", name: "Budaya" },
  { id: "lainnya", name: "Lainnya" },
];

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState("olahraga");
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    navigate(`/search?category=${categoryId}`);
  };

  return (
    <aside className="w-64 bg-white shadow-sm p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden md:block">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3 px-3">Kategori</h2>
        <nav>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  className={`category-button block ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category.id);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="pt-4 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-news-hover transition-colors"
          onClick={(e) => {
            e.preventDefault();
            navigate("/add");
          }}
        >
          <PlusCircle size={18} className="mr-2" />
          <span>Kirim Berita</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;