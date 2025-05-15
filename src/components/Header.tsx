
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm py-3 px-4 md:px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <div className="border border-gray-800 p-1 w-12 h-12 flex items-center justify-center">
              <span className="font-bold text-sm">LOGO</span>
            </div>
          </Link>
        </div>

        <div className="flex-grow mx-4 max-w-2xl hidden sm:block">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:bg-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="hidden md:inline-flex"
            asChild
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => navigate("/search")}
          >
            <Search size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
