// file: pages/Index.tsx

import { useState, useEffect } from "react"; // <-- 1. Import useState
import axios from "axios"; // <-- 2. Import axios
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import FeaturedNews from "@/components/FeaturedNews";
import NewsSection from "@/components/NewsSection";
import NewsCard from "@/components/NewsCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // 3. Ganti data statis dengan state
  const [featuredNews, setFeaturedNews] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Gunakan useEffect untuk mengambil data dari backend saat komponen dimuat
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles/articles');
        const articles = response.data.data;

        if (articles && articles.length > 0) {
          // Artikel pertama untuk 'featured'
          setFeaturedNews(articles[0]);
          // 6 artikel berikutnya untuk 'trending'
          setTrendingNews(articles.slice(1, 7));
        }
      } catch (error) {
        toast({
          title: "Gagal memuat berita",
          description: "Tidak dapat terhubung ke server.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [toast]); // Tambahkan toast sebagai dependency jika digunakan di dalam useEffect

  // 5. Tampilkan pesan loading saat data diambil
  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-wrap md:flex-nowrap">
        <Sidebar />
        
        <main className="flex-1 md:ml-6">
          {featuredNews && (
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-4">Berita Terkini</h1>
              {/* 6. Sesuaikan props dengan data dari backend */}
              <FeaturedNews 
                title={featuredNews.title}
                imageUrl={featuredNews.image_url}
                excerpt={featuredNews.content}
                category={featuredNews.category}
                id={featuredNews.slug} // Gunakan slug untuk URL unik
              />
            </div>
          )}
          
          <NewsSection title="Trending Hari Ini">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {trendingNews.map((news) => (
                <div key={news.id}>
                  {/* 6. Sesuaikan props dengan data dari backend */}
                  <NewsCard
                    title={news.title}
                    category={news.category}
                    excerpt={news.content.substring(0, 100) + '...'} // Potong konten untuk excerpt
                    imageUrl={news.image_url}
                    timestamp={new Date(news.publication_date).toLocaleDateString('id-ID')}
                    id={news.slug}
                  />
                </div>
              ))}
            </div>
          </NewsSection>

          {/* Anda bisa menambahkan section lain dengan data yang sama atau endpoint berbeda */}

        </main>
      </div>
      
      {/* ... (Footer tidak berubah) ... */}
    </div>
  );
};

export default Index;