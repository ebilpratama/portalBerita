
import { Link } from "react-router-dom";
import NewsCard from "./NewsCard";
import { Separator } from "@/components/ui/separator";

interface NewsSectionProps {
  title: string;
  viewMore?: boolean;
  viewMoreLink?: string;
  children?: React.ReactNode;
}

const NewsSection = ({ title, viewMore = false, viewMoreLink = "#more", children }: NewsSectionProps) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewMore && (
          <Link to={viewMoreLink} className="text-sm text-news-primary hover:underline flex items-center gap-1">
            Lainnya
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        )}
      </div>
      <Separator className="mb-4" />
      {children}
    </section>
  );
};

export default NewsSection;
