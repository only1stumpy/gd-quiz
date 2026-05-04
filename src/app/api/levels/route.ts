import getVideoId from "@/functions/getVideoId";
import { LevelData } from "@/types/level";
import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import { applyRateLimit, rateLimiters } from "@/lib/ratelimit";

const embedCache = new LRUCache<string, boolean>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
  updateAgeOnGet: true,
  allowStale: false,
});

const checkEmbedAvailability = async (videoUrl: string) => {
  const videoId = getVideoId(videoUrl);
  if (!videoId) return false;

  if (embedCache.has(videoId)) {
    return embedCache.get(videoId)!;
  }

  try {
    const oembedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}`
    );

    if (!oembedResponse.ok) {
      embedCache.set(videoId, false);
      return false;
    }

    embedCache.set(videoId, true);
    return true;
  } catch {
    embedCache.set(videoId, false);
    return false;
  }
};

const checkVideosParallel = async (levels: LevelData[], maxParallel = 5) => {
  const embeddableLevels: LevelData[] = [];
  const levelsToCheck = [...levels];

  while (levelsToCheck.length > 0) {
    const batch = levelsToCheck.splice(0, maxParallel);
    const results = await Promise.all(
      batch.map((level) => checkEmbedAvailability(level.verification_url))
    );

    results.forEach((isEmbeddable, index) => {
      if (isEmbeddable) {
        embeddableLevels.push(batch[index]);
      }
    });
  }

  return embeddableLevels;
};

// Cache for 1 hour
export const revalidate = 3600;

export async function GET(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await applyRateLimit(req, rateLimiters.levels);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const apiUrl = "https://api.demonlist.org/level/classic/list";

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch levels: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.data?.levels || !Array.isArray(data.data.levels)) {
      throw new Error("Invalid response format from demon list API");
    }

    const levelsWithVideo = data.data.levels.filter(
        (level: { verification_url: string }) => level.verification_url
    );

    if (levelsWithVideo.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        data: [],
        message: "No levels with videos found",
      });
    }

    const result = await checkVideosParallel(levelsWithVideo);

    const response = NextResponse.json({
      success: true,
      count: result.length,
      data: result,
    });

    // CORS headers - restrict in production
    const allowedOrigin = process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL || "https://gdquiz.com"
      : "http://localhost:3000";

    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");

    return response;
  } catch (error) {
    console.error("Error fetching levels:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch levels",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
