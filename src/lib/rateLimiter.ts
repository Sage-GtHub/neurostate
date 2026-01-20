// Client-side rate limiter to prevent excessive API calls

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitState {
  requests: number[];
}

const rateLimitStates: Record<string, RateLimitState> = {};

export function checkRateLimit(key: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const state = rateLimitStates[key] || { requests: [] };
  
  // Remove expired requests
  state.requests = state.requests.filter(time => now - time < config.windowMs);
  
  if (state.requests.length >= config.maxRequests) {
    return false; // Rate limited
  }
  
  state.requests.push(now);
  rateLimitStates[key] = state;
  return true;
}

export function getRemainingRequests(key: string, config: RateLimitConfig): number {
  const now = Date.now();
  const state = rateLimitStates[key] || { requests: [] };
  
  // Remove expired requests
  const validRequests = state.requests.filter(time => now - time < config.windowMs);
  
  return Math.max(0, config.maxRequests - validRequests.length);
}

export function getTimeUntilReset(key: string, config: RateLimitConfig): number {
  const now = Date.now();
  const state = rateLimitStates[key];
  
  if (!state || state.requests.length === 0) {
    return 0;
  }
  
  const oldestRequest = Math.min(...state.requests);
  const resetTime = oldestRequest + config.windowMs;
  
  return Math.max(0, resetTime - now);
}

// Pre-configured rate limits for different Nova features
export const RATE_LIMITS = {
  chat: { maxRequests: 30, windowMs: 60000 }, // 30 messages per minute
  insights: { maxRequests: 5, windowMs: 300000 }, // 5 insight generations per 5 minutes
  protocol: { maxRequests: 3, windowMs: 300000 }, // 3 protocol generations per 5 minutes
  forecast: { maxRequests: 10, windowMs: 600000 }, // 10 forecasts per 10 minutes
  sync: { maxRequests: 10, windowMs: 60000 }, // 10 syncs per minute
} as const;

// Async wrapper that adds rate limiting to fetch calls
export async function rateLimitedFetch(
  key: string,
  config: RateLimitConfig,
  fetchFn: () => Promise<Response>
): Promise<Response> {
  if (!checkRateLimit(key, config)) {
    const waitTime = Math.ceil(getTimeUntilReset(key, config) / 1000);
    throw new Error(`Rate limited. Please wait ${waitTime} seconds before trying again.`);
  }
  
  return fetchFn();
}
