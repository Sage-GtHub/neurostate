import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { supabase } from "@/integrations/supabase/client";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ArrowUpRight, Target, Activity, TrendingUp, Zap, Sparkles, Check, Moon, Brain, Heart, Dumbbell, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";

interface Protocol {
  id: string;
  protocol_name: string;
  goal: string;
  status: string;
  completion_percentage: number;
  started_at: string;
  products: any[];
}

interface Assessment {
  id: string;
  goals: string[];
  assessment_data: {
    sleepQuality?: string;
    stressLevel?: string;
    activityLevel?: string;
    workStyle?: string;
  };
  lifestyle_factors: any;
}

interface RecommendedProtocol {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  match: number;
  duration: string;
  items: number;
  benefits: string[];
}

const PROTOCOL_TEMPLATES: Record<string, Omit<RecommendedProtocol, 'match'>> = {
  sleep: {
    id: 'sleep',
    name: 'Deep Sleep Protocol',
    description: 'Optimise sleep architecture for enhanced recovery and cognitive restoration.',
    icon: Moon,
    color: 'from-indigo-500/20 to-purple-500/20',
    duration: '4 weeks',
    items: 5,
    benefits: ['Improved sleep quality', 'Faster recovery', 'Enhanced cognition']
  },
  focus: {
    id: 'focus',
    name: 'Cognitive Enhancement Protocol',
    description: 'Sharpen focus, extend deep work capacity, and reduce mental fatigue.',
    icon: Brain,
    color: 'from-amber-500/20 to-orange-500/20',
    duration: '6 weeks',
    items: 4,
    benefits: ['Extended focus', 'Reduced brain fog', 'Peak mental clarity']
  },
  recovery: {
    id: 'recovery',
    name: 'Recovery Optimisation Protocol',
    description: 'Accelerate physical and mental recovery between high-demand periods.',
    icon: Heart,
    color: 'from-emerald-500/20 to-teal-500/20',
    duration: '4 weeks',
    items: 6,
    benefits: ['Faster HRV recovery', 'Reduced inflammation', 'Better adaptation']
  },
  energy: {
    id: 'energy',
    name: 'Sustained Energy Protocol',
    description: 'Eliminate energy crashes and maintain consistent output throughout the day.',
    icon: Zap,
    color: 'from-yellow-500/20 to-amber-500/20',
    duration: '3 weeks',
    items: 4,
    benefits: ['Stable energy', 'No afternoon slumps', 'Better endurance']
  },
  stress: {
    id: 'stress',
    name: 'Stress Resilience Protocol',
    description: 'Build adaptive capacity and reduce the physiological impact of stress.',
    icon: Activity,
    color: 'from-cyan-500/20 to-blue-500/20',
    duration: '5 weeks',
    items: 5,
    benefits: ['Lower cortisol', 'Better HRV', 'Improved resilience']
  },
  performance: {
    id: 'performance',
    name: 'Peak Performance Protocol',
    description: 'Comprehensive optimisation for maximum cognitive and physical output.',
    icon: Target,
    color: 'from-rose-500/20 to-pink-500/20',
    duration: '8 weeks',
    items: 8,
    benefits: ['Peak output', 'Optimal recovery', 'Sustained excellence']
  },
};

