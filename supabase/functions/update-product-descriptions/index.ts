import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SHOPIFY_ADMIN_TOKEN = Deno.env.get("SHOPIFY_ADMIN_TOKEN");
    const SHOPIFY_STORE_DOMAIN = Deno.env.get("SHOPIFY_STORE_PERMANENT_DOMAIN");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }
    
    if (!SHOPIFY_ADMIN_TOKEN || !SHOPIFY_STORE_DOMAIN) {
      throw new Error("Shopify credentials not configured");
    }

    const ADMIN_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2025-07/graphql.json`;

    // Fetch all products from Shopify
    const productsQuery = `
      query {
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              handle
            }
          }
        }
      }
    `;

    const productsResponse = await fetch(ADMIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify({ query: productsQuery }),
    });

    const productsData = await productsResponse.json();
    
    if (productsData.errors) {
      throw new Error(`Shopify API error: ${JSON.stringify(productsData.errors)}`);
    }

    const products = productsData.data.products.edges;
    const results = [];

    // Process each product
    for (const product of products) {
      const { id, title, description, handle } = product.node;
      
      if (!description || description.trim().length === 0) {
        results.push({
          title,
          handle,
          status: "skipped",
          reason: "No description to update"
        });
        continue;
      }

      // Use AI to convert description to bullet points with emojis
      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are a product copywriter. Convert product descriptions into short, punchy descriptions with 3 bullet points.

Format:
- Start with a single short sentence (under 180 chars) with 1-2 relevant emojis
- Add exactly 3 bullet points starting with ✓
- Use British English
- Keep it conversational and human-sounding
- Focus on key benefits

Example:
"⚡ Advanced PEMF therapy mat that enhances circulation, reduces inflammation, and speeds recovery. Customizable intensity for athletes and wellness enthusiasts.

✓ Supports optimal cellular function and recovery
✓ Reduces inflammation and accelerates healing
✓ Multiple intensity levels for personalised therapy"

Do NOT include the product title in the output.`
            },
            {
              role: "user",
              content: `Product: ${title}\n\nCurrent description:\n${description}\n\nConvert this to the bullet point format with emojis.`
            }
          ],
        }),
      });

      if (!aiResponse.ok) {
        results.push({
          title,
          handle,
          status: "error",
          reason: `AI generation failed: ${aiResponse.status}`
        });
        continue;
      }

      const aiData = await aiResponse.json();
      const newDescription = aiData.choices?.[0]?.message?.content;

      if (!newDescription) {
        results.push({
          title,
          handle,
          status: "error",
          reason: "AI returned empty description"
        });
        continue;
      }

      // Update product in Shopify
      const updateMutation = `
        mutation updateProduct($input: ProductInput!) {
          productUpdate(input: $input) {
            product {
              id
              description
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const updateResponse = await fetch(ADMIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query: updateMutation,
          variables: {
            input: {
              id: id,
              description: newDescription,
            },
          },
        }),
      });

      const updateData = await updateResponse.json();

      if (updateData.data?.productUpdate?.userErrors?.length > 0) {
        results.push({
          title,
          handle,
          status: "error",
          reason: updateData.data.productUpdate.userErrors[0].message
        });
      } else {
        results.push({
          title,
          handle,
          status: "success",
          oldDescription: description.substring(0, 100) + "...",
          newDescription: newDescription.substring(0, 100) + "..."
        });
      }

      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalProducts: products.length,
        results,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error updating descriptions:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});