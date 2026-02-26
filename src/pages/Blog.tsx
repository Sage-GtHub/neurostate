import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: "what-is-a-cognitive-performance-system",
    title: "What Is a Cognitive Performance System?",
    excerpt: "The cognitive performance system represents a new category in workforce intelligence. Unlike traditional wellness programmes that focus on perks, a cognitive performance system integrates wearable data, AI, and predictive analytics to measurably improve how teams think, focus, and recover.",
    category: "Cognitive Performance",
    readTime: "5 min",
    date: "2025-01-15",
    featured: true
  },
  {
    slug: "why-traditional-corporate-wellness-fails",
    title: "Why Traditional Corporate Wellness Fails",
    excerpt: "Corporate wellness programmes have become a £50 billion industry, yet employee burnout continues to rise. The fundamental problem is that traditional approaches focus on reactive perks rather than predictive, data-driven performance infrastructure.",
    category: "Workforce Intelligence",
    readTime: "6 min",
    date: "2025-01-12"
  },
  {
    slug: "burnout-prediction-wearable-data",
    title: "How Wearable Data Predicts Burnout 72 Hours Early",
    excerpt: "Heart rate variability, sleep architecture, and recovery metrics from wearables like Oura and Whoop can surface burnout risk days before it impacts performance. Here's what the research shows.",
    category: "Predictive Analytics",
    readTime: "7 min",
    date: "2025-01-10"
  },
  {
    slug: "ai-personalisation-future-of-work",
    title: "How AI Personalisation Will Shape the Future of Work",
    excerpt: "AI-driven workforce intelligence is transforming how organisations approach team performance. Predictive systems can now anticipate capacity drops, optimise workloads, and deliver personalised interventions at scale.",
    category: "AI Performance",
    readTime: "5 min",
    date: "2025-01-08"
  },
  {
    slug: "measuring-roi-workforce-health",
    title: "Measuring the ROI of Workforce Health Intelligence",
    excerpt: "The biggest challenge in workforce health isn't adoption — it's attribution. How do you tie health data to business outcomes? Here's the framework enterprise teams are using.",
    category: "Business Impact",
    readTime: "8 min",
    date: "2025-01-05"
  }
];

export default function Blog() {
  const hero = useScrollAnimation();
  const posts = useScrollAnimation();

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <>
      <SEO 
        title="Cognitive Performance Blog | Insights & Research | NeuroState"
        description="Expert insights on cognitive performance, AI-driven personalisation, burnout prevention, and workplace performance optimisation. Evidence-based content from NeuroState."
        keywords="cognitive performance blog, burnout prevention insights, AI wellness research, workplace productivity articles, cognitive health content, enterprise wellness insights"
      />
      <Header />
      
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Organic background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        {/* Hero */}
        <section 
          ref={hero.ref} 
          className={`relative pt-32 sm:pt-44 pb-16 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Insights</p>
            <h1 className="text-4xl sm:text-5xl font-light text-foreground">
              Cognitive Performance Blog
            </h1>
            <p className="text-sm text-foreground/50 max-w-lg mx-auto">
              Evidence-based insights on AI-driven cognitive performance and mental optimisation.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="px-6 md:px-12 lg:px-20 xl:px-32 pb-16">
            <div className="max-w-5xl mx-auto">
              <Link to={`/blog/${featuredPost.slug}`} className="group block">
                <div className="rounded-3xl bg-foreground p-8 sm:p-12 transition-all duration-500 hover:scale-[1.01]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 mb-4">Featured</p>
                  <h2 className="text-2xl sm:text-3xl font-light text-background leading-tight mb-4 group-hover:text-background/80 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-background/60 text-sm leading-relaxed mb-6 max-w-2xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-background/40 text-xs">
                    <span className="text-accent">{featuredPost.category}</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(featuredPost.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section 
          ref={posts.ref} 
          className={`px-6 md:px-12 lg:px-20 xl:px-32 pb-24 transition-all duration-1000 ${posts.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-6">Latest</p>
            <div className="grid md:grid-cols-2 gap-4">
              {regularPosts.map((post, i) => (
                <Link 
                  key={i} 
                  to={`/blog/${post.slug}`} 
                  className="group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <article className="p-6 sm:p-8 rounded-3xl bg-foreground/[0.02] hover:bg-foreground transition-all duration-500 h-full flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-accent mb-3">
                      {post.category}
                    </p>
                    <h4 className="text-base font-medium text-foreground group-hover:text-background mb-3 transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-foreground/50 group-hover:text-background/60 leading-relaxed mb-6 transition-colors flex-1">
                      {post.excerpt.slice(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-foreground/40 group-hover:text-background/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span>{post.readTime}</span>
                        <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-background/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="glass-subtle rounded-3xl p-10 space-y-6">
              <h3 className="text-xl font-light text-foreground">
                Experience the cognitive performance system
              </h3>
              <p className="text-xs text-foreground/50">
                Move beyond reading about performance. Start optimising it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link to="/contact">
                  <Button size="sm" className="rounded-full h-10 px-6 text-xs bg-foreground text-background hover:bg-foreground/90">
                    Get in touch
                  </Button>
                </Link>
                <Link to="/nova/overview">
                  <Button variant="outline" size="sm" className="rounded-full h-10 px-6 text-xs border-foreground/20 text-foreground/70 hover:bg-foreground/5">
                    Explore Nova AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
