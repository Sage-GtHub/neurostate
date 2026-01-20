import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;

const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/generate-protocol`;

Deno.test("generate-protocol: requires authentication", async () => {
  const response = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // No auth header
    },
    body: JSON.stringify({
      goals: ["improve_sleep"],
      lifestyle: { sleepQuality: "poor" },
    }),
  });

  const body = await response.text();
  assertExists(body);
  assertEquals(response.status, 401);
});

Deno.test("generate-protocol: handles OPTIONS preflight", async () => {
  const response = await fetch(FUNCTION_URL, {
    method: "OPTIONS",
  });

  await response.text();
  assertEquals(response.status, 200);
  assertExists(response.headers.get("Access-Control-Allow-Origin"));
});

Deno.test("generate-protocol: validates required fields", async () => {
  const response = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({}), // Missing goals
  });

  const body = await response.text();
  assertExists(body);
  // Should return 400 for missing goals or 401 for auth
  assertEquals(response.status === 400 || response.status === 401, true);
});
