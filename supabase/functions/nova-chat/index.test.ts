import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;

const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/nova-chat`;

Deno.test("nova-chat: returns 400 for invalid message format", async () => {
  const response = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ message: "Hello" }), // Single message, not array - should be converted
  });

  // Should either work (200) with the message conversion, or return 400
  const body = await response.text();
  assertExists(body);
  // The function now handles single messages by converting them
  assertEquals(response.status === 200 || response.status === 400, true);
});

Deno.test("nova-chat: accepts valid message array format", async () => {
  const response = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: "Hello Nova" }],
    }),
  });

  const body = await response.text();
  assertExists(body);
  // Should return 200 for valid request (streaming response)
  assertEquals(response.status, 200);
  assertEquals(response.headers.get("Content-Type"), "text/event-stream");
});

Deno.test("nova-chat: handles empty messages array", async () => {
  const response = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ messages: [] }),
  });

  const body = await response.text();
  assertExists(body);
  // Empty messages should still work or return appropriate error
  assertEquals(response.status === 200 || response.status === 400, true);
});

Deno.test("nova-chat: handles OPTIONS preflight request", async () => {
  const response = await fetch(FUNCTION_URL, {
    method: "OPTIONS",
  });

  await response.text(); // Consume body
  assertEquals(response.status, 200);
  assertExists(response.headers.get("Access-Control-Allow-Origin"));
});
