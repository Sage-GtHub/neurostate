import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, Shield, Brain, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const AboutUs = () => {
  const hero = useScrollAnimation({ threshold: 0.2 });
  const mission = useScrollAnimation({ threshold: 0.2 });
  const values = useScrollAnimation({ threshold: 0.2 });
  const standards = useScrollAnimation({ threshold: 0.2 });
  
  const valuesList = [
    {
      icon: Microscope,
      title: "Research Driven",
      description: "Every product backed by clinical evidence. No marketing claims. Just data.",
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Shield,
      title: "Uncompromised Quality",
      description: "Third party tested. GMP certified. No shortcuts.",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Brain,
      title: "Cognitive First",
      description: "Everything we build optimises brain function. That is the mission.",
      gradient: "from-signal-blue/20 to-signal-blue/5",
    },
    {
      icon: Zap,
      title: "Measurable Outcomes",
      description: "If you cannot measure it, we do not sell it. Performance you can track.",
      gradient: "from-signal-green/20 to-signal-green/5",
    },
  ];

  const standardsList = [
    "Third party tested for purity and potency",
    "GMP certified manufacturing facilities",
    "Sustainable and ethical sourcing",
    "Full ingredient transparency",
    "NSF Certified for Sport",
    "Informed Sport certified",
  ];

  const stats = [
    { stat: "2025", label: "Founded in London", suffix: "" },
    { stat: "47", label: "Average focus increase", suffix: "%" },
    { stat: "63", label: "Burnout reduction", suffix: "%" },
    { stat: "89", label: "Customer satisfaction", suffix: "%" },
  ];

  return (
    <>
      <SEO 
        title="About Neurostate – The Cognitive Performance Company | UK"
        description="We built the world's first cognitive performance system combining AI, neuromodulation, and precision supplements. Research-driven products for focus, energy, and mental resilience."
      />
      <Header />
      <div className="min-h-screen bg-background mobile-nav-padding relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-accent/[0.08] to-transparent blur-[120px]"
            animate={{ 
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/[0.06] to-transparent blur-[100px]"
            animate={{ 
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-signal-blue/[0.04] to-signal-green/[0.04] blur-[80px]"
            animate={{ 
              rotate: [0, 360],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero */}
        <section 
          ref={hero.ref} 
          className="relative pt-32 md:pt-44 pb-24 md:pb-32 px-6 md:px-12 lg:px-20 xl:px-32"
        >
          <motion.div 
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={hero.isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={hero.isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium">About Neurostate</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={hero.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              The AI Operating System
              <br />
              <span className="bg-gradient-to-r from-foreground/60 via-foreground/40 to-foreground/60 bg-clip-text text-transparent">
                for Human Performance
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={hero.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              We replace outdated wellness with the world's first integrated cognitive performance platform.
            </motion.p>

            {/* Animated line */}
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-accent/50 to-transparent mx-auto mt-12"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={hero.isVisible ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ originY: 0 }}
            />
          </motion.div>
        </section>

        {/* Mission */}
        <section 
          ref={mission.ref} 
          className="py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -40 }}
                animate={mission.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Mission</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.1]">
                  Cognitive performance 
                  <span className="block text-muted-foreground">should not be a mystery</span>
                </h2>
                
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For too long, optimal brain function has been left to chance. Meditation apps. Wellness programmes. Vague advice about sleep and stress.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We built Neurostate to change that. One integrated system combining AI coaching, clinical grade hardware, and precision nutrition.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 40 }}
                animate={mission.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {stats.map((item, i) => (
                  <StatCard key={i} {...item} index={i} isVisible={mission.isVisible} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section 
          ref={values.ref} 
          className="py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={values.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">Our Values</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
                No fluff. No clichés.
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Everything we do is built on these core principles.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {valuesList.map((value, i) => (
                <ValueCard key={i} {...value} index={i} isVisible={values.isVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* Standards */}
        <section 
          ref={standards.ref} 
          className="py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -40 }}
                animate={standards.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-signal-green/10 border border-signal-green/20">
                  <Shield className="w-3 h-3 text-signal-green" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-signal-green font-medium">Quality Standards</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.1]">
                  Military grade
                  <span className="block text-muted-foreground">precision</span>
                </h2>
                
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  Every product we sell meets the highest standards in the industry. No exceptions. No compromises.
                </p>
              </motion.div>
              
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: 40 }}
                animate={standards.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {standardsList.map((standard, i) => (
                  <StandardItem key={i} text={standard} index={i} isVisible={standards.isVisible} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[2rem] overflow-hidden">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/30 to-signal-blue/30 p-[1px] rounded-[2rem]">
                <div className="absolute inset-[1px] bg-background rounded-[calc(2rem-1px)]" />
              </div>
              
              {/* Content */}
              <div className="relative p-12 md:p-16 lg:p-20 text-center space-y-8">
                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-accent/20 to-transparent blur-3xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[11px] uppercase tracking-[0.15em] text-accent font-medium">Start Your Journey</span>
                </motion.div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground relative z-10">
                  Ready to upgrade?
                </h2>
                
                <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto relative z-10">
                  Experience the Neurostate system. AI coaching. Neuromodulation. Precision nutrition.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10">
                  <Button 
                    size="lg" 
                    className="rounded-full h-12 px-8 text-sm bg-foreground text-background hover:bg-foreground/90 group"
                    onClick={() => {
                      toast.info("Coming Soon", {
                        description: "Our shop is launching soon. Stay tuned!",
                      });
                    }}
                  >
                    Shop now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link to="/contact">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full h-12 px-8 text-sm border-foreground/20 text-foreground/70 hover:bg-foreground/5 hover:border-foreground/30"
                    >
                      Contact us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

// Interactive Stat Card Component
const StatCard = ({ stat, label, suffix, index, isVisible }: { 
  stat: string; 
  label: string; 
  suffix: string; 
  index: number; 
  isVisible: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-50, 50], [5, -5]);
  const rotateY = useTransform(x, [-50, 50], [-5, 5]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer perspective-1000"
    >
      <div className={`
        relative flex items-center gap-6 p-6 rounded-2xl 
        bg-gradient-to-br from-card/80 to-card/40 
        border border-border/50
        backdrop-blur-sm
        transition-all duration-500
        ${isHovered ? 'border-accent/30 shadow-lg shadow-accent/5' : ''}
      `}>
        {/* Glow effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        <div className="relative z-10 flex items-baseline gap-1">
          <motion.span 
            className="text-3xl md:text-4xl font-light text-accent"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            {stat}
          </motion.span>
          <span className="text-xl text-accent/60">{suffix}</span>
        </div>
        <span className="relative z-10 text-xs text-muted-foreground">{label}</span>
        
        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
          <motion.div 
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-accent/20 to-transparent"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Interactive Value Card Component
const ValueCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  index, 
  isVisible 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  gradient: string; 
  index: number; 
  isVisible: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div 
        className={`
          relative p-8 md:p-10 rounded-3xl overflow-hidden cursor-pointer
          bg-gradient-to-br from-card/80 to-card/40
          border border-border/50
          transition-all duration-500
          ${isHovered ? 'border-accent/40' : ''}
        `}
        animate={isHovered ? { y: -4 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background gradient on hover */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0`}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
        </div>

        {/* Icon with glow */}
        <div className="relative mb-6">
          <motion.div 
            className="absolute inset-0 w-12 h-12 rounded-xl bg-accent/20 blur-xl"
            animate={isHovered ? { scale: 1.5, opacity: 1 } : { scale: 1, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div 
            className="relative w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center"
            animate={isHovered ? { rotate: 5, scale: 1.05 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5 text-accent" />
          </motion.div>
        </div>
        
        <h3 className="relative text-base font-medium text-foreground mb-3 transition-colors">
          {title}
        </h3>
        <p className="relative text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Bottom accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-primary"
          initial={{ width: 0 }}
          animate={isHovered ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Standard Item Component
const StandardItem = ({ text, index, isVisible }: { text: string; index: number; isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative flex items-center gap-4 p-5 rounded-2xl cursor-pointer
        bg-gradient-to-r from-card/60 to-transparent
        border border-border/30
        transition-all duration-300
        ${isHovered ? 'border-signal-green/30 bg-signal-green/5' : ''}
      `}
    >
      <motion.div
        animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isHovered ? 'text-signal-green' : 'text-accent'}`} />
      </motion.div>
      <span className={`text-sm transition-colors duration-300 ${isHovered ? 'text-foreground' : 'text-muted-foreground'}`}>
        {text}
      </span>
      
      {/* Hover indicator */}
      <motion.div 
        className="absolute right-4 w-2 h-2 rounded-full bg-signal-green"
        initial={{ opacity: 0, scale: 0 }}
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default AboutUs;
