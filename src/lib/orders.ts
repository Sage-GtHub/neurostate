import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/stores/cartStore";

export interface CreateOrderParams {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  currency?: string;
  shopifyCheckoutUrl?: string;
}

export async function createOrder(params: CreateOrderParams) {
  const {
    userId,
    items,
    totalAmount,
    currency = 'GBP',
    shopifyCheckoutUrl
  } = params;

  try {
    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_number: orderNumber,
        status: 'pending',
        total_amount: totalAmount,
        currency,
        shopify_checkout_url: shopifyCheckoutUrl
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product.node.id,
      product_title: item.product.node.title,
      product_handle: item.product.node.handle,
      variant_id: item.variantId,
      variant_title: item.variantTitle,
      quantity: item.quantity,
      price: parseFloat(item.price.amount),
      image_url: item.product.node.images.edges[0]?.node.url || null
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { success: true, order };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
}

export async function updateOrderStatus(orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
}

export interface UpdateTrackingParams {
  orderId: string;
  trackingNumber: string;
  carrier: string;
}

export async function updateOrderTracking(params: UpdateTrackingParams) {
  const { orderId, trackingNumber, carrier } = params;

  try {
    const { error } = await supabase
      .from('orders')
      .update({
        tracking_number: trackingNumber,
        carrier: carrier,
        shipped_at: new Date().toISOString(),
        status: 'shipped'
      })
      .eq('id', orderId);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Error updating tracking info:', error);
    return { success: false, error: error.message };
  }
}

// Generate tracking URL based on carrier
export function getTrackingUrl(carrier: string, trackingNumber: string): string {
  const carriers: Record<string, string> = {
    'ups': `https://www.ups.com/track?tracknum=${trackingNumber}`,
    'usps': `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
    'fedex': `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
    'dhl': `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
    'royal-mail': `https://www.royalmail.com/track-your-item#/tracking-results/${trackingNumber}`,
    'dpduk': `https://www.dpd.co.uk/apps/tracking/?reference=${trackingNumber}`,
  };

  const carrierKey = carrier.toLowerCase().replace(/\s+/g, '-');
  return carriers[carrierKey] || `https://www.google.com/search?q=${carrier}+tracking+${trackingNumber}`;
}
