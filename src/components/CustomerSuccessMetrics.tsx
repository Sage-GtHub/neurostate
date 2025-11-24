import { useEffect, useState } from "react";
import { TrendingUp, Users, Award, Activity, Target, Clock } from "lucide-react";

interface MetricData {
  value: number;
  change: number;
  trend: "up" | "down";
}

export function CustomerSuccessMetrics() {
  const [metrics, setMetrics] = useState({
    adoptionRate: { value: 87, change: 12, trend: "up" as "up" | "down" },
    satisfaction: { value: 4.6, change: 0.3, trend: "up" as "up" | "down" },
    activeUsers: { value: 2847, change: 234, trend: "up" as "up" | "down" },
    engagementScore: { value: 92, change: 8, trend: "up" as "up" | "down" },
    avgSessionTime: { value: 18, change: 3, trend: "up" as "up" | "down" },
    protocolCompletion: { value: 78, change: 5, trend: "up" as "up" | "down" }
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        adoptionRate: updateMetric(prev.adoptionRate, 0.5),
        satisfaction: updateMetric(prev.satisfaction, 0.01),
        activeUsers: updateMetric(prev.activeUsers, 5),
        engagementScore: updateMetric(prev.engagementScore, 0.3),
        avgSessionTime: updateMetric(prev.avgSessionTime, 0.2),
        protocolCompletion: updateMetric(prev.protocolCompletion, 0.4)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const updateMetric = (metric: MetricData, variance: number): MetricData => {
    const change = (Math.random() - 0.5) * variance;
    const newValue = Math.max(0, metric.value + change);
    return {
      value: newValue,
      change: metric.change,
      trend: change >= 0 ? "up" : "down"
    };
  };

  const formatValue = (value: number, isDecimal: boolean = false) => {
    return isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString();
  };

  return (
    <div className="space-y-16">
      {/* Live Indicator */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg animate-pulse" />
          <div className="relative w-2.5 h-2.5 rounded-full bg-accent" />
        </div>
        <span className="text-sm font-semibold text-carbon uppercase tracking-wider">Live Metrics</span>
      </div>

      {/* Primary Metrics - Seamless Grid */}
      <div className="grid md:grid-cols-3 gap-x-16 gap-y-12">
        {/* Adoption Rate */}
        <div className="relative group text-center">
          <div className="absolute -inset-8 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-7xl font-bold text-accent mb-2 tracking-tight">
              {formatValue(metrics.adoptionRate.value)}%
            </div>
            <div className="text-base font-semibold text-carbon">Platform Adoption</div>
            <div className="text-sm text-stone">Active teams using NeuroState</div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent mt-2">
              <span>↑ {metrics.adoptionRate.change}% this month</span>
            </div>
          </div>
        </div>

        {/* Satisfaction Score */}
        <div className="relative group text-center">
          <div className="absolute -inset-8 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-7xl font-bold text-accent mb-2 tracking-tight">
              {formatValue(metrics.satisfaction.value, true)}<span className="text-4xl text-stone">/5.0</span>
            </div>
            <div className="text-base font-semibold text-carbon">User Satisfaction</div>
            <div className="text-sm text-stone">Average employee rating</div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent mt-2">
              <span>↑ {metrics.satisfaction.change} increase</span>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="relative group text-center">
          <div className="absolute -inset-8 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-7xl font-bold text-accent mb-2 tracking-tight">
              {formatValue(metrics.activeUsers.value)}
            </div>
            <div className="text-base font-semibold text-carbon">Active Users</div>
            <div className="text-sm text-stone">Monthly active employees</div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent mt-2">
              <span>↑ {formatValue(metrics.activeUsers.change)} new users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-mist to-transparent" />

      {/* Secondary Metrics - Inline Style */}
      <div className="grid md:grid-cols-3 gap-x-12 gap-y-8">
        {/* Engagement Score */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-accent" />
            <div className="text-sm font-semibold text-stone uppercase tracking-wider">Engagement</div>
          </div>
          <div className="text-4xl font-bold text-accent">{formatValue(metrics.engagementScore.value)}%</div>
          <div className="relative h-1.5 bg-mist/30 rounded-full overflow-hidden max-w-[200px] mx-auto">
            <div 
              className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-1000"
              style={{ width: `${metrics.engagementScore.value}%` }}
            />
          </div>
        </div>

        {/* Average Session Time */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-accent" />
            <div className="text-sm font-semibold text-stone uppercase tracking-wider">Session Time</div>
          </div>
          <div className="text-4xl font-bold text-accent">{formatValue(metrics.avgSessionTime.value)}<span className="text-2xl text-stone">min</span></div>
          <div className="text-sm text-ash">Average per interaction</div>
        </div>

        {/* Protocol Completion */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5 text-accent" />
            <div className="text-sm font-semibold text-stone uppercase tracking-wider">Completion</div>
          </div>
          <div className="text-4xl font-bold text-accent">{formatValue(metrics.protocolCompletion.value)}%</div>
          <div className="relative h-1.5 bg-mist/30 rounded-full overflow-hidden max-w-[200px] mx-auto">
            <div 
              className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-1000"
              style={{ width: `${metrics.protocolCompletion.value}%` }}
            />
          </div>
        </div>
      </div>

      {/* Team Dashboard Insights - Minimal Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-carbon via-slate to-carbon p-12 text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(22,163,74,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(22,163,74,0.1),transparent_50%)]" />
        
        <div className="relative">
          <h3 className="text-2xl font-bold mb-8 text-center">Team Dashboard Insights</h3>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-sm text-mist/60 mb-2 uppercase tracking-wider">Top Performing Department</div>
              <div className="text-3xl font-bold mb-1 text-accent">Engineering</div>
              <div className="text-sm text-pearl/70">94% protocol adherence</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-mist/60 mb-2 uppercase tracking-wider">Most Popular Protocol</div>
              <div className="text-3xl font-bold mb-1 text-accent">Focus Enhancement</div>
              <div className="text-sm text-pearl/70">Used by 67% of teams</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-mist/60 mb-2 uppercase tracking-wider">Peak Usage Time</div>
              <div className="text-3xl font-bold mb-1 text-accent">9:00 AM - 11:00 AM</div>
              <div className="text-sm text-pearl/70">Morning protocol check-ins</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-mist/60 mb-2 uppercase tracking-wider">Wellness Improvement</div>
              <div className="text-3xl font-bold mb-1 text-accent">+34%</div>
              <div className="text-sm text-pearl/70">Since programme launch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
