import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LearningPaths } from "@/components/LearningPaths";
import { LiveChat } from "@/components/LiveChat";
import { ResourceFinder } from "@/components/ResourceFinder";
import { MultiFormatHub } from "@/components/MultiFormatHub";

const featuredArticle = {
  id: 0,
  title: "The Ultimate Guide to Biohacking Your Health in 2026",
  excerpt: "Discover the latest science-backed strategies for optimising your health, performance, and longevity through nutrition, recovery techniques, and cutting-edge wellness technology.",
  category: "Featured",
  readTime: "15 min read",
  date: "Jan 15, 2026",
  image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80"
  },
  {
    id: 2,
    title: "Red Light Therapy: Science and Benefits",
    excerpt: "Discover how red light therapy works, its proven benefits for recovery, skin health, and athletic performance.",
    category: "Recovery",
    readTime: "10 min read",
    date: "Jan 8, 2026",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
  },
  {
    id: 3,
    title: "Sleep Optimisation for Peak Performance",
    excerpt: "Understanding the role of quality sleep in recovery and how supplements can support your natural sleep cycle.",
    category: "Sleep",
    readTime: "6 min read",
    date: "Jan 5, 2026",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: 4,
    title: "Marine Collagen: Your Skin's Best Friend",
    excerpt: "The science behind marine collagen and why it's superior for skin health, joint support, and overall wellness.",
    category: "Beauty",
    readTime: "7 min read",
    date: "Jan 3, 2026",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    id: 5,
    title: "Cold Therapy: Benefits of Ice Baths",
    excerpt: "Explore the powerful recovery benefits of cold exposure and how to safely incorporate it into your routine.",
    category: "Recovery",
    readTime: "9 min read",
    date: "Dec 30, 2025",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
  },
  {
    id: 6,
    title: "Trace Minerals: The Missing Link",
    excerpt: "Why trace minerals are essential for optimum health and how modern diets often leave us deficient.",
    category: "Nutrition",
    readTime: "5 min read",
    date: "Dec 28, 2025",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80"
  },
  {
    id: 7,
    title: "PEMF Therapy: Electromagnetic Healing",
    excerpt: "Understanding pulsed electromagnetic field therapy and its applications for pain relief and cellular health.",
    category: "Recovery",
    readTime: "8 min read",
    date: "Dec 25, 2025",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80"
  },
  {
    id: 8,
    title: "Adaptogens for Stress Management",
    excerpt: "Natural compounds that help your body adapt to stress and maintain hormonal balance.",
    category: "Wellness",
    readTime: "6 min read",
    date: "Dec 22, 2025",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
  },
  {
    id: 9,
    title: "Cognitive Enhancement: Science of Nootropics",
    excerpt: "Evidence-based guide to supplements that support memory, focus, and mental clarity.",
    category: "Brain Health",
    readTime: "10 min read",
    date: "Dec 20, 2025",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80"
  }
];

const categories = ["All", "Nutrition", "Recovery", "Sleep", "Beauty", "Wellness", "Brain Health"];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10 blur-3xl" />
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 to-accent/15 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/20 shadow-sm">
            <BookOpen className="h-4 w-4" />
            <span>Science-Backed Resources</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent leading-tight">
            Master Your Health Journey
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover personalised resources, expert courses, and science-backed content to help you optimise your performance and wellbeing
          </p>
        </div>

        {/* Interactive Resource Finder - Top Priority */}
        <ResourceFinder />

        {/* Featured Article */}
        <Card className="mb-20 overflow-hidden hover:shadow-2xl transition-all duration-500 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 group">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/50 z-10" />
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md">
                  <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                  Featured
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground gap-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight group-hover:text-primary transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <Button size="lg" className="w-fit group/btn shadow-lg hover:shadow-xl transition-shadow">
                Read Full Article
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Multi-Format Content Hub */}
        <MultiFormatHub />

        {/* Learning Paths */}
        <div className="my-20">
          <LearningPaths />
        </div>

        {/* Newsletter Section */}
        <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-primary/30 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary),0.1),transparent)]" />
          <CardContent className="p-10 md:p-16 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 mb-6 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Get the latest health insights, exclusive offers, and expert tips straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-12 bg-background/50 backdrop-blur-sm border-border/50"
              />
              <Button size="lg" className="h-12 px-8 shadow-lg hover:shadow-xl transition-shadow">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 text-lg">Ready to optimise your health?</p>
          <Link to="/">
            <Button size="lg" className="text-lg px-8">
              Explore Our Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Resources;
