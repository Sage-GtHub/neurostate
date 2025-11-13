import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout } from '@/lib/shopify';
import { trackAddToCart, trackRemoveFromCart, trackBeginCheckout } from '@/lib/analytics';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  isSubscription?: boolean;
  subscriptionFrequency?: 'monthly' | 'bi-monthly' | 'quarterly';
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        // Match by variantId AND subscription status
        const existingItem = items.find(i => 
          i.variantId === item.variantId && 
          i.isSubscription === item.isSubscription &&
          i.subscriptionFrequency === item.subscriptionFrequency
        );
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId && 
              i.isSubscription === item.isSubscription &&
              i.subscriptionFrequency === item.subscriptionFrequency
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }

        // Track add to cart event
        trackAddToCart({
          id: item.product.node.id,
          name: item.product.node.title,
          price: item.price.amount,
          quantity: item.quantity,
          category: item.product.node.tags?.[0],
          variant: item.variantTitle,
        });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        const { items } = get();
        const itemToRemove = items.find(item => item.variantId === variantId);
        
        if (itemToRemove) {
          // Track remove from cart event
          trackRemoveFromCart({
            id: itemToRemove.product.node.id,
            name: itemToRemove.product.node.title,
            price: itemToRemove.price.amount,
            quantity: itemToRemove.quantity,
          });
        }

        set({
          items: items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        // Calculate total value
        const totalValue = items.reduce((total, item) => {
          return total + (parseFloat(item.price.amount) * item.quantity);
        }, 0);

        // Track begin checkout event
        trackBeginCheckout(
          items.map(item => ({
            id: item.product.node.id,
            name: item.product.node.title,
            price: item.price.amount,
            quantity: item.quantity,
            category: item.product.node.tags?.[0],
          })),
          totalValue
        );

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          setCheckoutUrl(checkoutUrl);
        } catch (error) {
          console.error('Failed to create checkout:', error);
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
