import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Thanks for subscribing", {
      description: "Check your email for an exclusive discount code",
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
      <DialogContent className="sm:max-w-md border-mist">
        <DialogHeader>
          <DialogTitle className="text-[1.5rem] font-normal text-carbon">Wait</DialogTitle>
          <DialogDescription className="text-[0.9375rem] text-ash">
            Get <span className="text-carbon">15% off</span> your first order when you subscribe
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="exit-email" className="text-[0.875rem] font-normal text-carbon">Email</Label>
            <Input
              id="exit-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-mist"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Get discount"}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} className="border-mist hover:bg-transparent hover:opacity-60">
              No thanks
            </Button>
          </div>

          <p className="text-[0.75rem] text-stone text-center">
            By subscribing, you agree to receive marketing emails
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
