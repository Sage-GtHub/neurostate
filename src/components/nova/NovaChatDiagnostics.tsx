import { useState } from "react";
import { Bug, X, ChevronUp, ChevronDown, Circle, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export interface DiagnosticsState {
  requestId: string | null;
  lastError: { message: string; timestamp: Date } | null;
  streamingState: "idle" | "connecting" | "streaming" | "complete" | "error";
  persistenceState: {
    userMessage: "pending" | "saved" | "failed" | null;
    assistantMessage: "pending" | "saved" | "failed" | null;
  };
  threadId: string | null;
  mode: "default" | "focus";
  messageCount: number;
}

interface NovaChatDiagnosticsProps {
  state: DiagnosticsState;
}

function StatusIndicator({ status }: { status: "pending" | "saved" | "failed" | null }) {
  if (status === null) return <Circle className="w-3 h-3 text-foreground/20" />;
  if (status === "pending") return <Loader2 className="w-3 h-3 text-amber-500 animate-spin" />;
  if (status === "saved") return <CheckCircle2 className="w-3 h-3 text-signal-green" />;
  return <XCircle className="w-3 h-3 text-destructive" />;
}

function StreamingIndicator({ state }: { state: DiagnosticsState["streamingState"] }) {
  const colors: Record<DiagnosticsState["streamingState"], string> = {
    idle: "bg-foreground/20",
    connecting: "bg-warning-amber animate-pulse",
    streaming: "bg-signal-blue animate-pulse",
    complete: "bg-signal-green",
    error: "bg-destructive",
  };
  
  const labels: Record<DiagnosticsState["streamingState"], string> = {
    idle: "Idle",
    connecting: "Connecting...",
    streaming: "Streaming",
    complete: "Complete",
    error: "Error",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", colors[state])} />
      <span className="text-[10px] text-foreground/60 font-mono">{labels[state]}</span>
    </div>
  );
}

export function NovaChatDiagnostics({ state }: NovaChatDiagnosticsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-foreground/30 hover:text-foreground/60",
            state.lastError && "text-destructive hover:text-destructive/80"
          )}
          title="Open diagnostics"
        >
          <Bug className="h-3.5 w-3.5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="flex flex-row items-center justify-between pb-2">
          <DrawerTitle className="text-sm font-medium flex items-center gap-2">
            <Bug className="w-4 h-4" />
            Nova Chat Diagnostics
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-4 overflow-y-auto">
          {/* Request Info */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-medium text-foreground/40 uppercase tracking-wider">
              Request Info
            </h3>
            <div className="bg-foreground/5 rounded-lg p-3 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-foreground/50">Request ID</span>
                <span className="text-foreground/80">
                  {state.requestId || <span className="text-foreground/30">—</span>}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/50">Thread ID</span>
                <span className="text-foreground/80 max-w-[140px] truncate">
                  {state.threadId || <span className="text-foreground/30">No thread</span>}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/50">Mode</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[10px]",
                  state.mode === "focus" 
                    ? "bg-amber-500/20 text-amber-400" 
                    : "bg-foreground/10 text-foreground/60"
                )}>
                  {state.mode}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/50">Messages</span>
                <span className="text-foreground/80">{state.messageCount}</span>
              </div>
            </div>
          </div>

          {/* Streaming State */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-medium text-foreground/40 uppercase tracking-wider">
              Streaming State
            </h3>
            <div className="bg-foreground/5 rounded-lg p-3">
              <StreamingIndicator state={state.streamingState} />
            </div>
          </div>

          {/* Persistence State */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-medium text-foreground/40 uppercase tracking-wider">
              Persistence State
            </h3>
            <div className="bg-foreground/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-foreground/50">User message</span>
                <StatusIndicator status={state.persistenceState.userMessage} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-foreground/50">Assistant message</span>
                <StatusIndicator status={state.persistenceState.assistantMessage} />
              </div>
            </div>
          </div>

          {/* Last Error */}
          <div className="space-y-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[10px] font-medium text-foreground/40 uppercase tracking-wider hover:text-foreground/60 transition-colors"
            >
              Last Error
              {isExpanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            {(isExpanded || state.lastError) && (
              <div className={cn(
                "rounded-lg p-3",
                state.lastError ? "bg-red-500/10" : "bg-foreground/5"
              )}>
                {state.lastError ? (
                  <div className="space-y-1">
                    <p className="text-[11px] text-red-400 font-mono break-words">
                      {state.lastError.message}
                    </p>
                    <p className="text-[9px] text-foreground/30">
                      {state.lastError.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-foreground/30">No errors recorded</p>
                )}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
