import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "The Complete Guide to Omega-3 Fatty Acids",
    excerpt: "Learn everything about omega-3s, their benefits for heart health, brain function, and how to choose the right supplement.",
    category: "Nutrition",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80"
  },
  {
    id: 2,
    title: "Red Light Therapy: Science and Benefits",
    excerpt: "Discover how red light therapy works, its proven benefits for recovery, skin health, and athletic performance.",
    category: "Recovery",
    readTime: "10 min read",
    date: "Dec 12, 2024",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
  },
  {
    id: 3,
    title: "Sleep Optimization for Peak Performance",
    excerpt: "Understanding the role of quality sleep in recovery and how supplements can support your natural sleep cycle.",
    category: "Sleep",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80"
  },
  {
    id: 4,
    title: "Marine Collagen: Your Skin's Best Friend",
    excerpt: "The science behind marine collagen and why it's superior for skin health, joint support, and overall wellness.",
    category: "Beauty",
    readTime: "7 min read",
    date: "Dec 8, 2024",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
  },
  {
    id: 5,
    title: "Cold Therapy: Benefits of Ice Baths",
    excerpt: "Explore the powerful recovery benefits of cold exposure and how to safely incorporate it into your routine.",
    category: "Recovery",
    readTime: "9 min read",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
  },
  {
    id: 6,
    title: "Trace Minerals: The Missing Link",
    excerpt: "Why trace minerals are essential for optimal health and how modern diets often leave us deficient.",
    category: "Nutrition",
    readTime: "5 min read",
    date: "Dec 3, 2024",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80"
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Health & Wellness Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights on nutrition, recovery, and optimizing your health through science-backed information
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </CardContent>

              <CardFooter>
                <Button variant="ghost" className="w-full group/btn">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Looking for more specific information?</p>
          <Link to="/">
            <Button size="lg">
              Explore Our Products
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
