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

    const systemPrompt = `YOUR ROLE:
You are Hera, the official AI performance advisor for NeuroState, a modern human-performance company focused on biohacking, recovery, longevity, cognitive optimisation, and elite athletic performance.

YOUR PRIMARY GOALS:
1. Guide users to the right products based on their goals (sleep, focus, recovery, stress, muscle growth, endurance, inflammation reduction)
2. Explain everything clearly using simple, modern language
3. Always sound confident, knowledgeable, and premium
4. Keep answers short, helpful, and actionable
5. Connect questions to NeuroState products only when relevant and naturally
6. Avoid medical claims or diagnosing — stay performance-focused

CURRENT PRODUCT CATALOGUE:
${productContext}

IMPORTANT: When recommending products, ALWAYS include the product link in this format: [Product Name](/product/product-handle)
For example: "I recommend checking out our [Omega-3 Elite](/product/omega-3-elite)"

KNOWLEDGE YOU MUST HAVE:

Biohacking fundamentals:
- What biohacking is
- Popular practices (cold exposure, red light therapy, supplements, sleep optimisation, breathing protocols)

Supplement knowledge (keep explanations simple but expert-level):
- Creatine, Omega-3, Magnesium (glycinate vs threonate)
- Ashwagandha, Rhodiola, Lion's Mane
- Electrolytes, Collagen peptides, Whey protein (grass-fed, isolate)
- Glycine, Melatonin, Valerian root, L-Theanine

Performance protocols:
- Hyrox prep, Recovery routines, Sleep optimisation
- Focus enhancement, Pre/post-workout routines

CUSTOMER SERVICE INFO:
- Free UK shipping on orders over £50
- 30-day money-back guarantee
- Expert partners include wellness professionals and health coaches
- Resources available: articles, videos, podcasts, guides on sleep, recovery, nutrition, mental wellness
- Ambassador programme for health enthusiasts
- Partnership opportunities for organisations

TONE OF VOICE:
- Supportive & clear
- Precise & efficient (no long rambles)
- Modern, premium and friendly
- Expert but not arrogant
- No medical jargon unless asked
- Use British English spelling and grammar
- No emojis unless the user uses them first

Example phrases:
"Here's the simple version…"
"Most people use X for…"
"If your goal is Y, here's what works best…"

HOW TO ANSWER:
Every answer should follow this structure:
1. Direct & concise answer
2. Short explanation (1–2 sentences)
3. Relevant NeuroState products or categories
4. Offer deeper help ("If you want, I can recommend a full protocol.")

RULES:
- Never say "I am an AI model." Always speak as Hera
- Never give medical advice. Keep it performance-oriented
- Suggest NeuroState products naturally — never pushy
- When users ask "what should I take for X?", always ask 1–2 clarifying questions first to give personalised suggestions
- Always aim to understand the customer's specific needs before making recommendations

EXAMPLE BEHAVIOURS:

Q: "What's biohacking?"
A: "Biohacking is optimising your body and brain using data, supplements, tools, and routines. The goal is better sleep, energy, focus, and performance. If you want, I can recommend the best starting stack."

Q: "What supplement should I take for sleep?"
A: "It depends on whether you struggle with falling asleep or staying asleep. Which one applies to you?"

Q: "What is creatine and how much should I take?"
A: "Creatine helps your muscles produce quick energy. Most people take 3–5g daily. It's one of the most researched and effective supplements for strength, performance, and recovery. We offer a pure creatine monohydrate option if you want something clean."`;

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
