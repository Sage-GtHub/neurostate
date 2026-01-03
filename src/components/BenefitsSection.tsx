import { Heart, Brain, Zap, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BenefitsSectionProps {
  productType?: string;
}

export const BenefitsSection = ({ productType }: BenefitsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const benefits = [
    {
      icon: Heart,
      title: "Heart health",
      description: "Supports your cardiovascular system"
    },
    {
      icon: Brain,
      title: "Cognitive function",
      description: "Helps keep your mind sharp"
    },
    {
      icon: Zap,
      title: "Energy and recovery",
      description: "Bounce back quicker"
    },
    {
      icon: Shield,
      title: "Immune support",
      description: "Strengthens your natural defenses"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-16"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {benefits.map((benefit, index) => (
        <motion.div 
          key={index} 
          className="border-l-2 border-primary/30 pl-4 group cursor-default relative"
          variants={itemVariants}
          whileHover={{ 
            x: 8,
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }}
        >
          {/* Animated border on hover */}
          <motion.div 
            className="absolute left-0 top-0 w-0.5 bg-primary origin-top"
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%' }}
          />
          
          {/* Icon with animation */}
          <motion.div 
            className="mb-3 text-muted-foreground group-hover:text-primary transition-colors duration-300"
            whileHover={{ 
              scale: 1.2, 
              rotate: 10,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <benefit.icon className="w-6 h-6" />
          </motion.div>
          
          <motion.h4 
            className="text-[1.125rem] font-medium mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
          >
            {benefit.title}
          </motion.h4>
          <motion.p 
            className="text-[0.9375rem] text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300"
          >
            {benefit.description}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
};
