import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Brain, 
  Zap, 
  Users,
  ChevronRight,
  Sparkles,
  Activity,
  Target,
  Clock,
  DollarSign,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  PoundSterling,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TeamBreakdownModalProps {
  open: boolean;
  onClose: () => void;
  team: {
    name: string;
    risk: number;
    trend: string;
    members: number;
    exposure: number;
  };
}

export function TeamBreakdownModal({ open, onClose, team }: TeamBreakdownModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'interventions'>('overview');

  const teamMembers = [
    { name: 'Alex Johnson', role: 'Senior Engineer', readiness: 82, trend: 'up', risk: 18 },
    { name: 'Sarah Chen', role: 'Product Manager', readiness: 68, trend: 'down', risk: 45 },
    { name: 'Mike Brown', role: 'Designer', readiness: 75, trend: 'stable', risk: 28 },
    { name: 'Emma Wilson', role: 'Engineer', readiness: 58, trend: 'down', risk: 62 },
    { name: 'James Lee', role: 'QA Lead', readiness: 71, trend: 'up', risk: 32 },
  ];

  const interventions = [
    { action: 'Reduce meeting load by 20%', impact: 'medium', confidence: 78, value: 8400 },
    { action: 'Schedule recovery day next week', impact: 'high', confidence: 85, value: 15200 },
    { action: 'Reassign Q1 deadline to adjacent team', impact: 'high', confidence: 72, value: 21000 },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            {team.name} Team
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-3 sm:mt-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border/50">
              <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">Burnout</div>
              <div className="flex items-end gap-1 sm:gap-2">
                <span className={`text-lg sm:text-2xl font-semibold ${team.risk > 40 ? 'text-red-500' : team.risk > 25 ? 'text-amber-500' : 'text-green-600'}`}>
                  {team.risk}%
                </span>
                {team.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500 mb-0.5 sm:mb-1" />}
                {team.trend === 'down' && <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600 mb-0.5 sm:mb-1" />}
              </div>
            </div>
            <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border/50">
              <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">Size</div>
              <span className="text-lg sm:text-2xl font-semibold text-foreground">{team.members}</span>
            </div>
            <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border/50">
              <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">Exposure</div>
              <span className="text-lg sm:text-2xl font-semibold text-amber-500">£{(team.exposure / 1000).toFixed(0)}k</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 sm:gap-2 p-1 rounded-lg bg-muted/30">
            {['overview', 'members', 'interventions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium rounded-md transition-all ${
                  activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    <span className="text-[10px] sm:text-xs font-medium text-foreground">Nova Insight</span>
                  </div>
                  <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed">
                    The {team.name} team shows elevated stress markers driven by meeting density 
                    (2.1x average) and upcoming Q1 deadlines. Recovery patterns suggest 
                    intervention within 7 days is optimal.
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-[10px] sm:text-xs font-medium text-foreground">Key Signals</h4>
                  {[
                    { label: 'Sleep Quality', value: 68, benchmark: 75 },
                    { label: 'HRV Trend', value: 45, benchmark: 60 },
                    { label: 'Meeting Load', value: 78, benchmark: 50 },
                    { label: 'Focus Time', value: 52, benchmark: 65 },
                  ].map((signal) => (
                    <div key={signal.label} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-muted/20 gap-2">
                      <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{signal.label}</span>
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <Progress value={signal.value} className="w-16 sm:w-24 h-1 sm:h-1.5" />
                        <span className={`text-[10px] sm:text-xs font-medium w-8 text-right ${signal.value < signal.benchmark ? 'text-amber-500' : 'text-green-600'}`}>
                          {signal.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'members' && (
              <motion.div
                key="members"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 sm:space-y-3"
              >
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center justify-between p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/30 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] sm:text-xs font-medium text-primary">{member.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] sm:text-sm font-medium text-foreground truncate">{member.name}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-muted-foreground">Readiness</div>
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-sm font-medium text-foreground">{member.readiness}</span>
                          {member.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-600" />}
                          {member.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                        </div>
                      </div>
                      <div className="sm:hidden text-right">
                        <span className="text-[11px] font-medium text-foreground">{member.readiness}</span>
                        {member.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 text-green-600 inline ml-0.5" />}
                        {member.trend === 'down' && <TrendingDown className="w-2.5 h-2.5 text-red-500 inline ml-0.5" />}
                      </div>
                      <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-medium ${
                        member.risk > 50 ? 'bg-red-500/10 text-red-500' : 
                        member.risk > 30 ? 'bg-amber-500/10 text-amber-600' : 
                        'bg-green-500/10 text-green-600'
                      }`}>
                        {member.risk}%
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'interventions' && (
              <motion.div
                key="interventions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 sm:space-y-3"
              >
                {interventions.map((intervention, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/30">
                    <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                      <div className="flex items-start gap-2 min-w-0">
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] sm:text-sm font-medium text-foreground">{intervention.action}</span>
                      </div>
                      <Badge variant="outline" className={`text-[8px] sm:text-[9px] flex-shrink-0 ${
                        intervention.impact === 'high' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-muted text-muted-foreground'
                      }`}>
                        {intervention.impact}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="text-[10px] sm:text-xs text-muted-foreground">
                          <span className="text-foreground font-medium">{intervention.confidence}%</span> <span className="hidden sm:inline">confidence</span>
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">
                          <span className="text-green-600 font-medium">£{(intervention.value / 1000).toFixed(1)}k</span>
                        </div>
                      </div>
                      <Button size="sm" className="text-[9px] sm:text-[10px] h-6 sm:h-7 px-2 sm:px-3 rounded-full">
                        Apply
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 sm:ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InsightTraceModalProps {
  open: boolean;
  onClose: () => void;
  insight: {
    title: string;
    confidence: number;
    trace: string;
  };
}

export function InsightTraceModal({ open, onClose, insight }: InsightTraceModalProps) {
  const traceSteps = [
    { phase: 'Signal Ingestion', detail: 'Collected 847 data points across 42 team members over 14 days', icon: Activity },
    { phase: 'Pattern Detection', detail: 'Identified elevated stress markers correlating with meeting density (r=0.78)', icon: Brain },
    { phase: 'Historical Comparison', detail: 'Pattern matches Q4 2024 burnout event with 82% similarity', icon: BarChart3 },
    { phase: 'Intervention Modelling', detail: 'Simulated 3 intervention scenarios with projected outcomes', icon: Target },
    { phase: 'Confidence Calculation', detail: `Final confidence score: ${insight.confidence}% based on signal quality and historical accuracy`, icon: CheckCircle2 },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Insight Trace
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-3 sm:mt-4">
          <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20">
            <h4 className="text-[11px] sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">{insight.title}</h4>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-[9px] sm:text-[10px] bg-primary/10 text-primary">
                {insight.confidence}% confidence
              </Badge>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground">Nova AI</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-[10px] sm:text-xs font-medium text-foreground uppercase tracking-wider">How Nova reached this conclusion</h4>
            
            {traceSteps.map((step, i) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-2.5 sm:gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  {i < traceSteps.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-3 sm:pb-4">
                  <p className="text-[11px] sm:text-sm font-medium text-foreground">{step.phase}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-relaxed">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30 border border-border/50">
            <h4 className="text-[10px] sm:text-xs font-medium text-foreground mb-1.5 sm:mb-2">Raw Trace</h4>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono leading-relaxed break-words">{insight.trace}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface FinancialBreakdownModalProps {
  open: boolean;
  onClose: () => void;
}

export function FinancialBreakdownModal({ open, onClose }: FinancialBreakdownModalProps) {
  const breakdown = [
    { category: 'Productivity Loss', amount: 23400, percentage: 45, description: 'Reduced output due to cognitive fatigue' },
    { category: 'Quality Incidents', amount: 12800, percentage: 25, description: 'Errors and rework from impaired decision-making' },
    { category: 'Turnover Risk', amount: 8600, percentage: 17, description: 'Projected replacement costs for at-risk team members' },
    { category: 'Missed Deadlines', amount: 6700, percentage: 13, description: 'Revenue impact from delayed deliverables' },
  ];

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
            <PoundSterling className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
            Financial Attribution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-3 sm:mt-4">
          <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-600 mb-0.5 sm:mb-1">Total Weekly Exposure</div>
            <div className="text-2xl sm:text-3xl font-semibold text-amber-500">£{total.toLocaleString()}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">Estimated revenue at risk due to cognitive underperformance</p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {breakdown.map((item) => (
              <div key={item.category} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
                  <span className="text-[11px] sm:text-sm font-medium text-foreground">{item.category}</span>
                  <span className="text-[11px] sm:text-sm font-semibold text-foreground flex-shrink-0">£{item.amount.toLocaleString()}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">{item.description}</p>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="h-1 sm:h-1.5 flex-1" />
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/20 gap-3">
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs text-green-600 font-medium">Recoverable Value</div>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 truncate">With interventions</p>
            </div>
            <span className="text-xl sm:text-2xl font-semibold text-green-600 flex-shrink-0">£{Math.round(total * 0.68).toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
