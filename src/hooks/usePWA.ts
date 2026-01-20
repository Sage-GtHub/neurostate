import { useEffect } from 'react';

export function useOfflineDetection(onOffline?: () => void, onOnline?: () => void) {
  useEffect(() => {
    const handleOnline = () => {
      console.log('[PWA] Back online');
      onOnline?.();
    };

    const handleOffline = () => {
      console.log('[PWA] Gone offline');
      onOffline?.();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onOffline, onOnline]);

  return {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  };
}

export function usePWAInstall() {
  useEffect(() => {
    // Log service worker registration status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log('[PWA] Service Worker ready:', registration.scope);
      });
    }
  }, []);
}

// Hook to detect if running as installed PWA
export function useIsPWA() {
  return typeof window !== 'undefined' && 
    (window.matchMedia('(display-mode: standalone)').matches ||
     (window.navigator as any).standalone === true);
}
