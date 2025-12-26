import { useState } from "react";
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Target,
  Zap,
  Clock,
  Plus,
  Bell,
  BarChart3,
  Sliders,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataSource {
  name: string;
  connected: boolean;
  lastSync?: string;
}

interface NovaResponseCardProps {
  content: string;
  timestamp?: Date;
  dataSources?: DataSource[];
  baselineDays?: number;
  confidence?: "high" | "medium" | "low";
  isStreaming?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
  isCopied?: boolean;
  showActions?: boolean;
}

// Parse structured response from Nova
function parseNovaResponse(content: string): {
  signal: string | null;
  forecast: string | null;
  actions: string[];
  rawContent: string;
  hasStructure: boolean;
} {
  const signalMatch = content.match(/\*\*SIGNAL[:\s]*\*\*\s*([\s\S]*?)(?=\*\*FORECAST|\*\*ACTION|$)/i);
  const forecastMatch = content.match(/\*\*FORECAST[:\s]*\*\*\s*([\s\S]*?)(?=\*\*ACTION|$)/i);
  const actionMatch = content.match(/\*\*ACTION[S]?[:\s]*\*\*\s*([\s\S]*?)(?=\*\*EXPLAIN|\*\*EVIDENCE|\*\*PROTOCOL|---|\n\n\*\*|$)/i);
  
  const signal = signalMatch ? signalMatch[1].trim() : null;
  const forecast = forecastMatch ? forecastMatch[1].trim() : null;
  
  let actions: string[] = [];
  if (actionMatch) {
    const actionText = actionMatch[1].trim();
    actions = actionText
      .split(/\n/)
      .map(line => line.replace(/^[-•*]\s*/, '').trim())
      .filter(line => line.length > 0 && line.length < 200);
  }
  
  const hasStructure = !!(signal || forecast || actions.length > 0);
  
  return {
    signal,
    forecast,
    actions,
    rawContent: content,
    hasStructure
  };
}

// Extract hidden sections (explain, evidence, protocol options)
function extractExpandableSections(content: string): {
  explain: string | null;
  evidence: string | null;
  protocolOptions: string | null;
} {
  const explainMatch = content.match(/\*\*EXPLAIN[:\s]*\*\*\s*([\s\S]*?)(?=\*\*EVIDENCE|\*\*PROTOCOL|$)/i);
  const evidenceMatch = content.match(/\*\*EVIDENCE[:\s]*\*\*\s*([\s\S]*?)(?=\*\*PROTOCOL|$)/i);
  const protocolMatch = content.match(/\*\*PROTOCOL[:\s]*\*\*\s*([\s\S]*?)$/i);
  
  return {
    explain: explainMatch ? explainMatch[1].trim() : null,
    evidence: evidenceMatch ? evidenceMatch[1].trim() : null,
    protocolOptions: protocolMatch ? protocolMatch[1].trim() : null
  };
}

