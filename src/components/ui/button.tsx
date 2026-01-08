import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 touch-manipulation active:scale-[0.98] hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md rounded-full font-semibold uppercase tracking-wider text-xs",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md rounded-full",
        outline: "border border-input bg-background hover:bg-accent/5 hover:border-accent/50 text-foreground rounded-full",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted shadow-sm rounded-full",
        ghost: "text-foreground hover:bg-accent/5 rounded-full hover:translate-y-0",
        link: "text-foreground underline-offset-4 hover:underline hover:translate-y-0",
      },
      size: {
        default: "h-10 px-6 py-2 text-xs min-h-[40px]",
        sm: "h-9 px-5 py-1.5 text-xs min-h-[36px]",
        lg: "h-11 px-8 py-2.5 text-xs min-h-[44px]",
        icon: "h-10 w-10 min-h-[40px] min-w-[40px] rounded-full hover:translate-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
