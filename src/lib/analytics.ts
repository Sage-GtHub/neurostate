/**
 * Google Analytics 4 Tracking Library
 * 
 * Setup Instructions:
 * 1. Get your GA4 Measurement ID from Google Analytics (format: G-XXXXXXXXXX)
 * 2. Replace 'G-XXXXXXXXXX' in index.html with your actual Measurement ID
 * 3. Events will automatically be tracked throughout the application
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Check if Google Analytics is loaded
 */
export const isGALoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track page views
 * Automatically called on route changes
 */
export const trackPageView = (url: string, title?: string) => {
  if (!isGALoaded()) {
    console.warn('Google Analytics not loaded');
    return;
  }

  window.gtag!('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

/**
 * Track product views
 * Call when a user views a product detail page
 */
export const trackProductView = (product: {
  id: string;
  name: string;
  price: string;
  category?: string;
  brand?: string;
}) => {
  if (!isGALoaded()) return;

  window.gtag!('event', 'view_item', {
    currency: 'GBP',
    value: parseFloat(product.price),
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_brand: product.brand || 'NeuroState',
        item_category: product.category || 'Supplements',
        price: parseFloat(product.price),
      },
    ],
  });
};

/**
 * Track add to cart events
 * Call when a user adds a product to their cart
 */
export const trackAddToCart = (item: {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category?: string;
  variant?: string;
}) => {
  if (!isGALoaded()) return;

  window.gtag!('event', 'add_to_cart', {
    currency: 'GBP',
    value: parseFloat(item.price) * item.quantity,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_brand: 'NeuroState',
        item_category: item.category || 'Supplements',
        item_variant: item.variant,
        price: parseFloat(item.price),
        quantity: item.quantity,
      },
    ],
  });
};

/**
 * Track remove from cart events
 */
export const trackRemoveFromCart = (item: {
  id: string;
  name: string;
  price: string;
  quantity: number;
}) => {
  if (!isGALoaded()) return;

  window.gtag!('event', 'remove_from_cart', {
    currency: 'GBP',
    value: parseFloat(item.price) * item.quantity,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_brand: 'NeuroState',
        price: parseFloat(item.price),
        quantity: item.quantity,
      },
    ],
  });
};

/**
 * Track begin checkout
 * Call when user starts the checkout process
 */
export const trackBeginCheckout = (items: Array<{
  id: string;
  name: string;
  price: string;
  quantity: number;
  category?: string;
}>, totalValue: number) => {
  if (!isGALoaded()) return;

  window.gtag!('event', 'begin_checkout', {
    currency: 'GBP',
    value: totalValue,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_brand: 'NeuroState',
      item_category: item.category || 'Supplements',
      price: parseFloat(item.price),
      quantity: item.quantity,
    })),
  });
};

/**
 * Track search events
 */
export const trackSearch = (searchTerm: string) => {
  if (!isGALoaded()) return;

  window.gtag!('event', 'search', {
    search_term: searchTerm,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (!isGALoaded()) return;

  window.gtag!('event', eventName, parameters);
};

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = () => {
  if (!isGALoaded()) return;

  window.gtag!('event', 'sign_up', {
    method: 'newsletter',
  });
};

/**
 * Track quiz completion
 */
export const trackQuizComplete = (quizResults: Record<string, any>) => {
  if (!isGALoaded()) return;

  window.gtag!('event', 'quiz_complete', {
    ...quizResults,
  });
};