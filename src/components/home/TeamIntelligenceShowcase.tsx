import { motion } from "framer-motion";
import { ArrowRight, Users, TrendingDown, Bell, LineChart, Workflow, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const agentFeatures = [
  {
    title: "Burnout early warning",
    description: "Surface declining patterns across HRV, sleep, and workload 72 hours before they affect output.",
    icon: Bell,
  },
  {
    title: "Team analytics",
    description: "Track cognitive capacity, energy trends, and protocol completion across every department in real time.",
    icon: LineChart,
  },
  {
    title: "Automated interventions",
    description: "AI-generated recommendations that managers can approve and deploy to at-risk individuals or teams.",
    icon: Workflow,
  },
  {
    title: "Privacy-first reporting",
    description: "Managers see anonymised, aggregated team signals. Individual data stays private unless shared.",
    icon: ShieldCheck,
  },
];

export const TeamIntelligenceShowcase = () => {
  return (
    <section className="py-16 md:py-32 px-5 md:px-8 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.span
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Team Intelligence
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em] max-w-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Get closer to your team's real performance
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-lg mt-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Move beyond engagement surveys. See real-time cognitive and physiological signals that reveal how your people are actually doing.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/team-dashboard">
              <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
                Learn more
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Large product mockup */}
        <motion.div
          className="relative rounded-2xl border border-border/50 bg-card overflow-hidden shadow-lg mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/30 bg-muted/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-background/60 rounded-md px-4 py-1.5 text-[11px] text-muted-foreground font-mono text-center max-w-xs mx-auto">
                neurostate.app/team-intelligence
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Alert banner */}
            <motion.div
              className="bg-destructive/5 border border-destructive/15 rounded-xl px-5 py-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Engineering team cognitive capacity dropped 14% this week</p>
                  <p className="text-xs text-muted-foreground mt-0.5">3 team members flagged with elevated burnout risk</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-destructive/10 text-destructive px-3 py-1 rounded-full flex-shrink-0 w-fit">Action required</span>
            </motion.div>

            {/* Dashboard grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Avg. Readiness", value: "71", unit: "/100", trend: "↓ 8pts", trendColor: "text-destructive" },
                { label: "Active Protocols", value: "23", unit: " running", trend: "86% completion", trendColor: "text-green-600" },
                { label: "Est. Revenue Protected", value: "£312k", unit: "/mo", trend: "↑ 12%", trendColor: "text-green-600" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-background rounded-xl border border-border/30 p-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
                    <span className="text-xs text-muted-foreground">{stat.unit}</span>
                  </div>
                  <span className={`text-[11px] font-medium ${stat.trendColor} mt-1 block`}>{stat.trend}</span>
                </motion.div>
              ))}
            </div>

            {/* Team breakdown table */}
            <motion.div
              className="bg-background rounded-xl border border-border/30 overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="px-4 py-3 border-b border-border/20">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Department overview</p>
              </div>
              <div className="divide-y divide-border/20">
                {[
                  { team: "Engineering", members: 24, readiness: 64, risk: "High", riskBg: "bg-destructive/10 text-destructive", bar: "w-[64%] bg-destructive/60" },
                  { team: "Sales", members: 18, readiness: 78, risk: "Low", riskBg: "bg-green-500/10 text-green-600", bar: "w-[78%] bg-green-500/60" },
                  { team: "Product", members: 12, readiness: 82, risk: "Low", riskBg: "bg-green-500/10 text-green-600", bar: "w-[82%] bg-primary/60" },
                  { team: "Customer Success", members: 15, readiness: 71, risk: "Medium", riskBg: "bg-yellow-500/10 text-yellow-600", bar: "w-[71%] bg-yellow-500/60" },
                  { team: "Marketing", members: 9, readiness: 86, risk: "Low", riskBg: "bg-green-500/10 text-green-600", bar: "w-[86%] bg-primary/60" },
                ].map((dept, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                        <Users className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{dept.team}</p>
                        <p className="text-[10px] text-muted-foreground">{dept.members} members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Mini progress bar */}
                      <div className="hidden sm:block w-20">
                        <div className="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${dept.bar}`} />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-foreground w-8 text-right">{dept.readiness}</span>
                      <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${dept.riskBg}`}>{dept.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature cards - 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {agentFeatures.map((feature, i) => (
            <motion.div
              key={i}
              className="group p-6 rounded-xl border border-border/30 hover:border-primary/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                <feature.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
