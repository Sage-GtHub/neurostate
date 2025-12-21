import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X, Brain, MessageCircle, Activity, TrendingUp, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    id: "nova-brain",
    title: "Meet Nova AI",
    description: "Nova is your personal AI health coach, powered by advanced machine learning. It analyses your biometric data 24/7 to optimise your performance and wellbeing.",
    icon: Brain,
    highlight: { top: "0%", left: "0%", width: "100%", height: "52px" },
    position: "bottom",
  },
  {
    id: "chat-interface",
    title: "Conversational AI",
    description: "Chat naturally with Nova about your health goals, recovery status, or supplement timing. It understands context and provides personalised recommendations based on your data.",
    icon: MessageCircle,
    highlight: { top: "52px", left: "0%", width: "50%", height: "calc(100% - 52px)" },
    position: "right",
  },
  {
    id: "biometric-metrics",
    title: "Real-Time Biometrics",
    description: "Nova syncs with 10+ wearable devices to track HRV, sleep quality, readiness scores, and goal progress. All metrics update automatically throughout the day.",
    icon: Activity,
    highlight: { top: "52px", left: "50%", width: "50%", height: "35%" },
    position: "left",
  },
  {
    id: "weekly-trends",
    title: "Trend Analysis",
    description: "Visualise your performance patterns over time. Nova identifies trends, correlations, and anomalies to help you understand what's working and what needs adjustment.",
    icon: TrendingUp,
    highlight: { top: "calc(52px + 35%)", left: "50%", width: "50%", height: "35%" },
    position: "left",
  },
  {
    id: "ai-insights",
    title: "Predictive Insights",
    description: "Get AI-generated insights that predict your energy levels, suggest optimal training windows, and alert you to potential issues before they affect performance.",
    icon: Zap,
    highlight: { top: "calc(52px + 70%)", left: "50%", width: "50%", height: "calc(30% - 52px)" },
    position: "top",
  },
  {
    id: "goal-tracking",
    title: "Smart Goal Tracking",
    description: "Set personalised goals and let Nova track your progress automatically. It adjusts recommendations based on your progress and helps you stay accountable.",
    icon: Target,
    highlight: { top: "0%", left: "0%", width: "100%", height: "100%" },
    position: "bottom",
  },
];

interface GuidedTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const GuidedTour = ({ onComplete, onSkip }: GuidedTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const step = tourSteps[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const goToNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const goToPrev = () => {
    if (!isFirstStep) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "Escape") {
        onSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const positions: Record<string, string> = {
      top: "bottom-full mb-4 left-1/2 -translate-x-1/2",
      bottom: "top-full mt-4 left-1/2 -translate-x-1/2",
      left: "right-full mr-4 top-1/2 -translate-y-1/2",
      right: "left-full ml-4 top-1/2 -translate-y-1/2",
    };
    return positions[step.position];
  };

  const getArrowPosition = () => {
    const arrows: Record<string, string> = {
      top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-ivory/10",
      bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-ivory/10",
      left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-ivory/10",
      right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-ivory/10",
    };
    return arrows[step.position];
  };

  return (
    <div className="absolute inset-0 z-50">
      {/* Overlay with cutout */}
      <div className="absolute inset-0">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-carbon/80 backdrop-blur-sm" />
        
        {/* Highlighted area with glow */}
        <div
          className={`absolute border-2 border-signal-green rounded-xl transition-all duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          style={{
            top: step.highlight.top,
            left: step.highlight.left,
            width: step.highlight.width,
            height: step.highlight.height,
            boxShadow: '0 0 0 9999px rgba(23, 23, 23, 0.85), 0 0 40px rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Animated border pulse */}
          <div className="absolute -inset-1 rounded-xl border-2 border-signal-green/50 animate-ping opacity-30" style={{ animationDuration: '2s' }} />
          
          {/* Tooltip */}
          <div
            className={`absolute ${getTooltipPosition()} w-80 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-8 ${getArrowPosition()}`} />
            
            {/* Content */}
            <div className="bg-carbon border border-ivory/10 rounded-xl p-5 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-signal-green to-emerald-600 flex items-center justify-center">
                  <StepIcon className="w-5 h-5 text-carbon" />
                </div>
                <div>
                  <div className="text-ivory font-semibold">{step.title}</div>
                  <div className="text-stone text-xs">Step {currentStep + 1} of {tourSteps.length}</div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-ivory/80 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
              
              {/* Progress bar */}
              <div className="flex gap-1 mb-4">
                {tourSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      idx < currentStep 
                        ? 'bg-signal-green' 
                        : idx === currentStep 
                          ? 'bg-signal-green animate-pulse' 
                          : 'bg-ivory/20'
                    }`}
                  />
                ))}
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={onSkip}
                  className="text-stone hover:text-ivory text-sm transition-colors"
                >
                  Skip tour
                </button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrev}
                    disabled={isFirstStep}
                    className="border-ivory/20 text-ivory hover:bg-ivory/10 disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={goToNext}
                    className="bg-signal-green text-carbon hover:bg-signal-green/90"
                  >
                    {isLastStep ? 'Finish' : 'Next'}
                    {!isLastStep && <ArrowRight className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Close button */}
      <button
        onClick={onSkip}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center text-ivory/60 hover:text-ivory transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* Keyboard hints */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-ivory/40 text-xs">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-ivory/10 rounded text-[10px]">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-ivory/10 rounded text-[10px]">→</kbd>
          Navigate
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-ivory/10 rounded text-[10px]">Esc</kbd>
          Skip
        </span>
      </div>
    </div>
  );
};

export default GuidedTour;
