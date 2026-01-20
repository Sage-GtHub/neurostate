import { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class NovaErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Nova Error Boundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            {this.state.error?.message || "An unexpected error occurred. Please try again."}
          </p>
          <Button
            onClick={this.handleRetry}
            variant="outline"
            className="gap-2 rounded-full"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error state component
interface NovaErrorStateProps {
  error: string | null;
  onRetry?: () => void;
  title?: string;
  compact?: boolean;
}

export function NovaErrorState({ 
  error, 
  onRetry, 
  title = "Error loading data",
  compact = false 
}: NovaErrorStateProps) {
  if (!error) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
        <p className="text-sm text-foreground flex-1">{error}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
        <AlertCircle className="w-5 h-5 text-destructive" />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">{error}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="gap-2 rounded-full"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

// Rate limit specific error component
interface RateLimitErrorProps {
  onRetry?: () => void;
}

export function NovaRateLimitError({ onRetry }: RateLimitErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-5">
        <AlertCircle className="w-5 h-5 text-amber-500" />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">
        Too many requests
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        You're sending requests too quickly. Please wait a moment and try again.
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="gap-2 rounded-full"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
