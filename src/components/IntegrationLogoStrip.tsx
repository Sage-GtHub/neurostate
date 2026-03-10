import { motion } from "framer-motion";

const logos = [
  "Apple Health", "Oura", "WHOOP", "Garmin", "Fitbit", 
  "Samsung", "Polar", "Withings", "COROS", "Amazfit",
  "Google Fit", "Slack", "Microsoft Teams", "Notion",
];

export function IntegrationLogoStrip() {
  return (
    <section className="py-6 md:py-8 border-t border-border overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Scrolling marquee */}
        <motion.div
          className="flex items-center gap-10 md:gap-14 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="text-sm md:text-[15px] font-medium text-foreground/25 select-none flex-shrink-0"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
