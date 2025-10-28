import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

const levelSchema = z.object({
  id: z.number(),
  name: z.string(),
  place: z.number(),
  video: z.string().url(),
});

const seedRequestSchema = z.object({
  seed: z.string().min(1).max(100),
  mode: z.enum(["easy", "normal", "hard", "custom", "friend"]),
  levels: z.array(levelSchema).min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input data
    const validatedData = seedRequestSchema.parse(body);

    await prisma.seed.create({
      data: {
        seed: validatedData.seed,
        mode: validatedData.mode,
        levels: validatedData.levels,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save seed:", error);

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
