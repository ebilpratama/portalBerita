
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import FeaturedNews from "@/components/FeaturedNews";
import NewsSection from "@/components/NewsSection";
import NewsCard from "@/components/NewsCard";

const Index = () => {
  // Better news data with excerpts
  const featuredNews = {
    id: "featured-1",
    title: "Pemerintah Luncurkan Program Pendidikan Digital Nasional untuk Tingkatkan Akses Pendidikan",
    excerpt: "Program ini akan menyediakan akses internet dan perangkat digital bagi sekolah-sekolah di daerah terpencil, dengan target mencapai 5.000 sekolah dalam tahun pertama.",
    category: "Pendidikan",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
  };

  const trendingNews = [
    { 
      id: "trending-1", 
      title: "Kebijakan Ekonomi Hijau: Indonesia Berkomitmen Kurangi Emisi Karbon 30% pada 2030", 
      category: "Ekonomi",
      excerpt: "Pemerintah mengumumkan serangkaian insentif bagi industri ramah lingkungan dan energi terbarukan untuk mendukung target penurunan emisi karbon."
    },
    { 
      id: "trending-2", 
      title: "Tim Garuda Muda Lolos ke Semifinal Piala Asia setelah Mengalahkan Jepang", 
      category: "Olahraga",
      excerpt: "Kemenangan dramatis 2-1 membawa Indonesia ke semifinal untuk pertama kalinya dalam sejarah turnamen."
    },
    { 
      id: "trending-3", 
      title: "Startup Lokal Kembangkan AI Penerjemah Bahasa Daerah untuk Lestarikan Budaya", 
      category: "Teknologi",
      excerpt: "Aplikasi ini mampu menerjemahkan lebih dari 50 bahasa daerah Indonesia dan telah diunduh lebih dari 100.000 kali."
    },
    { 
      id: "trending-4", 
      title: "Perubahan Iklim Picu Cuaca Ekstrem: Para Ahli Peringatkan Peningkatan Bencana", 
      category: "Lingkungan",
      excerpt: "Laporan terbaru menunjukkan hubungan langsung antara pemanasan global dengan meningkatnya frekuensi dan intensitas bencana alam di Indonesia."
    },
    { 
      id: "trending-5", 
      title: "Kurikulum Baru Fokus pada Keterampilan Digital dan Kemampuan Berpikir Kritis", 
      category: "Pendidikan",
      excerpt: "Menteri Pendidikan mengumumkan perubahan kurikulum nasional yang akan diterapkan mulai tahun ajaran 2026."
    },
    { 
      id: "trending-6", 
      title: "Festival Budaya Nusantara 2025 Akan Digelar di Lima Kota Besar", 
      category: "Budaya",
      excerpt: "Event tahunan ini akan menampilkan lebih dari 300 pertunjukan seni tradisional dan modern dari seluruh Indonesia."
    },
  ];

  const personalNews = [
    { 
      id: "personal-1", 
      title: "Terobosan Baru dalam Pengobatan Diabetes: Terapi Sel Induk Berhasil dalam Uji Klinis", 
      category: "Kesehatan",
      excerpt: "Para peneliti Indonesia berhasil mengembangkan metode terapi sel induk yang menunjukkan hasil positif dalam mengatasi diabetes tipe 1."
    },
    { 
      id: "personal-2", 
      title: "Liga Profesional Indonesia: Persaingan Sengit di Papan Atas Menjelang Akhir Musim", 
      category: "Olahraga",
      excerpt: "Tiga klub masih berpeluang menjadi juara dengan hanya tersisa lima pertandingan lagi di musim ini."
    },
    { 
      id: "personal-3", 
      title: "Mengelola Kesehatan Mental di Era Digital: Strategi dan Praktik Terbaik", 
      category: "Gaya Hidup",
      excerpt: "Para ahli kesehatan mental berbagi tips efektif untuk menjaga keseimbangan hidup di tengah paparan teknologi yang intens."
    },
    { 
      id: "personal-4", 
      title: "Kebijakan Ekonomi Mikro Baru Dorong Pertumbuhan UMKM di Daerah", 
      category: "Ekonomi",
      excerpt: "Paket kebijakan baru mencakup kemudahan akses modal dan insentif pajak untuk usaha kecil dan menengah di luar Pulau Jawa."
    },
    { 
      id: "personal-5", 
      title: "Tren Fashion Berkelanjutan: Desainer Lokal Manfaatkan Bahan Daur Ulang", 
      category: "Fashion",
      excerpt: "Gelombang inovasi fashion ramah lingkungan semakin populer dengan memanfaatkan bahan-bahan organik dan daur ulang."
    },
    { 
      id: "personal-6", 
      title: "Destinasi Wisata Tersembunyi di Indonesia Timur yang Wajib Dikunjungi", 
      category: "Travel",
      excerpt: "Lima tempat wisata yang masih jarang terjamah namun menawarkan pengalaman dan pemandangan menakjubkan."
    },
  ];

  // Add animation effect when page loads
  useEffect(() => {
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('animate-fade-in');
    });
  }, []);

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
          <div className="animate-on-scroll">
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold mb-4">Berita Terkini</h1>
              <FeaturedNews 
                title={featuredNews.title}
                imageUrl={featuredNews.imageUrl}
                excerpt={featuredNews.excerpt}
                category={featuredNews.category}
                id={featuredNews.id}
              />
            </div>
            
            <NewsSection title="Trending Hari Ini" viewMore={true}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {trendingNews.map((news) => (
                  <div key={news.id} className="animate-on-scroll">
                    <NewsCard
                      title={news.title}
                      category={news.category}
                      excerpt={news.excerpt}
                      imageUrl={`https://source.unsplash.com/random/600x400?${news.category.toLowerCase()}&sig=${news.id}`}
                      timestamp={`${Math.floor(Math.random() * 12) + 1} jam yang lalu`}
                      id={news.id}
                    />
                  </div>
                ))}
              </div>
            </NewsSection>
            
            <NewsSection title="Rekomendasi Untuk Anda" viewMore={true}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {personalNews.map((news) => (
                  <div key={news.id} className="animate-on-scroll">
                    <NewsCard
                      title={news.title}
                      category={news.category}
                      excerpt={news.excerpt}
                      imageUrl={`https://source.unsplash.com/random/600x400?${news.category.toLowerCase()}&sig=${news.id}`}
                      timestamp={`${Math.floor(Math.random() * 3) + 1} hari yang lalu`}
                      id={news.id}
                    />
                  </div>
                ))}
              </div>
            </NewsSection>
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

export default Index;
