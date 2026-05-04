import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Validate environment variables at module load time
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set");
}

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate limiters for different endpoints
export const rateLimiters = {
  // POST /api/seed - 10 requests per minute per IP
  seedCreate: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit:seed-create",
  }),

  // GET /api/seed/get - 30 requests per minute per IP
  seedGet: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit:seed-get",
  }),

  // GET /api/levels - 20 requests per minute per IP
  levels: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit:levels",
  }),
};

/**
 * Extract client IP from request headers
 * Vercel provides x-forwarded-for header with client IP
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

/**
 * Apply rate limiting to a request
 * Returns null if allowed, or a 429 response if rate limit exceeded
 */
export async function applyRateLimit(
  req: NextRequest,
  limiter: Ratelimit
): Promise<NextResponse | null> {
  const ip = getClientIp(req);

  try {
    const { success, limit, remaining, reset } = await limiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": new Date(reset).toISOString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Rate limit passed - return null to indicate success
    return null;
  } catch (error) {
    // If rate limiting fails (e.g., Redis is down), log error but allow request
    // This prevents rate limiting from becoming a single point of failure
    console.error("Rate limiting error:", error);
    return null;
  }
}
