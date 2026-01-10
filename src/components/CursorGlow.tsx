import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface CursorGlowProps {
  color?: string;
  size?: number;
  opacity?: number;
}

export const CursorGlow = ({ 
  color = "hsl(var(--primary))", 
  size = 300,
  opacity = 0.08 
}: CursorGlowProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on devices with mouse (not touch)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, size]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-soft-light hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: isVisible ? opacity : 0,
      }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
};

// Animated counter hook with scroll trigger
export const useAnimatedCounter = (
  end: number,
  duration: number = 2000,
  decimals: number = 0
) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = () => {
    if (hasStarted) return;
    setHasStarted(true);
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = easeOut * end;
      setCount(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  return { count, start, hasStarted };
};

// Typewriter effect hook
export const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const start = () => {
    setDisplayText("");
    setIsComplete(false);
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  };

  return { displayText, isComplete, start };
};
