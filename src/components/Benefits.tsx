import { Shield, Award, FlaskConical } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const Benefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const benefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Third-Party Tested"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Money-Back Guarantee"
    },
    {
      icon: <FlaskConical className="h-5 w-5" />,
      title: "Science Backed"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20" ref={containerRef}>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
        <motion.div 
          className="flex justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-32 flex-wrap"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-2 sm:gap-3 group cursor-default"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -4,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="text-foreground/70 group-hover:text-primary transition-colors duration-300"
                animate={isInView ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              >
                {benefit.icon}
              </motion.div>
              <motion.span 
                className="text-ui-label text-[0.625rem] sm:text-xs text-foreground/70 group-hover:text-foreground transition-colors duration-300"
              >
                {benefit.title}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
