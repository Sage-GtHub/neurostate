import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LearningPaths } from "@/components/LearningPaths";

import { ResourceFinder } from "@/components/ResourceFinder";
import { MultiFormatHub } from "@/components/MultiFormatHub";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SEO } from "@/components/SEO";

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
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Resources – Guides, Courses & Research | NeuroState"
        description="Learn how to optimise recovery and performance with science-backed guides, learning paths, and research on red light therapy, adaptogens, and cognitive health."
      />
      <div className="min-h-screen bg-white">
        <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div ref={heroRef} className={`text-center mb-20 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 border-b border-mist transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-[2.25rem] md:text-[3rem] font-light text-carbon mb-6" style={{ lineHeight: '1.2' }}>
            Learn how to perform better
          </h1>
          <p className="text-[0.9375rem] text-ash font-light max-w-3xl mx-auto">
            Guides, courses, and research to help you optimise recovery and performance
          </p>
        </div>

        {/* Interactive Resource Finder - Top Priority */}
        <ResourceFinder />

        <div ref={featuredRef} className={`mb-20 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-16 border-b border-mist transition-all duration-1000 ${featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative overflow-hidden bg-pearl">
                <img
                  src={featuredArticle.image}
                  alt="Person using biohacking tools for health optimisation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[0.6875rem] uppercase tracking-[0.05em] text-stone mb-4 font-light">Featured</p>
                <h2 className="text-[1.5rem] font-light text-carbon mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-[0.9375rem] text-ash font-light mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <Button variant="ghost" className="w-fit hover:bg-transparent hover:opacity-60">
                  Read article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Format Content Hub */}
        <MultiFormatHub />

        {/* Learning Paths */}
        <div className="my-20">
          <LearningPaths />
        </div>

        {/* Newsletter Section */}
        <div className="p-10 md:p-12 text-center border-b pb-12 bg-pearl">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-carbon">
            Stay in the loop
          </h2>
          <p className="text-ash font-light mb-6 max-w-xl mx-auto">
            Latest insights, offers, and tips sent straight to you
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-11"
            />
            <Button size="lg" className="h-11 px-6">
              Subscribe
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white">
          <p className="text-ash font-light mb-6 text-lg">Ready to level up?</p>
          <Link to="/">
            <Button size="lg" className="text-lg px-8">
              See Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </>
  );
};

export default Resources;
