import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import CommentSection from "@/components/CommentSection";

// Mock database of news articles
const newsDatabase = [
  {
    id: "featured-1",
    title: "Pemerintah Luncurkan Program Pendidikan Digital Nasional untuk Tingkatkan Akses Pendidikan",
    content: `
      <p className="mb-4">JAKARTA - Kementerian Pendidikan dan Kebudayaan meluncurkan Program Pendidikan Digital Nasional yang bertujuan untuk meningkatkan akses pendidikan berkualitas di seluruh Indonesia, terutama di daerah terpencil. Program ini akan menyediakan akses internet dan perangkat digital bagi sekolah-sekolah di daerah terpencil, dengan target mencapai 5.000 sekolah dalam tahun pertama.</p>
      
      <p className="mb-4">Menteri Pendidikan dan Kebudayaan, Dr. Anindya Bakrie, mengatakan bahwa program ini merupakan langkah penting untuk mengatasi kesenjangan pendidikan di Indonesia. "Kami berkomitmen untuk memastikan bahwa setiap anak Indonesia memiliki akses terhadap pendidikan berkualitas, terlepas dari lokasi geografis mereka," ujarnya dalam konferensi pers peluncuran program tersebut.</p>
      
      <p className="mb-4">Program ini akan dilaksanakan dalam tiga tahap. Tahap pertama akan fokus pada penyediaan infrastruktur dasar, seperti koneksi internet dan perangkat komputer. Tahap kedua akan melibatkan pelatihan guru dan pengembangan konten digital. Tahap ketiga akan mencakup integrasi teknologi digital dalam kurikulum pendidikan nasional.</p>
      
      <p className="mb-4">Selain itu, pemerintah juga akan bekerja sama dengan perusahaan teknologi untuk mengembangkan platform pembelajaran digital yang dapat diakses oleh siswa dan guru di seluruh Indonesia. Platform ini akan menyediakan materi pembelajaran, tugas, dan evaluasi yang dapat disesuaikan dengan kebutuhan siswa.</p>
      
      <p className="mb-4">Program ini mendapat sambutan positif dari berbagai pihak, termasuk organisasi pendidikan dan aktivis hak anak. Namun, beberapa kritikus mengingatkan bahwa program ini harus disertai dengan pengawasan yang ketat untuk memastikan bahwa dana yang dialokasikan digunakan secara efektif dan tepat sasaran.</p>
      
      <p className="mb-4">Program Pendidikan Digital Nasional diharapkan dapat memberikan kontribusi signifikan terhadap peningkatan kualitas pendidikan di Indonesia dan membantu mempersiapkan generasi muda Indonesia untuk menghadapi tantangan global di era digital.</p>
    `,
    category: "Pendidikan",
    author: "Budi Santoso",
    date: "6 Mei 2025",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
    tags: ["pendidikan", "teknologi", "kebijakan"]
  },
  {
    id: "trending-1",
    title: "Kebijakan Ekonomi Hijau: Indonesia Berkomitmen Kurangi Emisi Karbon 30% pada 2030",
    content: `
      <p className="mb-4">JAKARTA - Pemerintah Indonesia mengumumkan serangkaian insentif bagi industri ramah lingkungan dan energi terbarukan untuk mendukung target penurunan emisi karbon 30% pada tahun 2030. Kebijakan ini merupakan bagian dari komitmen Indonesia dalam Perjanjian Paris tentang perubahan iklim.</p>
      
      <p className="mb-4">Menteri Koordinator Bidang Kemaritiman dan Investasi, Luhut Binsar Pandjaitan, mengatakan bahwa Indonesia akan fokus pada pengembangan energi terbarukan, seperti tenaga surya, angin, dan panas bumi. "Kami akan memberikan insentif fiskal dan non-fiskal bagi perusahaan yang berinvestasi dalam energi terbarukan dan teknologi ramah lingkungan," ujarnya dalam konferensi pers di Jakarta.</p>
      
      <p className="mb-4">Beberapa insentif yang akan diberikan termasuk pengurangan pajak, kemudahan perizinan, dan dukungan pendanaan bagi proyek-proyek ramah lingkungan. Pemerintah juga akan menerapkan pajak karbon bagi industri dengan emisi tinggi untuk mendorong mereka beralih ke teknologi yang lebih bersih.</p>
      
      <p className="mb-4">Selain itu, pemerintah juga akan berinvestasi dalam infrastruktur pendukung, seperti jaringan listrik yang dapat mengakomodasi energi terbarukan dan stasiun pengisian kendaraan listrik di kota-kota besar.</p>
      
      <p className="mb-4">Kebijakan ini disambut positif oleh aktivis lingkungan dan investor asing. Namun, beberapa pelaku industri mengingatkan bahwa transisi ke ekonomi hijau harus dilakukan secara bertahap untuk menghindari dampak negatif terhadap pertumbuhan ekonomi dan lapangan kerja.</p>
      
      <p className="mb-4">Indonesia, sebagai salah satu negara dengan emisi karbon tertinggi di dunia, memiliki peran penting dalam upaya global untuk mengatasi perubahan iklim. Dengan kebijakan ekonomi hijau ini, Indonesia diharapkan dapat memberikan kontribusi signifikan terhadap pencapaian tujuan Perjanjian Paris.</p>
    `,
    category: "Ekonomi",
    author: "Siti Rahayu",
    date: "5 Mei 2025",
    imageUrl: "https://source.unsplash.com/random/600x400?economy&sig=1",
    tags: ["ekonomi", "lingkungan", "kebijakan"]
  },
  {
    id: "trending-2",
    title: "Tim Garuda Muda Lolos ke Semifinal Piala Asia setelah Mengalahkan Jepang",
    content: `
      <p className="mb-4">DOHA - Tim nasional sepak bola Indonesia U-23, Garuda Muda, berhasil melaju ke semifinal Piala Asia U-23 setelah mengalahkan Jepang dengan skor 2-1 dalam pertandingan perempat final yang berlangsung di Stadion Jassim Bin Hamad, Doha, Qatar.</p>
      
      <p className="mb-4">Gol kemenangan Indonesia dicetak oleh Witan Sulaeman pada menit ke-67 dan Egy Maulana Vikri pada menit ke-89. Sementara itu, gol Jepang dicetak oleh Keito Nakamura pada menit ke-75.</p>
      
      <p className="mb-4">Pelatih Tim Garuda Muda, Shin Tae-yong, memuji semangat juang para pemainnya. "Mereka bermain dengan penuh semangat dan disiplin. Ini adalah hasil dari kerja keras dan persiapan yang matang," ujarnya dalam konferensi pers pasca-pertandingan.</p>
      
      <p className="mb-4">Kemenangan ini menandai pencapaian bersejarah bagi sepak bola Indonesia, yang untuk pertama kalinya berhasil melaju ke semifinal Piala Asia U-23. Di semifinal, Indonesia akan menghadapi Korea Selatan yang sebelumnya mengalahkan Australia dengan skor 3-0.</p>
      
      <p className="mb-4">Presiden Republik Indonesia, Prabowo Subianto, melalui akun Twitter resminya, mengucapkan selamat kepada Tim Garuda Muda atas prestasi mereka. "Selamat untuk Tim Garuda Muda! Kalian telah membuktikan bahwa dengan kerja keras dan dedikasi, tidak ada yang tidak mungkin. Seluruh bangsa Indonesia bangga dengan prestasi kalian," tulisnya.</p>
      
      <p className="mb-4">Pertandingan semifinal antara Indonesia dan Korea Selatan akan berlangsung pada hari Rabu, 8 Mei 2025, di Stadio Lusail, Doha, Qatar. Pertandingan ini diprediksi akan menjadi sorotan utama di kalangan pencinta sepak bola di Indonesia.</p>
    `,
    category: "Olahraga",
    author: "Agus Permana",
    date: "4 Mei 2025",
    imageUrl: "https://source.unsplash.com/random/600x400?soccer&sig=2",
    tags: ["olahraga", "sepak bola", "piala asia"]
  },
  {
    id: "trending-3",
    title: "Startup Lokal Kembangkan AI Penerjemah Bahasa Daerah untuk Lestarikan Budaya",
    content: `
      <p className="mb-4">BANDUNG - Sebuah startup teknologi asal Bandung, LingTech Indonesia, berhasil mengembangkan aplikasi kecerdasan buatan (AI) yang mampu menerjemahkan lebih dari 50 bahasa daerah di Indonesia. Aplikasi bernama "Lingua Nusantara" ini bertujuan untuk melestarikan bahasa daerah yang terancam punah.</p>
      
      <p className="mb-4">CEO LingTech Indonesia, Reza Pratama, menjelaskan bahwa aplikasi ini menggunakan teknologi machine learning dan natural language processing untuk menerjemahkan teks dan ucapan dari bahasa Indonesia ke berbagai bahasa daerah, dan sebaliknya. "Kami ingin memastikan bahwa bahasa daerah di Indonesia tetap hidup dan digunakan oleh generasi muda," ujarnya.</p>
      
      <p className="mb-4">Aplikasi Lingua Nusantara telah diunduh lebih dari 100.000 kali sejak diluncurkan tiga bulan lalu. Aplikasi ini mendapat respons positif dari penggunanya, terutama dari kalangan pelajar, peneliti, dan pelaku pariwisata.</p>
      
      <p className="mb-4">Kementerian Pendidikan dan Kebudayaan menyambut baik inovasi ini. Menteri Pendidikan dan Kebudayaan, Dr. Anindya Bakrie, mengatakan bahwa aplikasi seperti Lingua Nusantara dapat menjadi alat yang efektif untuk melestarikan kekayaan bahasa dan budaya Indonesia.</p>
      
      <p className="mb-4">Selain fitur penerjemahan, Lingua Nusantara juga menyediakan konten edukatif tentang budaya dan sejarah terkait dengan bahasa-bahasa daerah tersebut. Pengguna juga dapat berkontribusi dengan menambahkan kosakata dan frasa baru ke dalam database aplikasi.</p>
      
      <p className="mb-4">LingTech Indonesia berencana untuk terus mengembangkan aplikasi ini dengan menambahkan lebih banyak bahasa daerah dan fitur baru. Perusahaan ini juga sedang mencari pendanaan untuk memperluas jangkauan mereka ke seluruh Indonesia.</p>
    `,
    category: "Teknologi",
    author: "Diana Putri",
    date: "3 Mei 2025",
    imageUrl: "https://source.unsplash.com/random/600x400?technology&sig=3",
    tags: ["teknologi", "budaya", "bahasa", "startup"]
  },
];

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    setLoading(true);
    setTimeout(() => {
      const foundArticle = newsDatabase.find(news => news.id === id) || newsDatabase[0];
      setArticle(foundArticle);
      setLoading(false);
      
      // Scroll to top when article loads
      window.scrollTo(0, 0);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="h-72 bg-gray-200 rounded-md mb-6"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-news-primary hover:underline flex items-center gap-1 mb-4">
            <ChevronLeft size={16} />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <span className="inline-block bg-news-primary text-white text-xs px-3 py-1 rounded mb-3">
            {article.category}
          </span>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <div 
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
          ></div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags && article.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          
          <Card className="p-6">
            <h3 className="font-bold mb-2">Bagikan artikel ini</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">Facebook</Button>
              <Button variant="outline" size="sm">Twitter</Button>
              <Button variant="outline" size="sm">WhatsApp</Button>
            </div>
          </Card>
        </div>
        
        {/* Add the Comment Section */}
        <CommentSection articleId={id || ''} />
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-bold text-xl mb-4">Artikel Terkait</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {newsDatabase
              .filter(news => news.id !== id && news.category === article.category)
              .slice(0, 3)
              .map(news => (
                <div key={news.id} className="animate-on-scroll">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <div 
                      className="h-40 w-full bg-cover bg-center relative rounded-t-lg" 
                      style={{ backgroundImage: `url(${news.imageUrl})` }}
                    >
                      <span className="absolute top-2 left-2 bg-news-primary text-white text-xs px-2 py-1 rounded">
                        {news.category}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-serif font-bold line-clamp-2">
                        <Link to={`/article/${news.id}`}>{news.title}</Link>
                      </h3>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </main>
      
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

export default NewsDetail;
