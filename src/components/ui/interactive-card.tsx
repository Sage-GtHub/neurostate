import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableSpotlight?: boolean;
  enableScale?: boolean;
  tiltIntensity?: number;
  scaleAmount?: number;
}

const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  (
    {
      children,
      className,
      enableTilt = true,
      enableSpotlight = true,
      enableScale = true,
      tiltIntensity = 10,
      scaleAmount = 1.02,
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    
    // Mouse position for spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth spring for tilt
    const springConfig = { damping: 25, stiffness: 300 };
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);
    
    // Transform for spotlight gradient position
    const spotlightX = useTransform(mouseX, (val) => `${val}px`);
    const spotlightY = useTransform(mouseY, (val) => `${val}px`);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse distance from center
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;
      
      if (enableTilt) {
        rotateX.set((-y / rect.height) * tiltIntensity);
        rotateY.set((x / rect.width) * tiltIntensity);
      }
      
      // Update spotlight position relative to card
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    return (
      <motion.div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative rounded-2xl bg-card text-card-foreground border border-border/50 overflow-hidden",
          "transition-shadow duration-300 cursor-pointer",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={enableScale ? { scale: scaleAmount } : undefined}
        style={{
          transformStyle: "preserve-3d",
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Spotlight gradient overlay */}
        {enableSpotlight && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${spotlightX} ${spotlightY}, hsl(var(--primary) / 0.08), transparent 60%)`,
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-20">{children}</div>
      </motion.div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

// Magnetic button wrapper component
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const Magnetic: React.FC<MagneticProps> = ({ children, className, intensity = 0.3 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 20, stiffness: 300 });
  const y = useSpring(0, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * intensity);
    y.set((e.clientY - centerY) * intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

// Ripple effect button wrapper
interface RippleButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, className, ...props }) => {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples((prev) => [...prev, { x, y, id }]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: ripple.x - 100,
            top: ripple.y - 100,
          }}
        />
      ))}
    </div>
  );
};

export { InteractiveCard, Magnetic, RippleButton };
