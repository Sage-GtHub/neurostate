import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X } from "lucide-react";

const EXIT_INTENT_SHOWN_KEY = "exit-intent-shown";
const EXIT_INTENT_DISMISSED_KEY = "exit-intent-dismissed";

export const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem(EXIT_INTENT_SHOWN_KEY);
    const hasDismissed = localStorage.getItem(EXIT_INTENT_DISMISSED_KEY);
    
    if (hasShown || hasDismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen) {
        setIsOpen(true);
        localStorage.setItem(EXIT_INTENT_SHOWN_KEY, "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Thanks for subscribing!", {
      description: "Check your email for an exclusive 15% off code",
    });

    setIsOpen(false);
    setEmail("");
    setIsLoading(false);
    localStorage.setItem(EXIT_INTENT_DISMISSED_KEY, "true");
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(EXIT_INTENT_DISMISSED_KEY, "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Wait! Don't Miss Out</DialogTitle>
          <DialogDescription className="text-base">
            Get <span className="font-bold text-primary">15% off</span> your first order when you subscribe to our newsletter
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="exit-email">Email Address</Label>
            <Input
              id="exit-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1 rounded-full bg-primary/10 text-foreground border border-border hover:bg-foreground hover:text-background transition-all duration-300 font-medium" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Get My Discount"}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} className="rounded-full">
              No Thanks
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
