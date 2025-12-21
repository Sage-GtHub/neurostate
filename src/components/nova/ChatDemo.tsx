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
      { role: "user" as const, content: "Analyse my recent HRV data and give me actionable insights" },
      { role: "assistant" as const, content: "Based on your last 7 days of HRV data, I've identified a clear pattern:\n\n**Current State:** Your HRV dropped 18% since Monday, indicating accumulated stress.\n\n**Root Cause:** Late evening screen time (avg 11:23pm) is disrupting parasympathetic recovery.\n\n**Action Plan:**\n• Tonight: Blue light blocking at 9pm\n• Take 400mg magnesium glycinate 1hr before bed\n• Tomorrow: Light zone 2 cardio only" }
    ]
  },
  {
    trigger: "Supplement Stack",
    messages: [
      { role: "user" as const, content: "Design a supplement stack for deep focus and cognitive performance" },
      { role: "assistant" as const, content: "Based on your goals and biomarkers, here's your optimised cognitive stack:\n\n**Morning Stack (6-8am):**\n• Lion's Mane 500mg – neurogenesis support\n• Alpha-GPC 300mg – acetylcholine precursor\n• Omega-3 2g – brain membrane health\n\n**Focus Stack (as needed):**\n• L-Theanine 200mg + Caffeine 100mg\n• Rhodiola 200mg – stress resilience\n\n**Expected timeline:** Noticeable focus improvement in 3-5 days. Full cognitive benefits at 4-6 weeks." }
    ]
  },
  {
    trigger: "Recovery",
    messages: [
      { role: "user" as const, content: "I just finished a heavy leg workout. What should I do for optimal recovery?" },
      { role: "assistant" as const, content: "Post-workout recovery protocol for your session:\n\n**Immediate (0-30 min):**\n• 30g whey protein + 5g creatine\n• 500ml water with electrolytes\n\n**Next 4 hours:**\n• High-glycemic carbs (rice, potato) within 2hrs\n• Cold exposure: 2-min cold shower\n\n**Tonight:**\n• Magnesium glycinate 400mg before bed\n• Target 8+ hours sleep\n\n**Tomorrow:**\n• Light movement only – your HRV suggests 48hr recovery needed for this intensity." }
    ]
  },
  {
    trigger: "Sleep",
    messages: [
      { role: "user" as const, content: "Create a personalised sleep optimisation protocol for me" },
      { role: "assistant" as const, content: "I've analysed your sleep architecture from the last 30 nights. Here's your personalised protocol:\n\n**Phase 1 (Days 1-7): Foundation**\n• Temperature: Set bedroom to 18°C\n• Timing: Bed at 10:30pm (aligned with your cortisol dip)\n• Supplements: 300mg L-theanine + 1mg melatonin\n\n**Expected Results:**\n+22% deep sleep, +15% REM based on similar profiles." }
    ]
  },
  {
    trigger: "Energy",
    messages: [
      { role: "user" as const, content: "I need more energy in the afternoon. What do you recommend?" },
      { role: "assistant" as const, content: "Your afternoon energy dip correlates with:\n\n1. **Blood glucose crash** at ~2pm (post-lunch spike)\n2. **Circadian trough** between 2-4pm\n\n**Immediate fix:**\n• Take 200mg L-theanine now\n• 10-minute walk outside\n\n**Long-term protocol:**\n• Shift lunch to higher protein/fat, lower carbs\n• 100mg caffeine + 200mg L-theanine at 1pm\n\nThis should boost afternoon alertness by ~35% within a week." }
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
    <section className="py-20 sm:py-28 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4 tracking-tight">
            See Nova in Action
          </h2>
          <p className="text-background/60">Real conversations. Real insights. Real results.</p>
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
                  ? "bg-accent text-accent-foreground"
                  : "bg-transparent border border-background/30 text-background/70 hover:text-background hover:border-background/50"
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
            <div className="border-b border-border px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Nova</div>
                <div className="text-xs text-muted-foreground">AI Cognitive Coach</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
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
