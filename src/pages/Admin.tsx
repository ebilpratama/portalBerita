import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import NewsForm from "@/components/NewsForm";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsSubmission = async (newsData: any) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to store the news
      console.log("Submitting news:", newsData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "News submitted successfully",
        description: "Your news has been added and is pending review.",
      });
    } catch (error) {
      toast({
        title: "Error submitting news",
        description: "There was a problem submitting your news. Please try again.",
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
        <div className="flex items-center md:hidden w-full mb-4">
          <MobileNav />
          <div className="ml-4 font-bold">Kategori</div>
        </div>
        
        <Sidebar />
        
        <main className="flex-1 md:ml-6">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Admin Dashboard</h1>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Submit News</CardTitle>
                <CardDescription>
                  Submit your own news article to be featured on our platform. All submissions will be reviewed by our team.
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