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
    <div className="space-y-8">
      {/* Live Indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-md animate-pulse" />
          <div className="relative w-3 h-3 rounded-full bg-accent" />
        </div>
        <span className="text-sm font-semibold text-stone uppercase tracking-wider">Live Metrics</span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Adoption Rate */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-gradient-to-br from-ivory to-pearl rounded-3xl p-8 shadow-soft border border-mist/30">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-accent" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                <span>↑ {metrics.adoptionRate.change}%</span>
              </div>
            </div>
            <div className="text-5xl font-bold text-carbon mb-2">{formatValue(metrics.adoptionRate.value)}%</div>
            <div className="text-sm font-semibold text-stone">Platform Adoption</div>
            <div className="text-xs text-ash mt-1">Active teams using NeuroState</div>
          </div>
        </div>

        {/* Satisfaction Score */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-gradient-to-br from-ivory to-pearl rounded-3xl p-8 shadow-soft border border-mist/30">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                <span>↑ {metrics.satisfaction.change}</span>
              </div>
            </div>
            <div className="text-5xl font-bold text-carbon mb-2">{formatValue(metrics.satisfaction.value, true)}/5.0</div>
            <div className="text-sm font-semibold text-stone">User Satisfaction</div>
            <div className="text-xs text-ash mt-1">Average employee rating</div>
          </div>
        </div>

        {/* Active Users */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-gradient-to-br from-ivory to-pearl rounded-3xl p-8 shadow-soft border border-mist/30">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                <span>↑ {formatValue(metrics.activeUsers.change)}</span>
              </div>
            </div>
            <div className="text-5xl font-bold text-carbon mb-2">{formatValue(metrics.activeUsers.value)}</div>
            <div className="text-sm font-semibold text-stone">Active Users</div>
            <div className="text-xs text-ash mt-1">Monthly active employees</div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Engagement Score */}
        <div className="bg-ivory rounded-2xl p-6 border border-mist/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-carbon">{formatValue(metrics.engagementScore.value)}%</div>
              <div className="text-xs text-stone">Engagement Score</div>
            </div>
          </div>
          <div className="relative h-2 bg-mist rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-1000"
              style={{ width: `${metrics.engagementScore.value}%` }}
            />
          </div>
        </div>

        {/* Average Session Time */}
        <div className="bg-ivory rounded-2xl p-6 border border-mist/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-carbon">{formatValue(metrics.avgSessionTime.value)}m</div>
              <div className="text-xs text-stone">Avg Session Time</div>
            </div>
          </div>
          <div className="text-xs text-ash">Time per interaction</div>
        </div>

        {/* Protocol Completion */}
        <div className="bg-ivory rounded-2xl p-6 border border-mist/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-carbon">{formatValue(metrics.protocolCompletion.value)}%</div>
              <div className="text-xs text-stone">Protocol Completion</div>
            </div>
          </div>
          <div className="relative h-2 bg-mist rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-1000"
              style={{ width: `${metrics.protocolCompletion.value}%` }}
            />
          </div>
        </div>
      </div>

      {/* Team Dashboard Preview */}
      <div className="bg-gradient-to-br from-carbon to-slate rounded-3xl p-8 text-ivory">
        <h3 className="text-2xl font-bold mb-6">Team Dashboard Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-mist mb-2">Top Performing Department</div>
            <div className="text-3xl font-bold mb-1">Engineering</div>
            <div className="text-sm text-pearl">94% protocol adherence</div>
          </div>
          <div>
            <div className="text-sm text-mist mb-2">Most Popular Protocol</div>
            <div className="text-3xl font-bold mb-1">Focus Enhancement</div>
            <div className="text-sm text-pearl">Used by 67% of teams</div>
          </div>
          <div>
            <div className="text-sm text-mist mb-2">Peak Usage Time</div>
            <div className="text-3xl font-bold mb-1">9:00 AM - 11:00 AM</div>
            <div className="text-sm text-pearl">Morning protocol check-ins</div>
          </div>
          <div>
            <div className="text-sm text-mist mb-2">Wellness Improvement</div>
            <div className="text-3xl font-bold mb-1">+34%</div>
            <div className="text-sm text-pearl">Since program launch</div>
          </div>
        </div>
      </div>
    </div>
  );
}
