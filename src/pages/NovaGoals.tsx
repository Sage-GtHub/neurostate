import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Target, 
  Plus, 
  Activity, 
  Brain, 
  Moon, 
  Zap, 
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
  CheckCircle2,
  Trash2,
  Heart,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

interface Goal {
  id: string;
  goal_type: string;
  target_value: number;
  current_value: number | null;
  progress_percentage: number | null;
  status: string | null;
  target_date: string | null;
  started_at: string;
}

interface MetricData {
  date: string;
  value: number;
}

interface TrendData {
  hrv: MetricData[];
  sleep: MetricData[];
  recovery: MetricData[];
  focus: MetricData[];
}

const GOAL_TYPES = [
  { value: "hrv", label: "HRV", icon: Activity, unit: "ms", description: "Heart Rate Variability" },
  { value: "sleep_score", label: "Sleep Score", icon: Moon, unit: "/100", description: "Overall sleep quality" },
  { value: "recovery", label: "Recovery", icon: TrendingUp, unit: "%", description: "Daily recovery score" },
  { value: "focus_hours", label: "Focus Hours", icon: Brain, unit: "hrs/day", description: "Deep work time" },
  { value: "energy", label: "Energy", icon: Zap, unit: "/100", description: "Daily energy levels" },
];

// Radial progress component
const RadialProgress = ({ 
  value, 
  max, 
  size = 100, 
  strokeWidth = 8,
  color = "hsl(var(--accent))",
  bgColor = "hsl(var(--muted))"
}: { 
  value: number; 
  max: number; 
  size?: number; 
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-foreground">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default function NovaGoals() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"goals" | "trends">("goals");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Goals form state
  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");

  // Trends state
  const [timeRange, setTimeRange] = useState<"30" | "90">("30");
  const [trendData, setTrendData] = useState<TrendData>({ hrv: [], sleep: [], recovery: [], focus: [] });
  const [trendsLoading, setTrendsLoading] = useState(false);
  const [trendsError, setTrendsError] = useState<string | null>(null);

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    if (activeTab === "trends") {
      loadTrendData();
    }
  }, [activeTab, timeRange]);

  const loadGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('performance_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error("Error loading goals:", error);
      toast({
        title: "Error",
        description: "Failed to load goals",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendData = async () => {
    setTrendsLoading(true);
    setTrendsError(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const days = parseInt(timeRange);
      const startDate = startOfDay(subDays(new Date(), days));
      const endDate = endOfDay(new Date());

      const { data, error } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .gte('recorded_at', startDate.toISOString())
        .lte('recorded_at', endDate.toISOString())
        .order('recorded_at', { ascending: true });

      if (error) throw error;

      const grouped: Record<string, Record<string, number[]>> = {
        hrv: {},
        sleep_score: {},
        recovery: {},
        focus: {},
      };

      (data || []).forEach(metric => {
        const date = format(new Date(metric.recorded_at), 'yyyy-MM-dd');
        const type = metric.metric_type;
        
        if (!grouped[type]) grouped[type] = {};
        if (!grouped[type][date]) grouped[type][date] = [];
        grouped[type][date].push(Number(metric.value));
      });

      const processMetric = (metricData: Record<string, number[]>): MetricData[] => {
        return Object.entries(metricData).map(([date, values]) => ({
          date,
          value: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
        })).sort((a, b) => a.date.localeCompare(b.date));
      };

      setTrendData({
        hrv: processMetric(grouped.hrv || {}),
        sleep: processMetric(grouped.sleep_score || {}),
        recovery: processMetric(grouped.recovery || {}),
        focus: processMetric(grouped.focus || {}),
      });
    } catch (err) {
      console.error("Error loading trends:", err);
      setTrendsError("Failed to load trend data");
    } finally {
      setTrendsLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    if (!newGoalType || !newGoalTarget) {
      toast({
        title: "Missing information",
        description: "Please select a goal type and enter a target value",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('performance_goals')
        .insert({
          user_id: user.id,
          goal_type: newGoalType,
          target_value: parseFloat(newGoalTarget),
          target_date: newGoalDate || null,
          current_value: 0,
          progress_percentage: 0,
          status: 'active',
        });

      if (error) throw error;

      toast({ title: "Goal created", description: "Your new goal has been added" });
      setNewGoalType("");
      setNewGoalTarget("");
      setNewGoalDate("");
      setIsOpen(false);
      loadGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
      toast({ title: "Error", description: "Failed to create goal", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('performance_goals')
        .update({ status: 'cancelled' })
        .eq('id', goalId);

      if (error) throw error;
      toast({ title: "Goal removed", description: "The goal has been removed" });
      loadGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast({ title: "Error", description: "Failed to remove goal", variant: "destructive" });
    }
  };

  const getGoalIcon = (type: string) => {
    const goalType = GOAL_TYPES.find(g => g.value === type);
    return goalType?.icon || Target;
  };

  const getGoalLabel = (type: string) => {
    const goalType = GOAL_TYPES.find(g => g.value === type);
    return goalType?.label || type;
  };

  const getGoalUnit = (type: string) => {
    const goalType = GOAL_TYPES.find(g => g.value === type);
    return goalType?.unit || "";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "hsl(142, 76%, 36%)";
    if (percentage >= 50) return "hsl(var(--accent))";
    if (percentage >= 25) return "hsl(38, 92%, 50%)";
    return "hsl(var(--muted-foreground))";
  };

  const calculateTrend = (data: MetricData[]) => {
    if (data.length < 2) return { direction: "neutral", change: 0 };
    const recent = data.slice(-7);
    const earlier = data.slice(-14, -7);
    if (recent.length === 0 || earlier.length === 0) return { direction: "neutral", change: 0 };
    const recentAvg = recent.reduce((a, b) => a + b.value, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b.value, 0) / earlier.length;
    const change = ((recentAvg - earlierAvg) / earlierAvg) * 100;
    return {
      direction: change > 2 ? "up" : change < -2 ? "down" : "neutral",
      change: Math.abs(Math.round(change)),
    };
  };

  const TrendIcon = ({ direction }: { direction: string }) => {
    if (direction === "up") return <TrendingUp className="w-4 h-4 text-accent" />;
    if (direction === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const metrics = [
    { key: "hrv", label: "HRV", icon: Heart, color: "hsl(var(--accent))", data: trendData.hrv, unit: "ms" },
    { key: "sleep", label: "Sleep Score", icon: Moon, color: "#6366f1", data: trendData.sleep, unit: "" },
    { key: "recovery", label: "Recovery", icon: Activity, color: "#f59e0b", data: trendData.recovery, unit: "%" },
    { key: "focus", label: "Focus", icon: Brain, color: "#ec4899", data: trendData.focus, unit: "" },
  ];

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Goals & Trends – Nova | NeuroState"
        description="Track your performance goals and visualise your biometric trends with Nova."
      />
      <div className="min-h-screen bg-background pb-24 md:pb-0">
        <NovaNav />
        
        {/* Header */}
        <div className="border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-2">Performance</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Goals & Trends</h1>
                <p className="text-sm text-muted-foreground">Track targets and visualise your progress</p>
              </div>
              {activeTab === "goals" && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Add Goal</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Goal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Goal Type</Label>
                        <Select value={newGoalType} onValueChange={setNewGoalType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a metric" />
                          </SelectTrigger>
                          <SelectContent>
                            {GOAL_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <type.icon className="w-4 h-4" />
                                  <span>{type.label}</span>
                                  <span className="text-muted-foreground text-xs">({type.unit})</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Target Value</Label>
                        <Input
                          type="number"
                          placeholder="e.g. 70"
                          value={newGoalTarget}
                          onChange={(e) => setNewGoalTarget(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Target Date (optional)</Label>
                        <Input
                          type="date"
                          value={newGoalDate}
                          onChange={(e) => setNewGoalDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleCreateGoal} disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Create Goal
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
          {/* Tab Switcher */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "goals" | "trends")} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="goals" className="gap-2">
                <Target className="w-4 h-4" />
                Goals
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Trends
              </TabsTrigger>
            </TabsList>

            {/* Goals Tab */}
            <TabsContent value="goals" className="mt-0">
              {goals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">No goals yet</h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Set performance goals to track your progress and stay motivated.
                  </p>
                  <Button onClick={() => setIsOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Goal
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="card-depth border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-foreground">{goals.length}</div>
                        <div className="text-sm text-muted-foreground">Active Goals</div>
                      </CardContent>
                    </Card>
                    <Card className="card-depth border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-accent">
                          {goals.filter(g => (g.progress_percentage || 0) >= 100).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </CardContent>
                    </Card>
                    <Card className="card-depth border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-foreground">
                          {goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + (g.progress_percentage || 0), 0) / goals.length) : 0}%
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Progress</div>
                      </CardContent>
                    </Card>
                    <Card className="card-depth border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-foreground">
                          {goals.filter(g => (g.progress_percentage || 0) >= 50).length}
                        </div>
                        <div className="text-sm text-muted-foreground">On Track</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Goals Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals.map((goal) => {
                      const Icon = getGoalIcon(goal.goal_type);
                      const progress = goal.progress_percentage || 0;
                      const isComplete = progress >= 100;

                      return (
                        <Card 
                          key={goal.id} 
                          className={cn(
                            "card-depth border-border/50 transition-all hover:shadow-lg",
                            isComplete && "border-accent/50"
                          )}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center",
                                  isComplete ? "bg-accent/20" : "bg-muted"
                                )}>
                                  {isComplete ? (
                                    <CheckCircle2 className="w-5 h-5 text-accent" />
                                  ) : (
                                    <Icon className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground">{getGoalLabel(goal.goal_type)}</h3>
                                  <p className="text-xs text-muted-foreground">
                                    Target: {goal.target_value}{getGoalUnit(goal.goal_type)}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteGoal(goal.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-center my-4">
                              <RadialProgress 
                                value={progress} 
                                max={100}
                                color={getProgressColor(progress)}
                              />
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Current</span>
                                <span className="font-medium text-foreground">
                                  {goal.current_value || 0}{getGoalUnit(goal.goal_type)}
                                </span>
                              </div>
                              {goal.target_date && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Target Date</span>
                                  <span className="font-medium text-foreground">
                                    {new Date(goal.target_date).toLocaleDateString('en-GB', { 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="mt-0">
              {/* Time Range Selector */}
              <div className="flex justify-center mb-8">
                <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "30" | "90")}>
                  <TabsList>
                    <TabsTrigger value="30">30 Days</TabsTrigger>
                    <TabsTrigger value="90">90 Days</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {trendsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                </div>
              ) : trendsError ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                  <p className="text-muted-foreground mb-4">{trendsError}</p>
                  <Button onClick={loadTrendData} variant="outline">Try Again</Button>
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  {metrics.map((metric) => {
                    const trend = calculateTrend(metric.data);
                    const latestValue = metric.data[metric.data.length - 1]?.value || "--";
                    const hasData = metric.data.length > 0;

                    return (
                      <Card key={metric.key} className="card-depth border-border/50">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">{metric.label}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Current: {latestValue}{metric.unit}
                                </p>
                              </div>
                            </div>
                            {hasData && (
                              <div className="flex items-center gap-2">
                                <TrendIcon direction={trend.direction} />
                                <span className={`text-sm font-medium ${
                                  trend.direction === "up" ? "text-accent" :
                                  trend.direction === "down" ? "text-destructive" : "text-muted-foreground"
                                }`}>
                                  {trend.change}%
                                </span>
                              </div>
                            )}
                          </div>

                          {hasData ? (
                            <div className="h-48">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={metric.data}>
                                  <defs>
                                    <linearGradient id={`gradient-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={metric.color} stopOpacity={0.2} />
                                      <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                  <XAxis 
                                    dataKey="date" 
                                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                                    tickFormatter={(value) => format(new Date(value), 'd MMM')}
                                  />
                                  <YAxis 
                                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                                    domain={['dataMin - 5', 'dataMax + 5']}
                                  />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: 'hsl(var(--card))', 
                                      border: '1px solid hsl(var(--border))',
                                      borderRadius: '8px',
                                      fontSize: '12px',
                                      color: 'hsl(var(--foreground))'
                                    }}
                                    labelFormatter={(value) => format(new Date(value), 'dd MMM yyyy')}
                                  />
                                  <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke={metric.color} 
                                    strokeWidth={2}
                                    fill={`url(#gradient-${metric.key})`}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          ) : (
                            <div className="h-48 flex items-center justify-center text-center">
                              <div>
                                <p className="text-muted-foreground mb-2">No data available</p>
                                <p className="text-xs text-muted-foreground">Connect a device to start tracking</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
