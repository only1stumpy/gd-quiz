import { ILevel } from "@/types/level";

export async function fetchLevels(): Promise<ILevel> {
  const res = await fetch("https://example.com/api/levels"); // заменишь на настоящий URL
  return res.json();
}
