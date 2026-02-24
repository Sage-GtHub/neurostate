import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FlaskConical, Plus, Minus, ArrowUp, ArrowDown, Minus as Stable, 
  Loader2, Trash2, AlertTriangle, CheckCircle, TrendingUp, Lightbulb, X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SupplementChange {
  name: string;
  current_dose: string;
  proposed_dose: string;
}

interface TimingChange {
  item: string;
  current_time: string;
  proposed_time: string;
}

interface Prediction {
  metric: string;
  current_value: number;
  predicted_7d: number;
  predicted_30d: number;
  unit: string;
  direction: "up" | "down" | "stable";
  confidence: number;
}

interface SimulationResult {
  predictions: Prediction[];
  overall_impact: "positive" | "negative" | "mixed" | "neutral";
  impact_score: number;
  summary: string;
  risks: string[];
  recommendations: string[];
}

export function RealTimeSimulation() {
  const { user } = useAuth();
  const [supplements, setSupplements] = useState<SupplementChange[]>([
    { name: "Magnesium", current_dose: "200mg", proposed_dose: "400mg" }
  ]);
  const [timingChanges, setTimingChanges] = useState<TimingChange[]>([]);
  const [additions, setAdditions] = useState<string[]>([]);
  const [removals, setRemovals] = useState<string[]>([]);
  const [newAddition, setNewAddition] = useState("");
  const [newRemoval, setNewRemoval] = useState("");
  const [loading, setLoading] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const addSupplement = () => {
    setSupplements([...supplements, { name: "", current_dose: "", proposed_dose: "" }]);
  };

  const removeSupplement = (i: number) => {
    setSupplements(supplements.filter((_, idx) => idx !== i));
  };

  const updateSupplement = (i: number, field: keyof SupplementChange, value: string) => {
    const updated = [...supplements];
    updated[i][field] = value;
    setSupplements(updated);
  };

  const addTimingChange = () => {
    setTimingChanges([...timingChanges, { item: "", current_time: "", proposed_time: "" }]);
  };

  const removeTimingChange = (i: number) => {
    setTimingChanges(timingChanges.filter((_, idx) => idx !== i));
  };

  const updateTiming = (i: number, field: keyof TimingChange, value: string) => {
    const updated = [...timingChanges];
    updated[i][field] = value;
    setTimingChanges(updated);
  };

  const handleAddAddition = () => {
    if (newAddition.trim()) {
      setAdditions([...additions, newAddition.trim()]);
      setNewAddition("");
    }
  };

  const handleAddRemoval = () => {
    if (newRemoval.trim()) {
      setRemovals([...removals, newRemoval.trim()]);
      setNewRemoval("");
    }
  };

  const runSimulation = async () => {
    const validSupps = supplements.filter(s => s.name && s.proposed_dose);
    const validTimings = timingChanges.filter(t => t.item && t.proposed_time);
    
    if (validSupps.length === 0 && validTimings.length === 0 && additions.length === 0 && removals.length === 0) {
      toast.error("Add at least one change to simulate");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('simulate-protocol', {
        body: {
          changes: {
            supplement_adjustments: validSupps,
            timing_changes: validTimings,
            additions,
            removals,
          }
        }
      });

      if (error) throw error;
      setResult(data);
    } catch (err: any) {
      toast.error(err.message || "Simulation failed");
    } finally {
      setLoading(false);
    }
  };

  const getDirectionIcon = (dir: string) => {
    if (dir === "up") return <ArrowUp className="w-4 h-4 text-accent" />;
    if (dir === "down") return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Stable className="w-4 h-4 text-ash" />;
  };

  const getDelta = (current: number, predicted: number) => {
    const diff = predicted - current;
    if (diff > 0) return `+${diff.toFixed(0)}`;
    return diff.toFixed(0);
  };

  const getImpactColor = (impact: string) => {
    if (impact === "positive") return "text-accent";
    if (impact === "negative") return "text-red-500";
    if (impact === "mixed") return "text-orange-500";
    return "text-ash";
  };

  return (
    <Card className="border-mist/30 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-5 h-5 text-accent" />
              <h2 className="text-h3 font-semibold text-carbon">
                Preview Changes
              </h2>
            </div>
            <p className="text-body-sm text-ash">
              See how protocol changes could affect your body before you commit
            </p>
          </div>
        </div>

        {/* Supplement dose changes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-carbon">Dose changes</h3>
            <Button variant="ghost" size="sm" onClick={addSupplement} className="gap-1 text-xs">
              <Plus className="w-3 h-3" /> Add
            </Button>
          </div>
          <div className="space-y-2">
            {supplements.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input 
                  placeholder="Supplement" 
                  value={s.name} 
                  onChange={e => updateSupplement(i, "name", e.target.value)}
                  className="flex-1 text-sm h-9"
                />
                <Input 
                  placeholder="Now" 
                  value={s.current_dose} 
                  onChange={e => updateSupplement(i, "current_dose", e.target.value)}
                  className="w-20 text-sm h-9"
                />
                <span className="text-ash text-xs">→</span>
                <Input 
                  placeholder="New" 
                  value={s.proposed_dose} 
                  onChange={e => updateSupplement(i, "proposed_dose", e.target.value)}
                  className="w-20 text-sm h-9"
                />
                <Button variant="ghost" size="sm" onClick={() => removeSupplement(i)} className="h-9 w-9 p-0">
                  <Trash2 className="w-3.5 h-3.5 text-ash" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Timing changes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-carbon">Timing changes</h3>
            <Button variant="ghost" size="sm" onClick={addTimingChange} className="gap-1 text-xs">
              <Plus className="w-3 h-3" /> Add
            </Button>
          </div>
          {timingChanges.map((t, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <Input 
                placeholder="Item" 
                value={t.item} 
                onChange={e => updateTiming(i, "item", e.target.value)}
                className="flex-1 text-sm h-9"
              />
              <Input 
                placeholder="Now" 
                value={t.current_time} 
                onChange={e => updateTiming(i, "current_time", e.target.value)}
                className="w-24 text-sm h-9"
              />
              <span className="text-ash text-xs">→</span>
              <Input 
                placeholder="New" 
                value={t.proposed_time} 
                onChange={e => updateTiming(i, "proposed_time", e.target.value)}
                className="w-24 text-sm h-9"
              />
              <Button variant="ghost" size="sm" onClick={() => removeTimingChange(i)} className="h-9 w-9 p-0">
                <Trash2 className="w-3.5 h-3.5 text-ash" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add / Remove items */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-carbon mb-2">Add to protocol</h3>
            <div className="flex gap-2 mb-2">
              <Input 
                placeholder="e.g. L-Theanine 200mg" 
                value={newAddition} 
                onChange={e => setNewAddition(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddAddition()}
                className="text-sm h-9"
              />
              <Button variant="outline" size="sm" onClick={handleAddAddition} className="h-9">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {additions.map((a, i) => (
                <Badge key={i} variant="secondary" className="gap-1 text-xs">
                  {a}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setAdditions(additions.filter((_, idx) => idx !== i))} />
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-carbon mb-2">Remove from protocol</h3>
            <div className="flex gap-2 mb-2">
              <Input 
                placeholder="e.g. Melatonin" 
                value={newRemoval} 
                onChange={e => setNewRemoval(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddRemoval()}
                className="text-sm h-9"
              />
              <Button variant="outline" size="sm" onClick={handleAddRemoval} className="h-9">
                <Minus className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {removals.map((r, i) => (
                <Badge key={i} variant="destructive" className="gap-1 text-xs">
                  {r}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setRemovals(removals.filter((_, idx) => idx !== i))} />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={runSimulation} disabled={loading} className="w-full gap-2 mb-6">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FlaskConical className="w-4 h-4" />}
          {loading ? "Simulating…" : "Run Simulation"}
        </Button>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Overall Impact */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-pearl/50 to-ivory border border-mist/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {result.overall_impact === "positive" ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : result.overall_impact === "negative" ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  )}
                  <h3 className="font-semibold text-carbon">
                    Overall: <span className={getImpactColor(result.overall_impact)}>
                      {result.overall_impact === "positive" ? "Looks good" : 
                       result.overall_impact === "negative" ? "Be careful" : 
                       result.overall_impact === "mixed" ? "Mixed results" : "Minimal change"}
                    </span>
                  </h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  Impact score: {result.impact_score}/100
                </Badge>
              </div>
              <p className="text-sm text-ash">{result.summary}</p>
            </div>

            {/* Metric Predictions */}
            <div>
              <h3 className="text-sm font-medium text-carbon mb-3">Predicted changes</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.predictions.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-pearl/30 border border-mist/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-carbon">{p.metric}</span>
                      {getDirectionIcon(p.direction)}
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-carbon">{p.current_value}</span>
                      <span className="text-xs text-ash">{p.unit} now</span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <div>
                        <span className="text-ash">7 days: </span>
                        <span className={p.predicted_7d > p.current_value ? "text-accent font-medium" : p.predicted_7d < p.current_value ? "text-red-500 font-medium" : "text-ash"}>
                          {getDelta(p.current_value, p.predicted_7d)}
                        </span>
                      </div>
                      <div>
                        <span className="text-ash">30 days: </span>
                        <span className={p.predicted_30d > p.current_value ? "text-accent font-medium" : p.predicted_30d < p.current_value ? "text-red-500 font-medium" : "text-ash"}>
                          {getDelta(p.current_value, p.predicted_30d)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-ash">
                      Confidence: {p.confidence}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            {result.risks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-carbon mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-orange-500" /> Things to watch
                </h3>
                <ul className="space-y-1.5">
                  {result.risks.map((r, i) => (
                    <li key={i} className="text-sm text-ash flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-carbon mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-accent" /> Suggestions
                </h3>
                <ul className="space-y-1.5">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-ash flex items-start gap-2">
                      <span className="text-accent mt-1">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Commit & Track button */}
            <Button
              onClick={async () => {
                if (!user) { toast.error("Please sign in"); return; }
                setCommitting(true);
                try {
                  const validSupps = supplements.filter(s => s.name && s.proposed_dose);
                  const title = validSupps.length > 0
                    ? validSupps.map(s => `${s.name} ${s.current_dose}→${s.proposed_dose}`).join(', ')
                    : additions.length > 0
                    ? `Added ${additions.join(', ')}`
                    : 'Protocol change';

                  const { error } = await supabase
                    .from('protocol_interventions' as any)
                    .insert({
                      user_id: user.id,
                      title,
                      intervention_type: validSupps.length > 0 ? 'dose_change' : additions.length > 0 ? 'addition' : 'timing_change',
                      changes: {
                        supplement_adjustments: validSupps,
                        timing_changes: timingChanges.filter(t => t.item && t.proposed_time),
                        additions,
                        removals,
                      },
                      predicted_outcomes: result,
                      status: 'active',
                      review_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    } as any);

                  if (error) throw error;
                  toast.success("Tracking this change — review in 7 days");
                  setResult(null);
                } catch (err: any) {
                  toast.error(err.message || "Failed to save");
                } finally {
                  setCommitting(false);
                }
              }}
              disabled={committing}
              variant="outline"
              className="w-full gap-2 border-accent/30 text-accent hover:bg-accent/5"
            >
              {committing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              {committing ? "Saving…" : "Commit & Track This Change"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
