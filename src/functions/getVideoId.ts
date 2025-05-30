export default function getVideoId(url: string): string | null {
  try {
    const cleanUrl = new URL(url);
    const hostname = cleanUrl.hostname;

    if (hostname.includes("youtube.com")) {
      return cleanUrl.searchParams.get("v");
    }

    if (hostname === "youtu.be") {
      return cleanUrl.pathname.split("/")[1];
    }

    return null;
  } catch {
    return null;
  }
}
