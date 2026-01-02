import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Users, User, Shield, Crown, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const roles = [
  { 
    icon: User, 
    title: "Individual", 
    description: "Personal performance coaching and optimisation",
    features: ["Daily readiness score", "Personal recovery protocols", "Focus time recommendations", "Progress tracking"]
  },
  { 
    icon: Shield, 
    title: "Manager", 
    description: "Team risk and intervention guidance",
    features: ["Team readiness overview", "Burnout risk alerts", "Workload balancing", "1:1 preparation insights"]
  },
  { 
    icon: BarChart3, 
    title: "Head of People", 
    description: "Organisational patterns and prevention",
    features: ["Department comparisons", "Trend analysis", "Intervention ROI", "Policy impact modelling"]
  },
  { 
    icon: Crown, 
    title: "CEO / Executive", 
    description: "Cognitive risk exposure at scale",
    features: ["Enterprise readiness", "Capacity planning", "Strategic risk indicators", "Board-ready reporting"]
  },
];

export default function CommandSurfaces() {
  return (
    <>
      <SEO
        title="Command Surfaces by Role | NeuroState Solutions"
        description="One system. Different truths. Role-specific views that deliver the right information to the right people."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 5</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Command Surfaces by Role
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  One system. Different truths. Role-specific views that deliver the right information to the right people.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Role Grid */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {roles.map((role, i) => (
                  <motion.div 
                    key={role.title}
                    className="p-6 rounded-2xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <role.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-foreground mb-1">{role.title}</h3>
                        <p className="text-xs text-muted-foreground mb-4">{role.description}</p>
                        <ul className="space-y-1.5">
                          {role.features.map((feature, j) => (
                            <li key={j} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                              <div className="w-1 h-1 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy Note */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl font-normal text-foreground">Privacy by design</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Each role sees only what they need to see. Individual data is protected by default, with explicit consent required for any drill-down visibility.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">See the role-based experience</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
                  <Link to="/solutions">
                    <Button variant="outline" className="h-10 px-5 text-xs font-medium rounded-full">
                      Back to Solutions
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