export default function NovaProtocols() {
  const navigate = useNavigate();
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedProtocol[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [activatingProtocol, setActivatingProtocol] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => { 
    loadProtocols(); 
    loadAssessment();
  }, []);

  const loadProtocols = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('user_protocols').select('*').eq('user_id', user.id).order('started_at', { ascending: false });
      if (error) throw error;
      setProtocols((data || []) as Protocol[]);
    } catch (error) {
      console.error("Error loading protocols:", error);
      toast({ title: "Error", description: "Failed to load protocols", variant: "destructive" });
    }
  };

  const loadAssessment = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data, error } = await supabase
        .from('protocol_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setAssessment(data as Assessment);
        generateRecommendations(data as Assessment);
      }
    } catch (error) {
      console.error("Error loading assessment:", error);
    }
  };

  const generateRecommendations = (assessment: Assessment) => {
    const recs: RecommendedProtocol[] = [];
    
    // Generate recommendations based on goals
    assessment.goals.forEach((goal, index) => {
      const template = PROTOCOL_TEMPLATES[goal];
      if (template) {
        // Calculate match score based on position and lifestyle factors
        let matchScore = 95 - (index * 5);
        
        // Adjust based on lifestyle factors
        const lifestyle = assessment.assessment_data;
        if (goal === 'sleep' && lifestyle?.sleepQuality === 'poor') matchScore += 3;
        if (goal === 'stress' && (lifestyle?.stressLevel === 'high' || lifestyle?.stressLevel === 'very_high')) matchScore += 3;
        if (goal === 'recovery' && lifestyle?.activityLevel === 'very_active') matchScore += 3;
        
        recs.push({
          ...template,
          match: Math.min(99, matchScore)
        });
      }
    });
    
    // Add a bonus recommendation if they have few goals
    if (recs.length < 3) {
      const lifestyle = assessment.assessment_data;
      if (lifestyle?.stressLevel === 'high' || lifestyle?.stressLevel === 'very_high') {
        if (!assessment.goals.includes('stress')) {
          recs.push({ ...PROTOCOL_TEMPLATES.stress, match: 82 });
        }
      } else if (lifestyle?.sleepQuality === 'poor' || lifestyle?.sleepQuality === 'fair') {
        if (!assessment.goals.includes('sleep')) {
          recs.push({ ...PROTOCOL_TEMPLATES.sleep, match: 78 });
        }
      }
    }
    
    setRecommendations(recs.slice(0, 4));
  };

  const activateProtocol = async (rec: RecommendedProtocol) => {
    setActivatingProtocol(rec.id);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      // Create the protocol
      const { error } = await supabase.from('user_protocols').insert({
        user_id: user.id,
        protocol_name: rec.name,
        goal: rec.id,
        status: 'active',
        completion_percentage: 0,
        products: rec.benefits.map((b, i) => ({ id: `${rec.id}-${i}`, name: b, completed: false }))
      });
      
      if (error) throw error;
      
      toast({
        title: "Protocol activated",
        description: `${rec.name} has been added to your active protocols.`,
      });
      
      await loadProtocols();
    } catch (error) {
      console.error("Error activating protocol:", error);
      toast({
        title: "Error",
        description: "Failed to activate protocol. Please try again.",
        variant: "destructive"
      });
    } finally {
      setActivatingProtocol(null);
    }
  };

  const getDaysSince = (dateString: string) => {
    const start = new Date(dateString);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const averageProgress = protocols.length > 0 ? Math.round(protocols.reduce((acc, p) => acc + p.completion_percentage, 0) / protocols.length) : 0;
  const activeGoals = protocols.filter(p => p.status === 'active').map(p => p.goal);

  return (
    <NovaSwipeWrapper>
      <SEO title="Protocols | Nova AI" description="Manage your cognitive performance protocols." />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <NovaNav />
        
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Your journey</p>
            <h1 className="text-2xl font-light text-foreground mb-6">Protocols</h1>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8">
              {[
                { value: protocols.filter(p => p.status === 'active').length, label: "Active" },
                { value: `${averageProgress}%`, label: "Adherence", accent: true },
                { value: protocols.reduce((acc, p) => acc + (p.products?.length || 0), 0), label: "Items" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-light ${stat.accent ? 'text-accent' : 'text-foreground'}`}>{stat.value}</div>
                  <div className="text-[10px] text-foreground/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalised Recommendations */}
          {recommendations.length > 0 && (
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-primary font-medium">Recommended for You</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.map((rec, i) => {
                  const isActive = activeGoals.includes(rec.id);
                  const Icon = rec.icon;
                  
                  return (
                    <motion.div
                      key={rec.id}
                      className={`relative p-5 rounded-2xl border transition-all ${
                        isActive 
                          ? 'border-primary/30 bg-primary/5 opacity-60' 
                          : 'border-border/50 bg-gradient-to-br ' + rec.color + ' hover:border-primary/30'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {/* Match badge */}
                      <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                        <span className="text-[10px] font-medium text-primary">{rec.match}% match</span>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-foreground/70" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground mb-1">{rec.name}</h3>
                          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                            {rec.description}
                          </p>
                          
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-4">
                            <span>{rec.duration}</span>
                            <span>•</span>
                            <span>{rec.items} focus areas</span>
                          </div>
                          
                          {isActive ? (
                            <div className="flex items-center gap-1.5 text-[11px] text-primary">
                              <Check className="w-3.5 h-3.5" />
                              Already active
                            </div>
                          ) : (
                            <button
                              onClick={() => activateProtocol(rec)}
                              disabled={activatingProtocol === rec.id}
                              className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-[11px] font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
                            >
                              {activatingProtocol === rec.id ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  Activating...
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" />
                                  Activate Protocol
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Custom Protocol Button */}
          <button
            onClick={() => setShowAssessment(true)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full border border-dashed border-border/50 text-foreground/60 text-xs font-medium transition-all hover:border-primary/50 hover:text-foreground hover:bg-primary/5 mb-8"
          >
            <Plus className="w-4 h-4" />
            Create Custom Protocol
          </button>

          {/* Active Protocols List */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Active Protocols</p>

            {protocols.length > 0 ? (
              protocols.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => navigate(`/nova/protocols/${protocol.id}`)}
                  className="w-full flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all text-left group"
                >
                  {/* Progress Circle */}
                  <div className="w-12 h-12 rounded-full border-2 border-accent/30 flex items-center justify-center flex-shrink-0 bg-accent/[0.02]">
                    <span className="text-sm font-light text-foreground">{protocol.completion_percentage}%</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-foreground mb-1">{protocol.protocol_name}</h3>
                    <p className="text-[10px] text-foreground/40">
                      {getDaysSince(protocol.started_at)} days · {protocol.products?.length || 0} items · <span className="capitalize">{protocol.status}</span>
                    </p>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              ))
            ) : (
              !recommendations.length && (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="w-14 h-14 rounded-3xl bg-foreground/[0.02] flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-foreground/20" />
                  </div>
                  <p className="text-xs text-foreground/40 mb-6 max-w-xs">
                    No active protocols yet. Complete your assessment to get personalised recommendations.
                  </p>
                  <button
                    onClick={() => setShowAssessment(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-xs font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Start Assessment
                  </button>
                </div>
              )
            )}
          </div>

          {/* Journey Progress */}
          {protocols.length > 0 && (
            <div className="mt-12 pt-8 border-t border-foreground/5">
              <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Your Journey</p>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  { phase: 1, label: "Discover", icon: Activity, active: true },
                  { phase: 2, label: "Optimise", icon: TrendingUp, active: getDaysSince(protocols[0]?.started_at) > 7 },
                  { phase: 3, label: "Predict", icon: Target, active: getDaysSince(protocols[0]?.started_at) > 30 },
                  { phase: 4, label: "Autonomy", icon: Zap, active: getDaysSince(protocols[0]?.started_at) > 90 },
                ].map((item) => (
                  <div
                    key={item.phase}
                    className={`flex flex-col items-center p-4 rounded-2xl transition-all ${
                      item.active ? "bg-foreground/[0.03]" : "bg-foreground/[0.01] opacity-50"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mb-2 ${item.active ? "text-accent" : "text-foreground/30"}`} />
                    <span className={`text-[10px] ${item.active ? "text-foreground" : "text-foreground/30"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <ProtocolAssessment open={showAssessment} onOpenChange={setShowAssessment} onComplete={() => { loadProtocols(); loadAssessment(); }} />
      </div>
    </NovaSwipeWrapper>
  );
}