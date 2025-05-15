
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

interface Comment {
  id: string;
  name: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  articleId: string;
}

const commentSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  content: z.string().min(5, {
    message: "Comment must be at least 5 characters.",
  }),
});

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof commentSchema>) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name: values.name,
      content: values.content,
      timestamp: new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComments(prev => [newComment, ...prev]);
    form.reset();
    
    toast({
      title: "Komentar terkirim",
      description: "Terima kasih atas tanggapan Anda!",
    });
  };

  return (
    <div className="mt-10 pt-6 border-t">
      <h3 className="font-bold text-xl mb-6">Komentar ({comments.length})</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama Anda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Komentar</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tuliskan komentar Anda di sini" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="bg-news-primary hover:bg-news-primary/90">
            Kirim Komentar
          </Button>
        </form>
      </Form>

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{comment.name}</h4>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Belum ada komentar. Jadilah yang pertama memberikan komentar!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
