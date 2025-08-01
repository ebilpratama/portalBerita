import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define categories
const categories = [
  { id: "olahraga", name: "Olahraga" },
  { id: "kesehatan", name: "Kesehatan" },
  { id: "politik", name: "Politik" },
  { id: "pendidikan", name: "Pendidikan" },
  { id: "ekonomi", name: "Ekonomi" },
  { id: "teknologi", name: "Teknologi" },
  { id: "budaya", name: "Budaya" },
  { id: "lainnya", name: "Lainnya" },
];

// Form validation schema
const formSchema = z.object({
  title: z.string().min(10, "Judul harus minimal 10 karakter").max(100, "Judul tidak boleh lebih dari 100 karakter"),
  excerpt: z.string().min(20, "Ringkasan harus minimal 20 karakter").max(250, "Ringkasan tidak boleh lebih dari 250 karakter"),
  content: z.string().min(100, "Konten harus minimal 100 karakter"),
  category: z.string().min(1, "Silakan pilih kategori"),
  imageUrl: z.string().url("Silakan masukkan URL yang valid").optional().or(z.literal("")),
  author: z.string().min(3, "Nama penulis harus minimal 3 karakter"),
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  onSubmit: (data: NewsFormValues) => void;
  isSubmitting: boolean;
}

const NewsForm = ({ onSubmit, isSubmitting }: NewsFormProps) => {
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      imageUrl: "",
      author: "",
    },
  });

  const handleSubmit = (values: NewsFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul berita" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ringkasan</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ringkasan singkat dari berita Anda" 
                  {...field} 
                  className="resize-none"
                  rows={2}
                />
              </FormControl>
              <FormDescription>
                Ini akan muncul sebagai pratinjau di daftar berita
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konten</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tulis artikel berita lengkap Anda di sini"
                  {...field} 
                  className="min-h-[200px] resize-none"
                  rows={8}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Penulis</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Anda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Gambar Utama (Opsional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Tambahkan URL gambar yang mewakili artikel berita Anda
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Kirim Berita"}
        </Button>
      </form>
    </Form>
  );
};

export default NewsForm;