import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to NeuroState®",
      description: "You're now among the first to know about our innovations.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="bg-secondary py-16 px-4">
      <div className="container mx-auto max-w-xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Be Among the First.
        </h3>
        <p className="text-muted-foreground mb-6">
          Join our community and get early access to new innovations.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Joining..." : "Join"}
          </Button>
        </form>
      </div>
    </div>
  );
};
