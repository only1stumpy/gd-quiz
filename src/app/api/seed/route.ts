import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { seed, mode, levels } = await req.json();
  try {
    await prisma.seed.create({
      data: {
        seed,
        mode,
        levels,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save seed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
