import { useEffect, useState } from 'react';
import { ShopifyProduct } from '@/lib/shopify';

const STORAGE_KEY = 'recently-viewed-products';
const MAX_ITEMS = 8;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recently viewed products', e);
      }
    }
  }, []);

  const addRecentlyViewed = (product: ShopifyProduct) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.node.id !== product.node.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentlyViewed, addRecentlyViewed };
};
