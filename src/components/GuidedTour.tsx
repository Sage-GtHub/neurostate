import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X, Brain, MessageCircle, Activity, TrendingUp, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tourSteps: TourStep[] = [
  {
    id: "nova-brain",
    title: "Meet Nova AI",
    description: "Nova is your personal AI health coach, powered by advanced machine learning. It analyses your biometric data 24/7 to optimise your performance.",
    icon: Brain,
  },
  {
    id: "chat-interface",
    title: "Conversational AI",
    description: "Chat naturally with Nova about your health goals, recovery status, or supplement timing. It provides personalised recommendations.",
    icon: MessageCircle,
  },
  {
    id: "biometric-metrics",
    title: "Real-Time Biometrics",
    description: "Nova syncs with 10+ wearable devices to track HRV, sleep quality, readiness scores, and goal progress.",
    icon: Activity,
  },
  {
    id: "weekly-trends",
    title: "Trend Analysis",
    description: "Visualise your performance patterns over time. Nova identifies trends and correlations to help you understand what's working.",
    icon: TrendingUp,
  },
  {
    id: "ai-insights",
    title: "Predictive Insights",
    description: "Get AI-generated insights that predict your energy levels and suggest optimal training windows.",
    icon: Zap,
  },
  {
    id: "goal-tracking",
    title: "Smart Goal Tracking",
    description: "Set personalised goals and let Nova track your progress automatically with adaptive recommendations.",
    icon: Target,
  },
];

interface GuidedTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const GuidedTour = ({ onComplete, onSkip }: GuidedTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const step = tourSteps[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const goToNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
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

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-carbon/90 backdrop-blur-sm" onClick={onSkip} />
      
      {/* Close button */}
      <button
        onClick={onSkip}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center text-ivory/60 hover:text-ivory transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* Tour Card - Centered and mobile-friendly */}
      <div className="relative w-full max-w-sm bg-carbon border border-ivory/10 rounded-2xl p-5 sm:p-6 shadow-2xl z-10">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-signal-green to-emerald-600 flex items-center justify-center shadow-lg shadow-signal-green/30">
            <StepIcon className="w-7 h-7 sm:w-8 sm:h-8 text-carbon" />
          </div>
        </div>
        
        {/* Step counter */}
        <div className="text-center mb-2">
          <span className="text-stone text-xs">Step {currentStep + 1} of {tourSteps.length}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-ivory text-lg sm:text-xl font-semibold text-center mb-3">
          {step.title}
        </h3>
        
        {/* Description */}
        <p className="text-ivory/70 text-sm sm:text-base text-center leading-relaxed mb-6">
          {step.description}
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-5">
          {tourSteps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep 
                  ? 'w-6 bg-signal-green' 
                  : idx < currentStep
                    ? 'w-1.5 bg-signal-green/50'
                    : 'w-1.5 bg-ivory/20'
              }`}
            />
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrev}
            disabled={isFirstStep}
            className="text-ivory/60 hover:text-ivory hover:bg-ivory/10 disabled:opacity-30 h-10 px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          <button
            onClick={onSkip}
            className="text-stone hover:text-ivory text-sm transition-colors px-2"
          >
            Skip
          </button>
          
          <Button
            size="sm"
            onClick={goToNext}
            className="bg-signal-green text-carbon hover:bg-signal-green/90 h-10 px-4 font-medium"
          >
            {isLastStep ? 'Get Started' : 'Next'}
            {!isLastStep && <ArrowRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
