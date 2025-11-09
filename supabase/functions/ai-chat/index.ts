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
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI customer service agent for a health and wellness e-commerce platform. Your role is to:

1. Answer customer questions about products, shipping, and services
2. Make personalised product recommendations based on customer needs
3. Provide health and wellness guidance using our resources
4. Help customers discover products that match their goals

PRODUCT CATALOGUE:
- Supplements: Omega-3 Elite, Marine Collagen, Trace Minerals, NeuroFocus Cognitive, RestoreSleep Night, AdaptBalance Stress
- Recovery Devices: RedRestore Pro Panel, RedRestore Mini, Red Light Therapy Blanket, Red Light Face Mask, Infrared Sauna Blanket, CryoPlunge Ice Bath, PEMF Therapy Mat

CUSTOMER SERVICE INFO:
- Free UK shipping on orders over £50
- 30-day money-back guarantee
- Expert partners include wellness professionals and health coaches
- Resources available: articles, videos, podcasts, guides on sleep, recovery, nutrition, mental wellness
- Ambassador programme for health enthusiasts
- Partnership opportunities for organisations

TONE & STYLE:
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
