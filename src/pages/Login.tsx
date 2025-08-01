// file: components/Login.jsx atau path file Anda

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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Skema validasi menggunakan username
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username harus memiliki minimal 3 karakter.",
  }),
  password: z.string().min(6, {
    message: "Password harus memiliki minimal 6 karakter.",
  }),
  rememberMe: z.boolean().default(false),
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Mengirim permintaan ke backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: values.username,
        password: values.password,
      });

      // Menyimpan token dan navigasi
      localStorage.setItem('token', response.data.token);
      toast({
        title: "Login Berhasil!",
        description: "Anda akan diarahkan ke halaman utama.",
      });
      navigate('/'); // Arahkan ke halaman utama atau dashboard

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Terjadi kesalahan saat login.";
      toast({
        title: "Login Gagal",
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
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              
              <img 
                src="../logo.png" 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="masukkan username anda" {...field} />
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

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  {/* <Link to="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link> */}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;