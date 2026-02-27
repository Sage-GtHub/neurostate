import { ReactNode, useState, useEffect, useRef } from 'react';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, WifiOff } from 'lucide-react';
import { useOfflineDetection } from '@/hooks/usePWA';
import { useIsMobile } from '@/hooks/use-mobile';

interface NovaSwipeWrapperProps {
  children: ReactNode;
}

export const NovaSwipeWrapper = ({ children }: NovaSwipeWrapperProps) => {
  const { isSwipeEnabled } = useSwipeNavigation();
  const [showHint, setShowHint] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showOfflineToast, setShowOfflineToast] = useState(false);
  const isMobile = useIsMobile();

  const trackingRef = useRef(false);
  const startXRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pendingDirRef = useRef<'left' | 'right' | null>(null);

  const { isOnline } = useOfflineDetection(
    () => setShowOfflineToast(true),
    () => setShowOfflineToast(false)
  );

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

    const shouldIgnoreTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'input, textarea, button, a, [role="button"], [data-swipe-ignore="true"]'
        )
      );
    };

    const flushDir = () => {
      rafRef.current = null;
      setSwipeDirection(pendingDirRef.current);
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (shouldIgnoreTarget(e.target)) {
        trackingRef.current = false;
        pendingDirRef.current = null;
        return;
      }
      trackingRef.current = true;
      startXRef.current = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!trackingRef.current) return;

      const currentX = e.touches[0].clientX;
      const diff = currentX - startXRef.current;
      const nextDir = Math.abs(diff) > 50 ? (diff > 0 ? 'right' : 'left') : null;

      // Throttle state updates to animation frames to avoid re-render jitter while scrolling.
      if (pendingDirRef.current === nextDir) return;
      pendingDirRef.current = nextDir;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(flushDir);
      }
    };
    
    const handleTouchEnd = () => {
      trackingRef.current = false;
      pendingDirRef.current = null;
      setSwipeDirection(null);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isSwipeEnabled]);

  return (
    <div className="relative">
      {/* Offline indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2"
          >
            <WifiOff className="w-4 h-4" />
            You're offline. Some features may be limited.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with bottom padding for mobile nav */}
      <div className={isMobile ? 'pb-20' : ''}>
        {children}
      </div>
      
      {/* Mobile bottom navigation */}
      <MobileBottomNav />
      
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
