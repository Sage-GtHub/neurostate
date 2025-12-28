import { useState, useEffect } from "react";
import { Sparkles, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DemoMessage {
  role: "user" | "assistant";
  content: string;
}

const DEMO_CONVERSATIONS = [
  {
    trigger: "HRV Analysis",
    messages: [
      { role: "user" as const, content: "Analyse my HRV data from the past week" },
      { role: "assistant" as const, content: "Your HRV dropped 18% since Monday. Here's what matters:\n\n**The pattern:** Parasympathetic recovery is degrading. Late screen time (avg 11:23pm) is the primary driver.\n\n**The downstream effect:** If this continues, expect focus degradation in 48–72 hours. Cognitive load is trending up while recovery trends down.\n\n**The lever:**\n• Blue light blocking at 9pm tonight\n• 400mg magnesium glycinate, 1hr before bed\n• Tomorrow: Zone 2 only. No intensity.\n\nThis is the intervention point. Ignore the rest." }
    ]
  },
  {
    trigger: "Cognitive Stack",
    messages: [
      { role: "user" as const, content: "I need a supplement stack for deep focus" },
      { role: "assistant" as const, content: "What outcome are we optimising for: sustained attention across long work blocks, or peak intensity for shorter cognitive sprints?\n\nAssuming sustained focus, here's the stack:\n\n**Morning (6-8am):**\n• Lion's Mane 500mg: neurogenesis\n• Alpha-GPC 300mg: acetylcholine precursor\n• Omega-3 2g: membrane fluidity\n\n**On-demand:**\n• L-Theanine 200mg + Caffeine 100mg\n\n**Timeline:** Noticeable at day 5. Full effect at week 4-6.\n\nThe trade-off: Alpha-GPC may cause vivid dreams. If sleep quality degrades, drop it." }
    ]
  },
  {
    trigger: "Recovery",
    messages: [
      { role: "user" as const, content: "Just finished a heavy leg session. What now?" },
      { role: "assistant" as const, content: "Your HRV suggests 48hr recovery for this intensity. Here's the protocol:\n\n**0-30 minutes:**\n• 30g protein + 5g creatine\n• 500ml water with electrolytes\n\n**Next 4 hours:**\n• High-glycemic carbs within 2 hours\n• 2-minute cold exposure\n\n**Tonight:**\n• Magnesium glycinate 400mg\n• Target 8+ hours sleep\n\n**Tomorrow:** Light movement only.\n\nTraining again before 48 hours will compound fatigue. The cost outweighs the gain." }
    ]
  },
  {
    trigger: "Sleep",
    messages: [
      { role: "user" as const, content: "My sleep quality has been declining. What should I do?" },
      { role: "assistant" as const, content: "Based on your sleep architecture, two variables matter:\n\n**1. Temperature.** Your deep sleep correlates with ambient temp below 18°C. You're averaging 21°C.\n\n**2. Cortisol timing.** Your natural dip is at 10:30pm. You're going to bed at 11:45pm, past the window.\n\n**The fix:**\n• Room temp: 18°C\n• Bed at 10:30pm\n• 300mg L-theanine + 1mg melatonin, 30 min prior\n\n**Expected result:** +22% deep sleep, +15% REM within 7 days.\n\nThis is a solvable problem. Execute the protocol." }
    ]
  },
  {
    trigger: "Energy Crash",
    messages: [
      { role: "user" as const, content: "I crash every afternoon around 2pm. How do I fix this?" },
      { role: "assistant" as const, content: "Two mechanisms:\n\n**1. Post-lunch glucose spike.** Your current lunch is carb-heavy. The crash at 2pm is reactive hypoglycaemia.\n\n**2. Circadian trough.** 2-4pm is your natural dip. You're fighting biology.\n\n**Immediate fix (today):**\n• 200mg L-theanine now\n• 10-minute walk outside\n\n**Structural fix:**\n• Shift lunch to higher protein/fat, lower carbs\n• 100mg caffeine + 200mg L-theanine at 1pm\n\nExpect 35% improvement in afternoon alertness within a week.\n\nThis is a systems problem. Fix the input, the output follows." }
    ]
  }
];

export function ChatDemo() {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<DemoMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");

  const currentConversation = DEMO_CONVERSATIONS[activeDemo];

  useEffect(() => {
    setDisplayedMessages([]);
    setTypingText("");
    setIsTyping(false);

    // Show user message immediately
    const timer1 = setTimeout(() => {
      setDisplayedMessages([currentConversation.messages[0]]);
    }, 300);

    // Start typing animation for assistant
    const timer2 = setTimeout(() => {
      setIsTyping(true);
    }, 800);

    // Animate the assistant response
    const timer3 = setTimeout(() => {
      const fullText = currentConversation.messages[1].content;
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setTypingText(fullText.slice(0, charIndex));
          charIndex += 3; // Type 3 chars at a time for speed
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setDisplayedMessages(currentConversation.messages);
          setTypingText("");
        }
      }, 15);

      return () => clearInterval(typeInterval);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeDemo]);

  return (
    <section className="py-20 sm:py-28 border-t border-border bg-muted/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            See Nova in Action
          </h2>
          <p className="text-muted-foreground">Real conversations. Real insights. Real results.</p>
        </div>

        {/* Demo Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {DEMO_CONVERSATIONS.map((conv, index) => (
            <button
              key={index}
              onClick={() => setActiveDemo(index)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all",
                activeDemo === index
                  ? "bg-foreground text-background"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
              )}
            >
              {conv.trigger}
            </button>
          ))}
        </div>

        {/* Chat Demo Window */}
        <div className="max-w-2xl mx-auto">
          <div className="border border-border bg-background overflow-hidden">
            {/* Header */}
            <div className="border-b border-border px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm font-medium tracking-tight text-foreground">Nova</span>
              </div>
              <span className="text-xs text-muted-foreground/60 tracking-wide uppercase">Active</span>
            </div>

            {/* Messages */}
            <div className="p-4 sm:p-6 space-y-4 min-h-[320px] max-h-[400px] overflow-y-auto">
              {displayedMessages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-7 h-7 bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%]",
                      message.role === "user"
                        ? "bg-foreground text-background px-4 py-2.5"
                        : ""
                    )}
                  >
                    {message.role === "user" ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={cn(
                            line.startsWith('**') ? "font-semibold mt-3 first:mt-0" : "",
                            line.startsWith('•') ? "pl-2 text-muted-foreground" : "",
                            line.startsWith('+') ? "text-accent" : "",
                            !line ? "h-2" : "mb-1"
                          )}>
                            {line.replace(/\*\*/g, '')}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && typingText && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {typingText.split('\n').map((line, i) => (
                      <p key={i} className={cn(
                        line.startsWith('**') ? "font-semibold mt-3 first:mt-0" : "",
                        line.startsWith('•') ? "pl-2 text-muted-foreground" : "",
                        line.startsWith('+') ? "text-accent" : "",
                        !line ? "h-2" : "mb-1"
                      )}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    ))}
                    <span className="inline-block w-1.5 h-4 bg-accent animate-pulse ml-0.5" />
                  </div>
                </div>
              )}

              {isTyping && !typingText && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="flex items-center gap-1 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input (disabled demo) */}
            <div className="border-t border-border p-3 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-2.5 bg-background border border-border text-sm text-muted-foreground">
                  Ask Nova anything...
                </div>
                <Button size="icon" className="h-10 w-10" disabled>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* CTA below demo */}
          <div className="text-center mt-8">
            <Button 
              size="lg"
              className="h-12 px-8 gap-2"
              onClick={() => navigate('/nova/chat')}
            >
              Start Your Conversation
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Free to try. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
