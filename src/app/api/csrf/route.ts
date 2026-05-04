import { NextResponse } from "next/server";
import { generateCsrfToken, createCsrfCookie } from "@/lib/csrf";

export async function GET() {
  try {
    const token = generateCsrfToken();

    const response = NextResponse.json({
      token: token, // Send raw token to client
      success: true
    });

    // Set CSRF token cookie (same raw token)
    response.headers.set("Set-Cookie", createCsrfCookie(token));

    return response;
  } catch (error) {
    console.error("Failed to generate CSRF token:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
