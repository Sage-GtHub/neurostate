import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PoundSterling,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle2,
  Clock,
  BarChart3,
  ArrowUpRight,
  Zap,
  Users,
  Brain,
  Calendar
} from 'lucide-react';

interface InterventionResult {
  id: string;
  title: string;
  team: string;
  type: string;
  status: 'completed' | 'in_progress' | 'pending';
  startedAt: string;
  completedAt?: string;
  estimatedValue: number;
  actualValue: number;
  signalChange: string;
  metrics: {
    before: { cci: number; burnout: number };
    after: { cci: number; burnout: number };
  };
  roi: number;
}

const interventionResults: InterventionResult[] = [
  {
    id: '1',
    title: 'Workload timing adjustment',
    team: 'Sales',
    type: 'schedule',
    status: 'completed',
    startedAt: '2025-12-15',
    completedAt: '2025-12-29',
    estimatedValue: 15000,
    actualValue: 17400,
    signalChange: '+11% focus',
    metrics: {
      before: { cci: 62, burnout: 45 },
      after: { cci: 73, burnout: 34 },
    },
    roi: 116,
  },
  {
    id: '2',
    title: 'Recovery day scheduled',
    team: 'Engineering',
    type: 'recovery',
    status: 'completed',
    startedAt: '2025-12-08',
    completedAt: '2025-12-29',
    estimatedValue: 20000,
    actualValue: 23600,
    signalChange: '+18% readiness',
    metrics: {
      before: { cci: 58, burnout: 52 },
      after: { cci: 76, burnout: 34 },
    },
    roi: 118,
  },
  {
    id: '3',
    title: 'Meeting load reduction',
    team: 'Product',
    type: 'schedule',
    status: 'in_progress',
    startedAt: '2026-01-04',
    estimatedValue: 12000,
    actualValue: 8900,
    signalChange: '+9% cognitive capacity',
    metrics: {
      before: { cci: 65, burnout: 41 },
      after: { cci: 74, burnout: 38 },
    },
    roi: 74,
  },
  {
    id: '4',
    title: 'Focus time blocks',
    team: 'Customer Success',
    type: 'productivity',
    status: 'in_progress',
    startedAt: '2026-01-06',
    estimatedValue: 18000,
    actualValue: 0,
    signalChange: 'Tracking...',
    metrics: {
      before: { cci: 55, burnout: 58 },
      after: { cci: 55, burnout: 58 },
    },
    roi: 0,
  },
];

export function InterventionROITracker() {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('quarter');

  const stats = useMemo(() => {
    const completed = interventionResults.filter(i => i.status === 'completed');
    const totalEstimated = interventionResults.reduce((sum, i) => sum + i.estimatedValue, 0);
    const totalActual = completed.reduce((sum, i) => sum + i.actualValue, 0);
    const avgROI = completed.length > 0
      ? Math.round(completed.reduce((sum, i) => sum + i.roi, 0) / completed.length)
      : 0;
    const avgCCIImprovement = completed.length > 0
      ? Math.round(completed.reduce((sum, i) => sum + (i.metrics.after.cci - i.metrics.before.cci), 0) / completed.length)
      : 0;
    const avgBurnoutReduction = completed.length > 0
      ? Math.round(completed.reduce((sum, i) => sum + (i.metrics.before.burnout - i.metrics.after.burnout), 0) / completed.length)
      : 0;

    return {
      totalInterventions: interventionResults.length,
      completed: completed.length,
      inProgress: interventionResults.filter(i => i.status === 'in_progress').length,
      totalEstimated,
      totalActual,
      avgROI,
      avgCCIImprovement,
      avgBurnoutReduction,
    };
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `£${(value / 1000).toFixed(1)}k`;
    return `£${value}`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <PoundSterling className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Value Recovered</span>
            </div>
            <div className="text-2xl font-semibold text-green-500">
              {formatCurrency(stats.totalActual)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              of {formatCurrency(stats.totalEstimated)} estimated
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Avg ROI</span>
            </div>
            <div className="text-2xl font-semibold text-primary">
              {stats.avgROI}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              across {stats.completed} completed
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Brain className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Avg CCI Gain</span>
            </div>
            <div className="text-2xl font-semibold text-primary">
              +{stats.avgCCIImprovement}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              points per intervention
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Target className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Burnout Reduced</span>
            </div>
            <div className="text-2xl font-semibold text-green-500">
              -{stats.avgBurnoutReduction}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              average reduction
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Intervention List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Intervention Outcomes
            </CardTitle>
            <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as typeof timeframe)}>
              <TabsList className="h-8">
                <TabsTrigger value="month" className="text-xs px-3 h-6">Month</TabsTrigger>
                <TabsTrigger value="quarter" className="text-xs px-3 h-6">Quarter</TabsTrigger>
                <TabsTrigger value="year" className="text-xs px-3 h-6">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interventionResults.map((intervention, index) => (
              <motion.div
                key={intervention.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  intervention.status === 'completed'
                    ? 'bg-green-500/5 border-green-500/20'
                    : intervention.status === 'in_progress'
                    ? 'bg-amber-500/5 border-amber-500/20'
                    : 'bg-muted/30 border-border/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {intervention.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="font-medium">{intervention.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {intervention.team}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Started {new Date(intervention.startedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      {intervention.completedAt && (
                        <> • Completed {new Date(intervention.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-500">
                      {formatCurrency(intervention.actualValue)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {intervention.roi > 0 ? `${intervention.roi}% ROI` : 'Tracking...'}
                    </div>
                  </div>
                </div>

                {/* Before/After Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">CCI Score</span>
                      <span className="flex items-center gap-1">
                        <span className="text-muted-foreground">{intervention.metrics.before.cci}</span>
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="font-medium text-green-500">{intervention.metrics.after.cci}</span>
                      </span>
                    </div>
                    <Progress 
                      value={intervention.metrics.after.cci} 
                      className="h-1.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Burnout Risk</span>
                      <span className="flex items-center gap-1">
                        <span className="text-muted-foreground">{intervention.metrics.before.burnout}%</span>
                        <TrendingDown className="h-3 w-3 text-green-500" />
                        <span className="font-medium text-green-500">{intervention.metrics.after.burnout}%</span>
                      </span>
                    </div>
                    <Progress 
                      value={100 - intervention.metrics.after.burnout} 
                      className="h-1.5"
                    />
                  </div>
                </div>

                {/* Signal Change */}
                <div className="mt-3 pt-3 border-t border-border/50">
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-primary/10 text-primary"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {intervention.signalChange}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Impact Summary */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium mb-1">Total Business Impact</div>
                <div className="text-xs text-muted-foreground">
                  {stats.completed} interventions completed this quarter
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(stats.totalActual)}
                </div>
                <div className="text-xs text-green-500 flex items-center justify-end gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stats.avgROI}% average ROI
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
