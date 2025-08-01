// file: pages/NewsDetail.tsx

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import CommentSection from "@/components/CommentSection";
import { useToast } from "@/hooks/use-toast";

const NewsDetail = () => {
  const { slug } = useParams(); // Menggunakan 'slug' dari URL
  const { toast } = useToast();
  
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const articleRes = await axios.get(`http://localhost:5000/api/articles/articles/${slug}`);
        setArticle(articleRes.data);

        // Ambil artikel lain untuk fitur "Artikel Terkait"
        const allArticlesRes = await axios.get('http://localhost:5000/api/articles/articles/${slug}');
        const related = allArticlesRes.data.data
          .filter((item: any) => item.category === articleRes.data.category && item.slug !== slug)
          .slice(0, 3);
        setRelatedArticles(related);

      } catch (error) {
        toast({
          title: "Gagal Memuat Artikel",
          description: "Artikel yang Anda cari tidak ditemukan atau terjadi kesalahan server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchArticle();
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="h-72 bg-gray-200 rounded-md mb-6"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="text-center py-20">Artikel tidak ditemukan.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
            <ChevronLeft size={16} />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded mb-3">
            {article.category}
          </span>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <span>Oleh: {article.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(article.publication_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <div 
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${article.image_url})` }}
          ></div>
        </div>
        
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        
        <div className="mt-8 pt-6 border-t">
            <Card className="p-6">
                <h3 className="font-bold mb-2">Bagikan artikel ini</h3>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">Facebook</Button>
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">WhatsApp</Button>
                </div>
            </Card>
        </div>
        
        <CommentSection articleId={article.id} />
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-bold text-xl mb-4">Artikel Terkait</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {relatedArticles.map((news: any) => (
              <div key={news.id}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-40 w-full bg-cover bg-center relative rounded-t-lg" 
                    style={{ backgroundImage: `url(${news.image_url})` }}
                  >
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-serif font-bold line-clamp-2">
                      <Link to={`/article/${news.slug}`}>{news.title}</Link>
                    </h3>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-10 py-6 border-t">{/* ... Footer ... */}</footer>
    </div>
  );
};

export default NewsDetail;