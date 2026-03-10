import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

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
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <>
      <SEO 
        title="Cognitive Performance Blog | Insights & Research | NeuroState"
        description="Expert insights on cognitive performance, AI-driven personalisation, burnout prevention, and workplace performance optimisation."
        keywords="cognitive performance blog, burnout prevention insights, AI wellness research, workplace productivity articles"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-3xl">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Blog</span>
                <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground mt-4 tracking-tight leading-[1.08]">
                  Cognitive Performance{" "}
                  <span className="text-muted-foreground">Insights</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed">
                  Evidence-based insights on AI-driven cognitive performance and workforce optimisation.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Featured Post */}
          {featuredPost && (
            <section className="px-5 md:px-8 pb-16 md:pb-24">
              <div className="max-w-6xl mx-auto">
                <Link to={`/blog/${featuredPost.slug}`} className="group block">
                  <motion.div
                    className="p-8 md:p-12 rounded-xl bg-foreground transition-colors"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Featured</span>
                    <h2 className="text-2xl md:text-3xl font-medium text-background mt-4 leading-[1.15] group-hover:text-background/80 transition-colors max-w-2xl">
                      {featuredPost.title}
                    </h2>
                    <p className="text-background/60 text-sm leading-relaxed mt-4 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-background/40 text-xs mt-6">
                      <span className="text-primary font-medium">{featuredPost.category}</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readTime}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(featuredPost.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </section>
          )}

          {/* All Posts */}
          <section className="px-5 md:px-8 pb-16 md:pb-28">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-10">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Latest</span>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post, i) => (
                  <Link key={i} to={`/blog/${post.slug}`} className="group">
                    <motion.article
                      className="p-6 md:p-8 rounded-xl border border-border/40 hover:border-primary/30 transition-colors h-full flex flex-col"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-primary font-semibold mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-base font-medium text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                        {post.excerpt.slice(0, 140)}…
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-3 font-mono">
                          <span>{post.readTime}</span>
                          <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 px-5 md:px-8 bg-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Next Steps</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-background leading-[1.1]">
                  Experience the cognitive performance system
                </h2>
                <p className="text-base text-background/60 max-w-lg mx-auto">
                  Move beyond reading about performance. Start optimising it.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Get in touch
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/nova/overview">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium rounded-full bg-transparent border border-background/30 text-background hover:bg-background/10">
                      Explore Nova AI
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