export function NovaResponseCard({
  content,
  timestamp,
  dataSources,
  baselineDays = 14,
  confidence = "high",
  isStreaming = false,
  onCopy,
  onRegenerate,
  isCopied = false,
  showActions = true
}: NovaResponseCardProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const parsed = parseNovaResponse(content);
  const expandable = extractExpandableSections(content);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case "high": return "text-green-500";
      case "medium": return "text-amber-500";
      case "low": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const connectedSources = dataSources?.filter(d => d.connected) || [];
  const lastSyncTime = connectedSources[0]?.lastSync || "Just now";

  // If no structured format, render as simple text with minimal styling
  if (!parsed.hasStructure) {
    return (
      <div className="space-y-2">
        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        {showActions && content && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onCopy && (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={onCopy}>
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            )}
            {onRegenerate && (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={onRegenerate}>
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="nova-response-card">
      {/* Status Strip */}
      {(dataSources || baselineDays) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground mb-3 pb-3 border-b border-border/30">
          {connectedSources.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="uppercase tracking-wider font-medium">Data sources:</span>
              <div className="flex items-center gap-2">
                {connectedSources.slice(0, 3).map((source, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                    {source.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            <span>Last sync: {lastSyncTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Baseline: {baselineDays} days</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Confidence:</span>
            <span className={cn("font-medium capitalize", getConfidenceColor(confidence))}>{confidence}</span>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg nova-gradient flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium text-foreground">Nova</span>
          <span className="text-[10px] text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Active
          </span>
        </div>
        {timestamp && (
          <span className="text-[10px] text-muted-foreground">{formatTime(timestamp)}</span>
        )}
      </div>

      {/* SIGNAL Section */}
      {parsed.signal && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Signal</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground">{parsed.signal}</p>
        </div>
      )}

      {/* FORECAST Section */}
      {parsed.forecast && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Forecast</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground">{parsed.forecast}</p>
        </div>
      )}

      {/* ACTION Section */}
      {parsed.actions.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3.5 h-3.5 text-green-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Action</span>
          </div>
          <ul className="space-y-1.5">
            {parsed.actions.slice(0, 4).map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-accent mt-0.5">•</span>
                <span className="leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expandable Sections */}
      {(expandable.explain || expandable.evidence || expandable.protocolOptions) && (
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border/30">
          {expandable.explain && (
            <button
              onClick={() => toggleSection('explain')}
              className={cn(
                "text-[11px] px-3 py-1.5 rounded-lg transition-all",
                "border border-border/50 hover:border-accent/50",
                expandedSection === 'explain' 
                  ? "bg-accent/10 text-accent border-accent/30" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Explain reasoning
              {expandedSection === 'explain' ? <ChevronUp className="w-3 h-3 ml-1 inline" /> : <ChevronDown className="w-3 h-3 ml-1 inline" />}
            </button>
          )}
          {expandable.evidence && (
            <button
              onClick={() => toggleSection('evidence')}
              className={cn(
                "text-[11px] px-3 py-1.5 rounded-lg transition-all",
                "border border-border/50 hover:border-accent/50",
                expandedSection === 'evidence' 
                  ? "bg-accent/10 text-accent border-accent/30" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Show evidence
              {expandedSection === 'evidence' ? <ChevronUp className="w-3 h-3 ml-1 inline" /> : <ChevronDown className="w-3 h-3 ml-1 inline" />}
            </button>
          )}
          {expandable.protocolOptions && (
            <button
              onClick={() => toggleSection('protocol')}
              className={cn(
                "text-[11px] px-3 py-1.5 rounded-lg transition-all",
                "border border-border/50 hover:border-accent/50",
                expandedSection === 'protocol' 
                  ? "bg-accent/10 text-accent border-accent/30" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Protocol options
              {expandedSection === 'protocol' ? <ChevronUp className="w-3 h-3 ml-1 inline" /> : <ChevronDown className="w-3 h-3 ml-1 inline" />}
            </button>
          )}
        </div>
      )}

      {/* Expanded Content */}
      {expandedSection && (
        <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/30 text-sm text-foreground/80 leading-relaxed animate-fade-in">
          {expandedSection === 'explain' && expandable.explain}
          {expandedSection === 'evidence' && expandable.evidence}
          {expandedSection === 'protocol' && expandable.protocolOptions}
        </div>
      )}

      {/* One-Tap Actions */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button className="nova-chip">
          <Plus className="w-3 h-3" />
          Add to Protocol
        </button>
        <button className="nova-chip">
          <Bell className="w-3 h-3" />
          Set reminder
        </button>
        <button className="nova-chip">
          <Sliders className="w-3 h-3" />
          Adjust goal
        </button>
        <button className="nova-chip">
          <BarChart3 className="w-3 h-3" />
          View trend
        </button>
      </div>

      {/* Copy/Regenerate Actions */}
      {showActions && (
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-border/20 opacity-0 group-hover:opacity-100 transition-opacity">
          {onCopy && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={onCopy}>
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
          )}
          {onRegenerate && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={onRegenerate}>
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Follow-up question component with multiple choice
interface FollowUpQuestionProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
}

export function NovaFollowUpQuestion({ question, options, onSelect }: FollowUpQuestionProps) {
  return (
    <div className="mt-4 p-4 rounded-xl bg-muted/20 border border-border/30">
      <p className="text-sm font-medium text-foreground mb-3">{question}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(option)}
            className="nova-chip-interactive"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
