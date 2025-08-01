// file: components/Signup.jsx atau path file Anda

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

// 1. Tambahkan 'username' ke skema validasi
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus memiliki minimal 2 karakter.",
  }),
  username: z.string().min(3, {
    message: "Username harus memiliki minimal 3 karakter.",
  }),
  email: z.string().email({
    message: "Silakan masukkan alamat email yang valid.",
  }),
  password: z.string().min(8, {
    message: "Password harus memiliki minimal 8 karakter.",
  }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean()
    .refine(val => val === true, {
      message: "Anda harus menyetujui syarat dan ketentuan",
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "", // Tambahkan default value untuk username
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // 2. Modifikasi fungsi onSubmit untuk mengirim data ke backend
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Mengirim data pendaftaran ke backend
      await axios.post('http://localhost:5000/api/auth/register', {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      });

      toast({
        title: "Pendaftaran Berhasil!",
        description: "Akun Anda telah dibuat. Silakan login.",
      });
      
      // Arahkan pengguna ke halaman login setelah berhasil
      navigate('/login');

    } catch (error) {
      // Menangani error dari backend (misal: username/email sudah ada)
      const errorMessage = error.response?.data?.error || "Terjadi kesalahan saat pendaftaran.";
      toast({
        title: "Pendaftaran Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">{/* ... Logo dan Judul ... */}</div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* 3. Tambahkan FormField untuk username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="pilih username unik" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="yourname@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Saya setuju dengan{" "}
                          <Link to="#" className="text-blue-600 hover:underline">
                            Syarat Layanan
                          </Link>{" "}
                          dan{" "}
                          <Link to="#" className="text-blue-600 hover:underline">
                            Kebijakan Privasi
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Membuat akun...' : 'Buat akun'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p>
                Sudah punya akun?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;