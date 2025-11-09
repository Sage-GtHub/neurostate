import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'vital-tech-haven-fwlf0.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '0e9cd339633c77c8d90e7896d3d9c0a1';

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchShopifyProducts() {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({
        query: STOREFRONT_QUERY,
        variables: { first: 50 },
      }),
    });

    if (!response.ok) {
      console.error('Shopify API error:', response.status);
      return [];
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('Shopify GraphQL errors:', data.errors);
      return [];
    }

    return data.data.products.edges;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Fetch real-time product data from Shopify
    console.log('Fetching products from Shopify...');
    const products = await fetchShopifyProducts();
    console.log(`Fetched ${products.length} products`);

    // Format products for AI context
    const productContext = products.map((p: any) => {
      const product = p.node;
      return `- ${product.title}: ${product.description || 'No description'} | Price: £${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)} | Link: /product/${product.handle} | Tags: ${product.tags.join(', ')}`;
    }).join('\n');

    const systemPrompt = `You are Hera, a helpful AI customer service agent for NeuroState, a health and wellness e-commerce platform. Your role is to:

1. Answer customer questions about products, shipping, and services
2. Make personalised product recommendations based on customer needs
3. Provide health and wellness guidance
4. Help customers discover products that match their goals

CURRENT PRODUCT CATALOGUE:
${productContext}

IMPORTANT: When recommending products, ALWAYS include the product link in this format: [Product Name](/product/product-handle)
For example: "I recommend checking out our [Omega-3 Elite](/product/omega-3-elite)"

CUSTOMER SERVICE INFO:
- Free UK shipping on orders over £50
- 30-day money-back guarantee
- Expert partners include wellness professionals and health coaches
- Resources available: articles, videos, podcasts, guides on sleep, recovery, nutrition, mental wellness
- Ambassador programme for health enthusiasts
- Partnership opportunities for organisations

TONE & STYLE:
- You are Hera - introduce yourself as "Hera" when greeting users
- Friendly, knowledgeable, and supportive
- Use British English spelling and grammar
- Be conversational and human-like
- Focus on customer's health goals and needs
- Suggest relevant products naturally, don't be pushy
- If you don't know something, be honest and offer to help find the answer

Always aim to understand the customer's specific needs before making recommendations.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
