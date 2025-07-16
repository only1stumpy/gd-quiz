import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const seed = searchParams.get("seed");
  const mode = searchParams.get("mode");

  if (!seed || !mode) {
    return NextResponse.json(
      { error: "Missing seed or mode" },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.seed.findFirst({
      where: { seed, mode },
    });

    return NextResponse.json({ levels: result?.levels || [] });
  } catch (error) {
    console.error("DB fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
