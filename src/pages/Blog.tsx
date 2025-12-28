import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    excerpt: "The cognitive performance system represents a new category in human optimisation. Unlike traditional wellness approaches that focus on relaxation, a cognitive performance system integrates AI, supplements, and technology to measurably improve how you think, focus, and recover.",
    category: "Cognitive Performance",
    readTime: "5 min read",
    date: "2025-01-15",
    featured: true
  },
  {
    slug: "why-traditional-corporate-wellness-fails",
    title: "Why Traditional Corporate Wellness Fails",
    excerpt: "Corporate wellness programmes have become a £50 billion industry, yet employee burnout continues to rise. The fundamental problem is that traditional approaches focus on stress management rather than cognitive optimisation. Here is why they fail and what works instead.",
    category: "Corporate Wellbeing",
    readTime: "6 min read",
    date: "2025-01-12"
  },
  {
    slug: "science-behind-red-light-therapy-mental-performance",
    title: "The Science Behind Red Light Therapy for Mental Performance",
    excerpt: "Red light therapy cognitive benefits are supported by over 5,000 peer-reviewed studies. Photobiomodulation at 660nm and 850nm wavelengths enhances mitochondrial function in brain cells, improving focus, memory, and cognitive clarity. Here is what the research shows.",
    category: "Neuromodulation",
    readTime: "7 min read",
    date: "2025-01-10"
  },
  {
    slug: "ai-personalisation-future-of-work",
    title: "How AI Personalisation Will Shape the Future of Work",
    excerpt: "AI-driven cognitive performance is transforming how we approach workplace productivity. Predictive wellness AI can now anticipate burnout, optimise work schedules, and provide personalised interventions. This is not science fiction. It is happening now.",
    category: "AI Performance",
    readTime: "5 min read",
    date: "2025-01-08"
  },
  {
    slug: "supplements-that-improve-focus-what-actually-works",
    title: "Supplements That Improve Focus: What Actually Works?",
    excerpt: "The supplement industry is flooded with focus claims. Most are marketing noise. Here we examine the evidence for adaptogens like Ashwagandha, Lion's Mane, and Rhodiola, plus essential minerals like magnesium glycinate. What does the research actually support?",
    category: "Performance Supplements",
    readTime: "8 min read",
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
        title="Blog – Cognitive Performance Insights | NeuroState"
        description="Expert insights on cognitive performance, AI-driven personalisation, red light therapy, adaptogen supplements, and workplace performance."
      />
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section ref={hero.ref} className={`pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">Insights</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground leading-[1.02]">
              Cognitive Performance Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Evidence-based insights on AI-driven cognitive performance, neuromodulation, and the future of mental optimisation.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pb-16 sm:pb-20">
            <div className="max-w-6xl mx-auto">
              <Link to={`/blog/${featuredPost.slug}`} className="group block">
                <div className="bg-foreground p-8 sm:p-12 lg:p-16 transition-all duration-300 hover:bg-foreground/90">
                  <p className="text-background/60 text-xs tracking-[0.3em] uppercase font-medium mb-4">Featured</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-background leading-tight mb-4 group-hover:text-muted transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-background/70 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-background/60 text-sm">
                    <span className="text-background/80">{featuredPost.category}</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section ref={posts.ref} className={`px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pb-24 sm:pb-32 transition-all duration-1000 ${posts.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-8">Latest Articles</h3>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {regularPosts.map((post, i) => (
                <Link key={i} to={`/blog/${post.slug}`} className="group">
                  <article className="bg-background p-8 sm:p-10 h-full transition-all duration-300 hover:bg-foreground">
                    <p className="text-muted-foreground group-hover:text-background/60 text-xs tracking-[0.2em] uppercase font-medium mb-3 transition-colors">
                      {post.category}
                    </p>
                    <h4 className="text-xl font-medium text-foreground group-hover:text-background mb-3 transition-colors leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground group-hover:text-background/70 text-sm leading-relaxed mb-6 transition-colors">
                      {post.excerpt.slice(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground group-hover:text-background/60 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-foreground group-hover:text-background transition-colors">
                        Read more
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-muted border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Experience the cognitive performance system
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Move beyond reading about performance. Start optimising it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/shop">
                <button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-sm font-medium transition-all duration-300">
                  Shop products
                </button>
              </Link>
              <Link to="/nova/overview">
                <button className="border border-border text-foreground hover:bg-muted px-8 py-3 text-sm font-medium transition-all duration-300">
                  Explore Nova AI
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
