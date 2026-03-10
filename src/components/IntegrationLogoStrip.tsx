import { motion } from "framer-motion";

const logos = [
  "Apple Health", "Oura", "WHOOP", "Garmin", "Fitbit",
  "Samsung Health", "Polar", "Withings", "COROS", "Amazfit",
];

export function IntegrationLogoStrip() {
  return (
    <section className="py-10 md:py-14 border-y border-border/30 overflow-hidden bg-background">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex items-center gap-12 md:gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="text-sm md:text-base font-medium text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 select-none flex-shrink-0"
              style={{ letterSpacing: "-0.02em" }}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}