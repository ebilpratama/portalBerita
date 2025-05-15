
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface FeaturedNewsProps {
  title: string;
  imageUrl?: string;
  excerpt?: string;
  category?: string;
  id?: string;
}

const FeaturedNews = ({ 
  title, 
  imageUrl = "/placeholder.svg",
  excerpt,
  category,
  id = "featured-1"
}: FeaturedNewsProps) => {
  return (
    <section className="relative w-full h-80 md:h-96 bg-cover bg-center rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
        {category && (
          <span className="inline-block bg-news-primary text-white text-xs px-3 py-1 rounded mb-3">
            {category}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{title}</h2>
        {excerpt && (
          <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-3">{excerpt}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm opacity-90 flex items-center gap-1">
            <Calendar size={14} />
            6 Mei 2025
          </span>
          <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
            <Link to={`/article/${id}`}>Baca Selengkapnya</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
