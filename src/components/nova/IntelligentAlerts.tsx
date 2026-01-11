import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  TrendingDown, 
  Brain, 
  Zap, 
  Users, 
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  Target
} from 'lucide-react';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { formatDistanceToNow } from 'date-fns';

interface AlertAction {
  label: string;
  action: () => void;
  variant?: 'default' | 'outline';
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'burnout_alert':
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case 'predictive_insight':
      return <Brain className="h-5 w-5 text-primary" />;
    case 'autonomous_nudge':
      return <Zap className="h-5 w-5 text-amber-500" />;
    case 'energy_prediction':
      return <TrendingDown className="h-5 w-5 text-orange-500" />;
    case 'engagement_warning':
      return <Users className="h-5 w-5 text-blue-500" />;
    default:
      return <Target className="h-5 w-5 text-muted-foreground" />;
  }
};

const getAlertBgClass = (type: string) => {
  switch (type) {
    case 'burnout_alert':
      return 'bg-destructive/10 border-destructive/20';
    case 'predictive_insight':
      return 'bg-primary/10 border-primary/20';
    case 'autonomous_nudge':
      return 'bg-amber-500/10 border-amber-500/20';
    default:
      return 'bg-muted/50 border-border';
  }
};

const getPriorityBadge = (type: string) => {
  switch (type) {
    case 'burnout_alert':
      return <Badge variant="destructive" className="text-xs">Critical</Badge>;
    case 'predictive_insight':
      return <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">Predictive</Badge>;
    case 'autonomous_nudge':
      return <Badge variant="outline" className="text-xs">Nudge</Badge>;
    default:
      return null;
  }
};

export function IntelligentAlerts() {
  const { activities, markAsRead, deleteActivity, loading } = useActivityFeed();

  // Filter for intelligent alerts only
  const intelligentAlerts = activities.filter(
    (a) => ['burnout_alert', 'predictive_insight', 'autonomous_nudge'].includes(a.activity_type)
  );

  const handleDismiss = async (id: string) => {
    await markAsRead(id);
    await deleteActivity(id);
  };

  const handleAcknowledge = async (id: string) => {
    await markAsRead(id);
  };

  if (loading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            Intelligent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-muted/50 animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-primary" />
          Intelligent Alerts
          {intelligentAlerts.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {intelligentAlerts.filter((a) => !a.is_read).length} new
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="popLayout">
          {intelligentAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-muted-foreground"
            >
              <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-primary/40" />
              <p className="text-sm">All clear! No alerts at this time.</p>
              <p className="text-xs mt-1">AI is monitoring team patterns</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {intelligentAlerts.slice(0, 5).map((alert) => (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`relative p-4 rounded-lg border ${getAlertBgClass(alert.activity_type)} ${
                    !alert.is_read ? 'ring-1 ring-primary/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getAlertIcon(alert.activity_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getPriorityBadge(alert.activity_type)}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm mb-1 line-clamp-1">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {alert.description}
                      </p>
                      
                      {/* Recommended Actions */}
                      {alert.metadata?.recommended_actions && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-xs font-medium mb-2">Recommended Actions:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {(alert.metadata.recommended_actions as string[]).slice(0, 2).map((action, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <ChevronRight className="h-3 w-3" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs"
                          onClick={() => handleAcknowledge(alert.id)}
                        >
                          Acknowledge
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 text-xs text-muted-foreground"
                          onClick={() => handleDismiss(alert.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
