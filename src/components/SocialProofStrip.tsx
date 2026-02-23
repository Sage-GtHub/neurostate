import { motion } from "framer-motion";

const pressLogos = [
  { name: "Forbes", svg: "Forbes" },
  { name: "TechCrunch", svg: "TechCrunch" },
  { name: "Wired", svg: "WIRED" },
  { name: "The Telegraph", svg: "The Telegraph" },
  { name: "Men's Health", svg: "Men's Health" },
];

export function SocialProofStrip() {
  return (
    <section className="py-8 md:py-10 px-6 md:px-8 border-b border-border/30">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          As featured in
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {pressLogos.map((logo, i) => (
            <motion.span
              key={logo.name}
              className="text-sm md:text-base font-medium text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 select-none"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              {logo.svg}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
