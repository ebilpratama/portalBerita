
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import NewsCard from "@/components/NewsCard";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  timestamp: string;
}

// Sample news data
const allNews: NewsItem[] = [
  { 
    id: "trending-1", 
    title: "Kebijakan Ekonomi Hijau: Indonesia Berkomitmen Kurangi Emisi Karbon 30% pada 2030", 
    category: "Ekonomi",
    excerpt: "Pemerintah mengumumkan serangkaian insentif bagi industri ramah lingkungan dan energi terbarukan untuk mendukung target penurunan emisi karbon.",
    imageUrl: "https://source.unsplash.com/random/600x400?ekonomi&sig=trending-1",
    timestamp: "5 jam yang lalu"
  },
  { 
    id: "trending-2", 
    title: "Tim Garuda Muda Lolos ke Semifinal Piala Asia setelah Mengalahkan Jepang", 
    category: "Olahraga",
    excerpt: "Kemenangan dramatis 2-1 membawa Indonesia ke semifinal untuk pertama kalinya dalam sejarah turnamen.",
    imageUrl: "https://source.unsplash.com/random/600x400?olahraga&sig=trending-2",
    timestamp: "3 jam yang lalu"
  },
  { 
    id: "olahraga-1", 
    title: "Atlet Indonesia Raih 3 Medali Emas di Kejuaraan Dunia Badminton", 
    category: "Olahraga",
    excerpt: "Indonesia mendominasi nomor ganda putra, ganda campuran, dan tunggal putri di kejuaraan dunia tahun ini.",
    imageUrl: "https://source.unsplash.com/random/600x400?badminton&sig=olahraga-1",
    timestamp: "1 hari yang lalu"
  },
  { 
    id: "kesehatan-1", 
    title: "Studi Baru: Konsumsi Tempe Secara Rutin Dapat Menurunkan Risiko Penyakit Jantung", 
    category: "Kesehatan",
    excerpt: "Penelitian terbaru menunjukkan manfaat kesehatan dari tempe yang dikonsumsi minimal tiga kali seminggu.",
    imageUrl: "https://source.unsplash.com/random/600x400?health&sig=kesehatan-1",
    timestamp: "6 jam yang lalu"
  },
  { 
    id: "politik-1", 
    title: "Pemilu 2025: Partai-Partai Mulai Persiapkan Strategi Kampanye Digital", 
    category: "Politik",
    excerpt: "Para elite politik mulai beradaptasi dengan tren kampanye berbasis digital untuk menjangkau pemilih milenial dan Gen Z.",
    imageUrl: "https://source.unsplash.com/random/600x400?politic&sig=politik-1",
    timestamp: "2 hari yang lalu"
  },
  { 
    id: "pendidikan-1", 
    title: "Kurikulum Baru Fokus pada Keterampilan Digital dan Kemampuan Berpikir Kritis", 
    category: "Pendidikan",
    excerpt: "Kementerian Pendidikan mengumumkan perombakan kurikulum yang akan mulai diterapkan tahun ajaran depan.",
    imageUrl: "https://source.unsplash.com/random/600x400?education&sig=pendidikan-1",
    timestamp: "1 hari yang lalu"
  },
  { 
    id: "personal-1", 
    title: "Terobosan Baru dalam Pengobatan Diabetes: Terapi Sel Induk Berhasil dalam Uji Klinis", 
    category: "Kesehatan",
    excerpt: "Para peneliti Indonesia berhasil mengembangkan metode terapi sel induk yang menunjukkan hasil positif dalam mengatasi diabetes tipe 1.",
    imageUrl: "https://source.unsplash.com/random/600x400?medical&sig=personal-1",
    timestamp: "7 jam yang lalu"
  },
  { 
    id: "personal-2", 
    title: "Liga Profesional Indonesia: Persaingan Sengit di Papan Atas Menjelang Akhir Musim", 
    category: "Olahraga",
    excerpt: "Tiga klub masih berpeluang menjadi juara dengan hanya tersisa lima pertandingan lagi di musim ini.",
    imageUrl: "https://source.unsplash.com/random/600x400?soccer&sig=personal-2",
    timestamp: "5 jam yang lalu"
  },
  { 
    id: "lainnya-1", 
    title: "Fenomena Wisata Alam: Destinasi Pegunungan Jadi Tren Liburan Pasca Pandemi", 
    category: "Lainnya",
    excerpt: "Wisata alam pegunungan mengalami peningkatan pengunjung hingga 200% dibanding tahun sebelumnya.",
    imageUrl: "https://source.unsplash.com/random/600x400?mountain&sig=lainnya-1",
    timestamp: "4 hari yang lalu"
  },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let results = [...allNews];
      
      // Filter by category if provided
      if (category) {
        results = results.filter(news => 
          news.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search query if provided
      if (query) {
        results = results.filter(news =>
          news.title.toLowerCase().includes(query.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      setSearchResults(results);
      setIsLoading(false);
      
      // Show toast with search result info
      if (results.length === 0) {
        toast({
          title: "Tidak ada hasil",
          description: "Coba kata kunci atau kategori lain",
          variant: "destructive",
        });
      } else {
        toast({
          title: `${results.length} berita ditemukan`,
          description: category 
            ? `Kategori: ${category}`
            : query 
              ? `Pencarian: "${query}"`
              : "Semua berita terbaru",
        });
      }
    }, 500); // Simulate 500ms delay
    
    return () => clearTimeout(timer);
  }, [query, category, toast]);
  
  // Group results into rows of 3
  const groupedResults: NewsItem[][] = [];
  for (let i = 0; i < searchResults.length; i += 3) {
    groupedResults.push(searchResults.slice(i, i + 3));
  }
  
  const pageTitle = category 
    ? `Berita ${category}` 
    : query 
      ? `Hasil pencarian: "${query}"`
      : "Semua Berita";

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-wrap md:flex-nowrap">
        <div className="flex items-center md:hidden w-full mb-4">
          <MobileNav />
          <div className="ml-4 font-bold">Kategori</div>
        </div>
        
        <Sidebar />
        
        <main className="flex-1 md:ml-6">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold">{pageTitle}</h1>
            <Separator className="my-4" />
            
            {isLoading ? (
              <div className="w-full flex justify-center py-10">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-lg font-medium text-gray-600">Tidak ada hasil yang ditemukan</h2>
                <p className="text-gray-500 mt-2">Silakan coba dengan kata kunci atau kategori lain</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                {groupedResults.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {row.map(news => (
                        <div key={news.id} className="animate-on-scroll">
                          <NewsCard
                            title={news.title}
                            category={news.category}
                            excerpt={news.excerpt}
                            imageUrl={news.imageUrl}
                            timestamp={news.timestamp}
                            id={news.id}
                          />
                        </div>
                      ))}
                    </div>
                    {rowIndex < groupedResults.length - 1 && (
                      <Separator className="my-8" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      
      <footer className="bg-white mt-10 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="border border-gray-800 p-1 w-12 h-12 flex items-center justify-center mb-2">
                <span className="font-bold text-sm">LOGO</span>
              </div>
              <p className="text-sm text-gray-500">© 2025 News Portal. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Search;
