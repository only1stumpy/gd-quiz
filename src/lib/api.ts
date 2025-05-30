import { ILevel } from "@/types/level";

export async function fetchLevels(): Promise<ILevel> {
  const res = await fetch(
    "https://cors-anywhere.herokuapp.com/https://api.demonlist.org/levels/classic"
  );
  return res.json();
}
