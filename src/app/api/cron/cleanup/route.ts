import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (!authHeader || !process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Timing-safe comparison to prevent timing attacks
  // Check length first to prevent bypass
  if (authHeader.length !== expectedAuth.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const isValid = crypto.timingSafeEqual(
      Buffer.from(authHeader),
      Buffer.from(expectedAuth)
    );

    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    // Buffer error or other issue
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    // Delete seeds older than expiration date
    const result = await prisma.seed.deleteMany({
      where: {
        expiresAt: {
          lt: now
        }
      }
    });

    return NextResponse.json({
      success: true,
      deleted: result.count,
      timestamp: now.toISOString()
    });
  } catch (error) {
    console.error("Cleanup failed:", error);

    return NextResponse.json(
      {
        error: "Cleanup failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
