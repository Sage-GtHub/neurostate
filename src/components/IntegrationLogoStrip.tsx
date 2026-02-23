import { motion } from "framer-motion";

const integrations = [
  "Apple Health", "Oura", "Whoop", "Garmin", "Fitbit", "Samsung", "Polar", "Withings"
];

export function IntegrationLogoStrip() {
  return (
    <section className="py-8 md:py-10 px-6 md:px-8 border-b border-border/30 bg-muted/20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Integrates with the devices your team already wears
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {integrations.map((name, i) => (
            <motion.span
              key={name}
              className="text-sm md:text-base font-medium text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 select-none"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}