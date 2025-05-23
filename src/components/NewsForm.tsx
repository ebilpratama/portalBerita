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
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title must not exceed 100 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters").max(250, "Excerpt must not exceed 250 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  category: z.string().min(1, "Please select a category"),
  imageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  author: z.string().min(3, "Author name must be at least 3 characters"),
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter news title" {...field} />
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
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A brief summary of your news" 
                  {...field} 
                  className="resize-none"
                  rows={2}
                />
              </FormControl>
              <FormDescription>
                This will appear as a preview on the news listings
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your full news article here" 
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
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
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
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
              <FormLabel>Featured Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Add a URL to an image that represents your news article
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit News"}
        </Button>
      </form>
    </Form>
  );
};

export default NewsForm;