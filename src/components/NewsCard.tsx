
import { Link } from "react-router-dom";

interface NewsCardProps {
  title: string;
  category?: string;
  imageUrl?: string;
  timestamp?: string;
  size?: "small" | "medium" | "large";
  excerpt?: string;
  id?: string;
}

const NewsCard = ({ 
  title, 
  category, 
  imageUrl = "/placeholder.svg", 
  timestamp = "2 jam yang lalu",
  size = "medium",
  excerpt,
  id = "trending-1"
}: NewsCardProps) => {
  
  const sizes = {
    small: "h-32",
    medium: "h-40",
    large: "h-52",
  };

  return (
    <article className="news-card h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <Link to={`/article/${id}`} className="flex-grow flex flex-col">
        <div 
          className={`${sizes[size]} w-full bg-cover bg-center relative rounded-t-lg`} 
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {category && (
            <span className="absolute top-2 left-2 bg-news-primary text-white text-xs px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
        <div className="p-3 flex-grow flex flex-col">
          <h3 className={`news-title ${size === "large" ? "text-xl" : "text-base"} line-clamp-2`}>
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{excerpt}</p>
          )}
          <div className="mt-auto pt-2">
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
