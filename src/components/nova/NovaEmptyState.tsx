import { cn } from "@/lib/utils";
import { LucideIcon, Watch, MessageSquare, Target, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NovaEmptyStateProps {
  variant: "devices" | "insights" | "protocols" | "chat" | "generic";
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    to?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
  className?: string;
}

const variantConfig: Record<string, { icon: LucideIcon; defaultTitle: string; defaultDesc: string; illustration: string }> = {
  devices: {
    icon: Watch,
    defaultTitle: "No devices connected",
    defaultDesc: "Connect a wearable to unlock personalised insights powered by your biometric data.",
    illustration: "devices",
  },
  insights: {
    icon: TrendingUp,
    defaultTitle: "No insights yet",
    defaultDesc: "Once you connect a device and sync your data, Nova will generate personalised insights.",
    illustration: "insights",
  },
  protocols: {
    icon: Target,
    defaultTitle: "No active protocols",
    defaultDesc: "Start a protocol to receive guided recommendations tailored to your goals.",
    illustration: "protocols",
  },
  chat: {
    icon: MessageSquare,
    defaultTitle: "Start a conversation",
    defaultDesc: "Ask Nova anything about your health, performance, or recovery.",
    illustration: "chat",
  },
  generic: {
    icon: Sparkles,
    defaultTitle: "Nothing here yet",
    defaultDesc: "Get started by exploring the features available to you.",
    illustration: "generic",
  },
};

function EmptyStateIllustration({ type }: { type: string }) {
  // Simple geometric illustrations that match the design system
  const baseClasses = "absolute inset-0 flex items-center justify-center opacity-[0.03]";
  
  if (type === "devices") {
    return (
      <div className={baseClasses}>
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-foreground animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute inset-4 rounded-full border-2 border-foreground animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
          <div className="absolute inset-8 rounded-full bg-foreground animate-[pulse_3s_ease-in-out_infinite_1s]" />
        </div>
      </div>
    );
  }
  
  if (type === "insights") {
    return (
      <div className={baseClasses}>
        <div className="flex items-end gap-2 h-24">
          {[40, 60, 35, 75, 55, 80, 45].map((h, i) => (
            <div
              key={i}
              className="w-4 bg-foreground rounded-t animate-[pulse_2s_ease-in-out_infinite]"
              style={{ 
                height: `${h}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  if (type === "protocols") {
    return (
      <div className={baseClasses}>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-[pulse_2.5s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="w-6 h-6 rounded-full border-2 border-foreground" />
              <div className="w-24 h-2 rounded-full bg-foreground" style={{ width: `${60 + i * 15}px` }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className={baseClasses}>
      <div className="w-20 h-20 rounded-2xl border-2 border-foreground rotate-12 animate-[float_4s_ease-in-out_infinite]" />
    </div>
  );
}

export function NovaEmptyState({
  variant,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: NovaEmptyStateProps) {
  const navigate = useNavigate();
  const config = variantConfig[variant];
  const Icon = config.icon;
  
  const handlePrimaryClick = () => {
    if (primaryAction?.onClick) {
      primaryAction.onClick();
    } else if (primaryAction?.to) {
      navigate(primaryAction.to);
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl bg-card border border-foreground/5",
      "py-16 px-8 text-center",
      className
    )}>
      {/* Background illustration */}
      <EmptyStateIllustration type={config.illustration} />
      
      <div className="relative z-10 max-w-md mx-auto">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-foreground/40" />
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-medium text-foreground mb-3">
          {title || config.defaultTitle}
        </h3>
        <p className="text-sm text-foreground/50 leading-relaxed mb-8 max-w-sm mx-auto">
          {description || config.defaultDesc}
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {primaryAction && (
            <Button
              onClick={handlePrimaryClick}
              className="h-11 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs gap-2"
            >
              {primaryAction.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              className="h-11 px-6 rounded-full border-foreground/10 text-xs"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
        
        {/* Step indicators for onboarding */}
        {variant === "devices" && (
          <div className="mt-10 flex items-center justify-center gap-8">
            {[
              { step: 1, label: "Connect" },
              { step: 2, label: "Sync" },
              { step: 3, label: "Insights" },
            ].map(({ step, label }) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  step === 1 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-foreground/5 text-foreground/30"
                )}>
                  {step}
                </div>
                <span className="text-[10px] text-foreground/40">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
