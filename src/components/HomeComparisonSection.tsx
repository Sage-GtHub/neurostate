import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

const comparisonPoints = [
  {
    category: "Approach",
    traditional: "Generic wellness perks and reactive health programs",
    neurostate: "Proactive cognitive performance infrastructure with predictive intelligence"
  },
  {
    category: "Measurement",
    traditional: "Participation rates and satisfaction surveys",
    neurostate: "Real-time capacity tracking, burnout prediction, and financial attribution"
  },
  {
    category: "Personalisation",
    traditional: "One-size-fits-all wellness initiatives",
    neurostate: "AI-driven protocols adapted to role, workload, and individual patterns"
  },
  {
    category: "Integration",
    traditional: "Standalone apps with low adoption (15-25%)",
    neurostate: "40+ wearables, calendars, and work tools in one unified system"
  },
  {
    category: "Foresight",
    traditional: "React after burnout and turnover occur",
    neurostate: "72-hour advance warning on capacity shifts and risk patterns"
  },
  {
    category: "ROI Visibility",
    traditional: "Difficult to measure business impact",
    neurostate: "Every metric ties to revenue exposure, intervention returns, and capacity value"
  }
];

export function HomeComparisonSection() {
  return (
    <section className="py-12 md:py-16 px-6 md:px-8 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="space-y-3 mb-8 text-center">
          <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">The Difference</span>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground">
            NeuroState vs Traditional Wellness
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            See why organisations are moving from reactive wellness programs to proactive cognitive infrastructure.
          </p>
        </ScrollReveal>

        {/* Comparison Grid */}
        <div className="grid gap-3 md:gap-4">
          {comparisonPoints.map((point, i) => (
            <motion.div
              key={point.category}
              className="group rounded-xl bg-card/60 border border-border/40 overflow-hidden hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              {/* Category Header */}
              <div className="px-4 py-2 bg-muted/50 border-b border-border/30">
                <span className="text-[10px] tracking-[0.12em] uppercase text-primary font-semibold">
                  {point.category}
                </span>
              </div>
              
              {/* Comparison Content */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
                {/* Traditional */}
                <div className="p-4 flex items-start gap-3 bg-destructive/[0.02]">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <X className="w-3.5 h-3.5 text-destructive/70" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground font-medium block mb-1">
                      Traditional Wellness
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {point.traditional}
                    </p>
                  </div>
                </div>
                
                {/* NeuroState */}
                <div className="p-4 flex items-start gap-3 bg-primary/[0.02]">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-primary font-medium block mb-1">
                      NeuroState
                    </span>
                    <p className="text-xs text-foreground leading-relaxed font-medium">
                      {point.neurostate}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
