// file: pages/Admin.tsx

import { useState } from "react";
import axios from "axios"; // <-- 1. Import axios
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import NewsForm from "@/components/NewsForm";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Modifikasi fungsi ini untuk mengirim data ke backend
  const handleNewsSubmission = async (newsData: any) => {
    setIsSubmitting(true);
    
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Otentikasi Gagal",
        description: "Anda harus login untuk mengirim berita.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Ganti simulasi dengan panggilan API menggunakan axios
      await axios.post(
        'http://localhost:5000/api/articles', // Pastikan URL ini sesuai dengan route backend Anda
        newsData,
        {
          headers: {
            'Authorization': `Bearer ${token}` // Sertakan token untuk otentikasi
          }
        }
      );
      
      toast({
        title: "Berita berhasil dikirim",
        description: "Berita Anda telah ditambahkan.",
      });

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Terjadi masalah saat mengirim berita.";
      toast({
        title: "Gagal mengirim berita",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-wrap md:flex-nowrap">
        {/* ... sisa kode JSX tidak berubah ... */}
        
        <main className="flex-1 md:ml-6">
          <div className="mb-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Kirim Berita</CardTitle>
                <CardDescription>
                  Kirimkan artikel berita Anda untuk ditampilkan di platform kami. Semua kiriman akan ditinjau oleh tim kami.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsForm onSubmit={handleNewsSubmission} isSubmitting={isSubmitting} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;