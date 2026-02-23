import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

const stats = [
  { value: 12000, suffix: "+", label: "Active users", prefix: "" },
  { value: 40, suffix: "+", label: "Wearable integrations", prefix: "" },
  { value: 98, suffix: "%", label: "Client retention", prefix: "" },
  { value: 72, suffix: "hrs", label: "Advance forecasting", prefix: "" },
];

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref, hasStarted } = useCountUp({ end: stat.value, duration: 2200 });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="text-2xl md:text-3xl font-light text-foreground tabular-nums">
        {stat.prefix}{hasStarted ? count.toLocaleString() : "0"}{stat.suffix}
      </div>
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1.5">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsCounterBar() {
  return (
    <section className="py-10 md:py-14 px-6 md:px-8 border-b border-border/30">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
