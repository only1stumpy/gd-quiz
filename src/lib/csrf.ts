import { NextRequest } from "next/server";
import crypto from "crypto";

const CSRF_TOKEN_HEADER = "x-csrf-token";
const CSRF_COOKIE_NAME = "csrf-token";
const TOKEN_LENGTH = 32;

/**
 * Generate a cryptographically secure CSRF token using HMAC
 */
export function generateCsrfToken(): string {
  const secret = process.env.CSRF_SECRET;
  if (!secret) {
    throw new Error("CSRF_SECRET environment variable is required");
  }

  const randomData = crypto.randomBytes(TOKEN_LENGTH);
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(randomData);
  return hmac.digest('base64url');
}

/**
 * Validate CSRF token from request using double-submit cookie pattern
 * Compares token from header with token from cookie using timing-safe comparison
 */
export function validateCsrfToken(req: NextRequest): boolean {
  try {
    // Get token from header
    const headerToken = req.headers.get(CSRF_TOKEN_HEADER);
    if (!headerToken) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("CSRF validation failed: Missing token in header");
      }
      return false;
    }

    // Get token from cookie
    const cookieToken = req.cookies.get(CSRF_COOKIE_NAME)?.value;
    if (!cookieToken) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("CSRF validation failed: Missing token in cookie");
      }
      return false;
    }

    // Check length before timing-safe comparison
    if (headerToken.length !== cookieToken.length) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("CSRF validation failed: Token length mismatch");
      }
      return false;
    }

    // Timing-safe comparison to prevent timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(headerToken),
      Buffer.from(cookieToken)
    );

    if (!isValid && process.env.NODE_ENV === 'development') {
      console.warn("CSRF validation failed: Token mismatch");
    }

    return isValid;
  } catch (error) {
    console.error("CSRF validation error:", error);
    return false;
  }
}

/**
 * Create CSRF token cookie string for Set-Cookie header
 */
export function createCsrfCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === "production";
  const domain = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
    : undefined;

  const cookieOptions = [
    `${CSRF_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${60 * 60 * 24}`, // 24 hours
  ];

  if (isProduction) {
    cookieOptions.push("Secure");
  }

  if (domain) {
    cookieOptions.push(`Domain=${domain}`);
  }

  return cookieOptions.join("; ");
}
