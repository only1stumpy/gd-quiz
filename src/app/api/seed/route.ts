import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";
import {Prisma} from "@prisma/client";
import { applyRateLimit, rateLimiters } from "@/lib/ratelimit";
import { validateCsrfToken } from "@/lib/csrf";

const levelSchema = z.object({
  id: z.number(),
  name: z.string(),
  placement: z.number(),
  verification_url: z.string().url(),
});

const seedRequestSchema = z.object({
  seed: z.string().min(1).max(100),
  mode: z.enum(["easy", "normal", "hard", "custom", "friend"]),
  levels: z.array(levelSchema).min(1).max(100),
});

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await applyRateLimit(req, rateLimiters.seedCreate);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Validate CSRF token
  if (!validateCsrfToken(req)) {
    return NextResponse.json(
      { success: false, error: "Invalid CSRF token" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();

    // Validate input data
    const validatedData = seedRequestSchema.parse(body);

    // Set expiration to 30 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await prisma.seed.create({
      data: {
        seed: validatedData.seed,
        mode: validatedData.mode,
        levels: validatedData.levels as Prisma.InputJsonValue,
        expiresAt
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save seed:", error);

    // Handle Prisma unique constraint violation (seed collision)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: "Seed collision detected. Please retry." },
        { status: 409 }
      );
    }

    // Return specific error for validation failures
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
