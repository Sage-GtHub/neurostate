import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const featuredArticle = {
  id: 0,
  title: "The Ultimate Guide to Biohacking Your Health in 2026",
  excerpt: "Discover the latest science-backed strategies for optimizing your health, performance, and longevity through nutrition, recovery techniques, and cutting-edge wellness technology.",
  category: "Featured",
  readTime: "15 min read",
  date: "Jan 15, 2026",
  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
  featured: true
};

const articles = [
  {
    id: 1,
    title: "The Complete Guide to Omega-3 Fatty Acids",
    excerpt: "Learn everything about omega-3s, their benefits for heart health, brain function, and how to choose the right supplement.",
    category: "Nutrition",
    readTime: "8 min read",
    date: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80"
  },
  {
    id: 2,
    title: "Red Light Therapy: Science and Benefits",
    excerpt: "Discover how red light therapy works, its proven benefits for recovery, skin health, and athletic performance.",
    category: "Recovery",
    readTime: "10 min read",
    date: "Jan 8, 2026",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
  },
  {
    id: 3,
    title: "Sleep Optimisation for Peak Performance",
    excerpt: "Understanding the role of quality sleep in recovery and how supplements can support your natural sleep cycle.",
    category: "Sleep",
    readTime: "6 min read",
    date: "Jan 5, 2026",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80"
  },
  {
    id: 4,
    title: "Marine Collagen: Your Skin's Best Friend",
    excerpt: "The science behind marine collagen and why it's superior for skin health, joint support, and overall wellness.",
    category: "Beauty",
    readTime: "7 min read",
    date: "Jan 3, 2026",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
  },
  {
    id: 5,
    title: "Cold Therapy: Benefits of Ice Baths",
    excerpt: "Explore the powerful recovery benefits of cold exposure and how to safely incorporate it into your routine.",
    category: "Recovery",
    readTime: "9 min read",
    date: "Dec 30, 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
  },
  {
    id: 6,
    title: "Trace Minerals: The Missing Link",
    excerpt: "Why trace minerals are essential for optimum health and how modern diets often leave us deficient.",
    category: "Nutrition",
    readTime: "5 min read",
    date: "Dec 28, 2025",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80"
  },
  {
    id: 7,
    title: "PEMF Therapy: Electromagnetic Healing",
    excerpt: "Understanding pulsed electromagnetic field therapy and its applications for pain relief and cellular health.",
    category: "Recovery",
    readTime: "8 min read",
    date: "Dec 25, 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
  },
  {
    id: 8,
    title: "Adaptogens for Stress Management",
    excerpt: "Natural compounds that help your body adapt to stress and maintain hormonal balance.",
    category: "Wellness",
    readTime: "6 min read",
    date: "Dec 22, 2025",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80"
  },
  {
    id: 9,
    title: "Cognitive Enhancement: Science of Nootropics",
    excerpt: "Evidence-based guide to supplements that support memory, focus, and mental clarity.",
    category: "Brain Health",
    readTime: "10 min read",
    date: "Dec 20, 2025",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
  }
];

const categories = ["All", "Nutrition", "Recovery", "Sleep", "Beauty", "Wellness", "Brain Health"];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Science-Backed Resources</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Health & Wellness Hub
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights on nutrition, recovery, and optimising your health through evidence-based information
          </p>
        </div>

        {/* Featured Article */}
        <Card className="mb-16 overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-primary text-primary-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                {featuredArticle.excerpt}
              </p>
              <Button size="lg" className="w-fit">
                Read Full Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-border/50 hover:border-primary/30">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground gap-3">
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
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </CardContent>

              <CardFooter>
                <Button variant="ghost" className="w-full group/btn">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
          </div>
        )}

        {/* Newsletter Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
              Get the latest health insights, exclusive offers, and expert tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button size="lg">Subscribe</Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 text-lg">Ready to optimize your health?</p>
          <Link to="/">
            <Button size="lg" className="text-lg px-8">
              Explore Our Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
