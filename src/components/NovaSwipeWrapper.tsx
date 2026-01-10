import { ReactNode, useState, useEffect } from 'react';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NovaSwipeWrapperProps {
  children: ReactNode;
}

export const NovaSwipeWrapper = ({ children }: NovaSwipeWrapperProps) => {
  const { isSwipeEnabled } = useSwipeNavigation();
  const [showHint, setShowHint] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    // Show hint briefly when user first loads a Nova page on mobile
    if (isSwipeEnabled) {
      const hasSeenHint = localStorage.getItem('nova-swipe-hint-seen');
      if (!hasSeenHint) {
        setShowHint(true);
        localStorage.setItem('nova-swipe-hint-seen', 'true');
        
        // Hide hint after 4 seconds
        const timer = setTimeout(() => {
          setShowHint(false);
        }, 4000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isSwipeEnabled]);

  // Track touch for visual feedback
  useEffect(() => {
    if (!isSwipeEnabled) return;
    
    let startX = 0;
    let currentX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      if (Math.abs(diff) > 50) {
        setSwipeDirection(diff > 0 ? 'right' : 'left');
      } else {
        setSwipeDirection(null);
      }
    };
    
    const handleTouchEnd = () => {
      setSwipeDirection(null);
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSwipeEnabled]);

  return (
    <div className="relative">
      {children}
      
      {/* Swipe direction indicators */}
      {isSwipeEnabled && swipeDirection && (
        <>
          <motion.div
            initial={{ opacity: 0, x: swipeDirection === 'left' ? 20 : -20 }}
            animate={{ opacity: 0.6, x: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none ${
              swipeDirection === 'left' ? 'right-4' : 'left-4'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center">
              {swipeDirection === 'left' ? (
                <ChevronRight className="w-5 h-5 text-foreground/60" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-foreground/60" />
              )}
            </div>
          </motion.div>
        </>
      )}
      
      {/* Initial swipe hint with animation */}
      <AnimatePresence>
        {isSwipeEnabled && showHint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-foreground/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ x: [-8, 8, -8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronLeft className="w-4 h-4 text-background/70" />
                </motion.div>
                <span className="text-xs text-background font-medium">
                  Swipe to navigate
                </span>
                <motion.div
                  animate={{ x: [8, -8, 8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight className="w-4 h-4 text-background/70" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
