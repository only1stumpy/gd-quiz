import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

const queryParamsSchema = z.object({
  seed: z.string().min(1).max(100),
  mode: z.enum(["easy", "normal", "hard", "custom", "friend"]),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const seed = searchParams.get("seed");
    const mode = searchParams.get("mode");

    if (!seed || !mode) {
      return NextResponse.json(
        { error: "Missing seed or mode" },
        { status: 400 }
      );
    }

    // Validate query parameters
    const validatedParams = queryParamsSchema.parse({ seed, mode });

    const result = await prisma.seed.findFirst({
      where: {
        seed: validatedParams.seed,
        mode: validatedParams.mode
      },
    });

    return NextResponse.json({ levels: result?.levels || [] });
  } catch (error) {
    console.error("DB fetch error:", error);

    // Return specific error for validation failures
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid parameters", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
