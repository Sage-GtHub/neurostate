import { ReactNode, useState, useEffect } from 'react';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';

interface NovaSwipeWrapperProps {
  children: ReactNode;
}

export const NovaSwipeWrapper = ({ children }: NovaSwipeWrapperProps) => {
  const { isSwipeEnabled } = useSwipeNavigation();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint briefly when user first loads a Nova page on mobile
    if (isSwipeEnabled) {
      const hasSeenHint = localStorage.getItem('nova-swipe-hint-seen');
      if (!hasSeenHint) {
        setShowHint(true);
        localStorage.setItem('nova-swipe-hint-seen', 'true');
        
        // Hide hint after 3 seconds
        const timer = setTimeout(() => {
          setShowHint(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isSwipeEnabled]);

  return (
    <div className="relative">
      {children}
      {isSwipeEnabled && showHint && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fade-in">
          <div className="bg-carbon/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <p className="text-xs text-ivory font-medium flex items-center gap-2">
              <span>←</span>
              <span>Swipe to navigate</span>
              <span>→</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
