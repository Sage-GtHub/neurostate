import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from './use-mobile';

interface SwipeNavigationOptions {
  enableSwipe?: boolean;
  threshold?: number;
}

export const useSwipeNavigation = (options: SwipeNavigationOptions = {}) => {
  const { enableSwipe = true, threshold = 75 } = options;
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  // Define Nova routes in order for swipe navigation (mobile)
  const novaRoutes = [
    '/nova',
    '/nova/chat',
    '/nova/protocols',
    '/nova/insights',
    '/nova/optimization',
    '/nova/devices'
  ];

  const getCurrentRouteIndex = () => {
    const currentPath = location.pathname;
    return novaRoutes.findIndex(route => 
      route === currentPath || (route === '/nova' && currentPath === '/nova')
    );
  };

  const handleSwipe = () => {
    if (!isSwiping.current) return;
    
    const swipeDistanceX = touchEndX.current - touchStartX.current;
    const swipeDistanceY = Math.abs(touchEndY.current - touchStartY.current);
    const currentIndex = getCurrentRouteIndex();
    
    // Ignore if vertical scroll is more significant than horizontal swipe
    if (swipeDistanceY > Math.abs(swipeDistanceX)) {
      isSwiping.current = false;
      return;
    }
    
    if (currentIndex === -1) return;

    // Swipe right (previous page)
    if (swipeDistanceX > threshold && currentIndex > 0) {
      navigate(novaRoutes[currentIndex - 1]);
    }
    
    // Swipe left (next page)
    if (swipeDistanceX < -threshold && currentIndex < novaRoutes.length - 1) {
      navigate(novaRoutes[currentIndex + 1]);
    }

    isSwiping.current = false;
  };

  useEffect(() => {
    if (!enableSwipe || !isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      handleSwipe();
    };

    // Add event listeners to the document
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enableSwipe, isMobile, location.pathname, navigate]);

  return {
    isMobile,
    isSwipeEnabled: enableSwipe && isMobile,
  };
};
