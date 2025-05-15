
import { useState } from "react";
import { Menu, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "olahraga", name: "Olahraga" },
  { id: "kesehatan", name: "Kesehatan" },
  { id: "politik", name: "Politik" },
  { id: "pendidikan", name: "Pendidikan" },
  { id: "lainnya", name: "Lainnya" },
];

const MobileNav = () => {
  const [activeCategory, setActiveCategory] = useState("olahraga");
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string, setOpen: (open: boolean) => void) => {
    setActiveCategory(categoryId);
    navigate(`/search?category=${categoryId}`);
    setOpen(false); // Close the sheet after navigation
  };

  return (
    <div className="md:hidden">
      <Sheet>
        {({ open, setOpen }) => (
          <>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <div className="py-6">
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
                            handleCategoryClick(category.id, setOpen);
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
                  href="#saved"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-news-hover transition-colors"
                >
                  <Bookmark size={18} className="mr-2" />
                  <span>Tersimpan</span>
                </a>
              </div>
            </SheetContent>
          </>
        )}
      </Sheet>
    </div>
  );
};

export default MobileNav;
