import getVideoId from "@/functions/getVideoId";
import { ILevelData } from "@/types/level";
import { NextResponse } from "next/server";
const embedCache = new Map<string, boolean>();

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

const checkVideosParallel = async (levels: ILevelData[], maxParallel = 5) => {
  const embeddableLevels: ILevelData[] = [];
  const levelsToCheck = [...levels];

  while (levelsToCheck.length > 0) {
    const batch = levelsToCheck.splice(0, maxParallel);
    const results = await Promise.all(
      batch.map((level) => checkEmbedAvailability(level.video))
    );

    results.forEach((isEmbeddable, index) => {
      if (isEmbeddable) {
        embeddableLevels.push(batch[index]);
      }
    });
  }

  return embeddableLevels;
};

export async function GET(request: Request) {
  const apiUrl = "https://api.demonlist.org/levels/classic";

  const res = await fetch(apiUrl);

  const data = await res.json();
  console.log(data);
  const levelsWithVideo = data.data.filter(
    (level: { video: any }) => level.video
  );
  const result = await checkVideosParallel(levelsWithVideo);

  const response = NextResponse.json({
    success: true,
    count: result.length,
    data: result,
  });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
