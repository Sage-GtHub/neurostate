import { useState, useEffect, useCallback, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

interface UseMouseParallaxOptions {
  intensity?: number;
  smoothing?: number;
}

export const useMouseParallax = (
  ref: RefObject<HTMLElement>,
  options: UseMouseParallaxOptions = {}
) => {
  const { intensity = 1, smoothing = 0.1 } = options;
  
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  
  const [smoothedPosition, setSmoothedPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to -1 to 1 range centered on element
    const normalizedX = ((x / rect.width) - 0.5) * 2 * intensity;
    const normalizedY = ((y / rect.height) - 0.5) * 2 * intensity;
    
    setMousePosition({
      x,
      y,
      normalizedX,
      normalizedY,
    });
  }, [ref, intensity]);

  // Smooth the position for fluid animations
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setSmoothedPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothing,
        y: prev.y + (mousePosition.y - prev.y) * smoothing,
        normalizedX: prev.normalizedX + (mousePosition.normalizedX - prev.normalizedX) * smoothing,
        normalizedY: prev.normalizedY + (mousePosition.normalizedY - prev.normalizedY) * smoothing,
      }));
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePosition, smoothing]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    element.addEventListener('mousemove', handleMouseMove);
    return () => element.removeEventListener('mousemove', handleMouseMove);
  }, [ref, handleMouseMove]);

  // Get transform style for parallax elements
  const getParallaxStyle = (depth: number = 1) => ({
    transform: `translate(${smoothedPosition.normalizedX * depth * 20}px, ${smoothedPosition.normalizedY * depth * 20}px)`,
    transition: 'transform 0.1s ease-out',
  });

  const getRotateStyle = (depth: number = 1) => ({
    transform: `rotateX(${-smoothedPosition.normalizedY * depth * 5}deg) rotateY(${smoothedPosition.normalizedX * depth * 5}deg)`,
    transition: 'transform 0.1s ease-out',
  });

  return {
    mousePosition,
    smoothedPosition,
    getParallaxStyle,
    getRotateStyle,
  };
};
