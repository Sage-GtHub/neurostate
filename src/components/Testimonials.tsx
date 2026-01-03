import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  review: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Wellness Enthusiast",
    avatar: "SM",
    review: "The Red Light Therapy Blanket has completely transformed my recovery routine. I feel more energised and my muscle soreness has reduced significantly. Absolutely worth the investment!",
    product: "Red Light Therapy Blanket",
  },
  {
    id: 2,
    name: "James Patterson",
    role: "Professional Athlete",
    avatar: "JP",
    review: "As a professional athlete, recovery is crucial. The CryoPlunge Ice Bath has become an essential part of my daily routine. The quality is outstanding and the results speak for themselves.",
    product: "CryoPlunge Ice Bath",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Yoga Instructor",
    avatar: "EC",
    review: "I've tried many supplements, but the Omega-3 Elite is by far the best. I notice the difference in my joint health and mental clarity. The quality standards are impressive.",
    product: "Omega-3 Elite",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Business Executive",
    avatar: "MT",
    review: "The PEMF Therapy Mat has helped me manage stress and improve my sleep quality. After long days at the office, it's my go-to for relaxation. Highly recommend!",
    product: "PEMF Therapy Mat",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Fitness Coach",
    avatar: "LA",
    review: "NeuroState's products are game-changers. The customer service is excellent, delivery was fast, and the quality exceeds expectations. I recommend them to all my clients.",
  },
  {
    id: 6,
    name: "David Kumar",
    role: "Health Optimiser",
    avatar: "DK",
    review: "The RestoreSleep Night formula has been a revelation. I fall asleep faster and wake up feeling genuinely refreshed. It's become an essential part of my evening routine.",
    product: "RestoreSleep Night",
  },
];


export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40" ref={containerRef}>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 max-w-7xl mx-auto">
        <motion.div 
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="ghost-number mb-3 sm:mb-4 md:mb-6">TESTIMONIALS</p>
          <h2 className="mb-4 sm:mb-6">Customer stories</h2>
          <p className="text-body-large text-muted-foreground max-w-2xl">
            Real experiences from people optimising their performance
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="space-y-6 relative group cursor-default"
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
            >
              {/* Hover background glow */}
              <motion.div 
                className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
              />
              
              {/* Quote icon */}
              <motion.div
                className="absolute -top-2 -left-2 text-primary/10"
                initial={{ scale: 0, rotate: -45 }}
                animate={hoveredId === testimonial.id ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Quote className="w-8 h-8" />
              </motion.div>

              {/* Review Text - Primary focus */}
              <motion.p 
                className="text-[1rem] leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              >
                "{testimonial.review}"
              </motion.p>

              {/* Product Badge - Subtle */}
              {testimonial.product && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <motion.span 
                    className="inline-block text-[0.6875rem] font-medium tracking-wider uppercase text-muted-foreground/60 group-hover:text-primary transition-colors duration-300 px-3 py-1 rounded-full bg-muted/30 group-hover:bg-primary/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {testimonial.product}
                  </motion.span>
                </motion.div>
              )}

              {/* Customer Info - Minimal */}
              <motion.div 
                className="flex items-center gap-4 pt-4"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div 
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="text-[0.75rem] font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {testimonial.avatar}
                  </span>
                </motion.div>
                <div>
                  <motion.p 
                    className="text-[0.9375rem] font-medium group-hover:text-primary transition-colors duration-300"
                  >
                    {testimonial.name}
                  </motion.p>
                  <p className="text-[0.8125rem] text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
