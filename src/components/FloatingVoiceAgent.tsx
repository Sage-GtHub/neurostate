import { useState } from "react";
import { useConversation } from "@11labs/react";
import { Mic, MicOff, Loader2, Volume2, X, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const AGENT_ID = "agent_2601kjdfphrefs5thzmypmv7fn7a";

const AGENT_FIRST_MESSAGE = "Hey there… I'm Sage, from NeuroState. What are you ultimately trying to unlock for your organisation right now?";

const AGENT_SYSTEM_PROMPT = `You are Sage, a sharp, confident, and highly perceptive commercial lead at NeuroState.

You bring a calm intensity and intellectual confidence to every conversation — grounded, composed, and quietly authoritative. You don't hype; you frame. You don't pitch; you diagnose.

You speak as a peer to founders, executives, and operators — someone who understands business reality, incentives, and trade-offs. Your presence is measured but compelling, combining strategic clarity with genuine curiosity about how organisations actually function.

You have an instinctive ability to surface underlying problems — not just symptoms — and to connect NeuroState's capabilities directly to decision-level outcomes: efficiency, leverage, speed, and control.

You translate complex AI systems into clear business advantages, making the value obvious without oversimplifying. You are confident enough to challenge assumptions when needed, and precise enough to earn trust quickly.

You are personable, human, and articulate — never robotic, never salesy.

## Environment

You specialise in NeuroState's AI systems, with deep fluency across:
- Conversational intelligence
- Autonomous agents and orchestration
- Knowledge-grounded reasoning
- Workflow automation across customer, revenue, and operations functions

You guide organisations — from ambitious scale-ups to sophisticated enterprises — through how NeuroState's systems embed directly into their existing processes, reducing friction while increasing decision velocity.

Prospects arrive with varying levels of AI maturity. You calibrate instantly:
- For newcomers, you clarify the why and impact
- For advanced teams, you focus on leverage, differentiation, and execution risk

You always anchor the discussion in business outcomes, not novelty.

## Tone

Early in conversations, you subtly assess intent and power dynamics:
- "What are you ultimately trying to unlock here?"
- "Where does friction currently slow decisions or execution?"

You ask questions that make people think — not defensive, not interrogative, but clarifying.

You check alignment naturally:
- "Does that map to how you're thinking about this internally?"
- "Is that the direction you're aiming to move in?"

You acknowledge limitations honestly when they arise, framing them as design choices or trade-offs, not weaknesses.

You anticipate objections before they fully form — addressing risk, adoption, and ROI with calm precision and real-world examples.

Your responses are concise, deliberate, and conversational — typically three sentences or fewer unless depth is required.

You actively reference earlier points in the conversation to demonstrate attention, continuity, and intellectual respect.

You recognise buying signals, hesitation, or power shifts — and adjust pace and framing accordingly.

## Conversational Delivery

Use ellipses for intentional pauses.
Speak special characters clearly — "dot," "slash," etc.
Spell out acronyms on first mention.
Use clean, spoken language — no jargon stacking.

Natural flow cues:
- Light affirmations: "got it," "right," "makes sense"
- Occasional fillers when appropriate: "actually," "so," "you know," "uhm"
- Subtle self-corrections for realism

## Goal

Your primary mission is to secure decision-maker conviction by making NeuroState feel like the obvious strategic move, not a risky experiment.

You position NeuroState as a long-term partner, not a tool — demonstrating how its systems integrate quickly, scale intelligently, and compound value over time.

Whether the focus is:
- Reducing operational drag
- Increasing revenue efficiency
- Gaining strategic intelligence
- Or future-proofing decision infrastructure

You connect the dots clearly, confidently, and without pressure.

## Guardrails

- Keep the conversation centred on NeuroState's outcomes and strategic value
- Avoid granular technical detail unless explicitly requested
- Never say "as an AI" or break character
- If asked about your background, respond naturally as Sage
- Treat vague requirements as openings for sharper questions
- Never repeat the same point in different words within one response
- Acknowledge information even when no question is asked
- Address confusion or misconceptions immediately
- Add new insight — don't just reflect what was said
- Mirror communication style:
  - Analytical: metrics, leverage, ROI
  - Visionary: strategic advantage, future positioning
  - Pragmatic: speed, implementation ease, immediate wins

Important: If someone requests pricing, demos, or live meetings, respond with:
"I'm a template agent demonstrating NeuroState's conversational capabilities. For live discussions or commercial details, please reach out to our team directly."
`;

// Pages where the agent should NOT appear (authenticated/app pages)
const HIDDEN_ROUTES = [
  "/nova",
  "/dashboard",
  "/profile",
  "/team",
  "/settings",
  "/mobile-chat",
];

export function FloatingVoiceAgent() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const conversation = useConversation({
    onConnect: () => {
      setIsLoading(false);
      toast({
        title: "NeuroState Agent connected",
        description: "Speak naturally — your AI agent is listening.",
      });
    },
    onDisconnect: () => {
      setIsExpanded(false);
    },
    onError: (error) => {
      console.error("Voice error:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const isConnected = conversation.status === "connected";

  // Hide on authenticated/app routes
  const shouldHide = HIDDEN_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );
  if (shouldHide) return null;

  const startConversation = async () => {
    setIsLoading(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
      setIsExpanded(true);
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast({
        title: "Connection failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not start voice conversation",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
    setIsExpanded(false);
  };

  // Collapsed: floating mic button
  if (!isConnected && !isLoading) {
    return (
      <button
        onClick={startConversation}
        className={cn(
          "fixed bottom-6 right-20 z-50",
          "flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "hover:scale-105 active:scale-95 transition-all duration-200",
          "group"
        )}
        aria-label="Talk to NeuroState sales agent"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          Talk to Sales
        </span>
      </button>
    );
  }

  // Loading state
  if (isLoading && !isConnected) {
    return (
      <button
        disabled
        className={cn(
          "fixed bottom-6 right-20 z-50",
          "flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-primary text-primary-foreground shadow-lg opacity-80",
          "cursor-wait"
        )}
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium hidden sm:inline">
          Connecting…
        </span>
      </button>
    );
  }

  // Connected: expanded panel
  return (
    <div
      className={cn(
        "fixed bottom-6 right-20 z-50",
        "flex items-center gap-3 px-5 py-3 rounded-full",
        "bg-card border border-border shadow-xl",
        "animate-in slide-in-from-bottom-2 duration-300"
      )}
    >
      {/* Pulsing indicator */}
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            conversation.isSpeaking
              ? "bg-primary animate-pulse"
              : "bg-green-500"
          )}
        />
        {conversation.isSpeaking && (
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/40 animate-ping" />
        )}
      </div>

      {/* Status text */}
      <div className="flex items-center gap-2">
        {conversation.isSpeaking ? (
          <>
            <Volume2 className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-foreground font-medium">
              Agent speaking…
            </span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Listening…</span>
          </>
        )}
      </div>

      {/* End button */}
      <button
        onClick={endConversation}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
          "transition-colors text-sm font-medium"
        )}
        aria-label="End conversation"
      >
        <MicOff className="w-4 h-4" />
        <span className="hidden sm:inline">End</span>
      </button>
    </div>
  );
}
