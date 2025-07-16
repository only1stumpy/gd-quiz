"use client";
import { ILevelData } from "@/types/level";
import { useEffect, useState } from "react";

export default function Home() {
  const [allLevels, setAllLevels] = useState<ILevelData[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const response = await fetch("/api/levels");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      setAllLevels(result.data);
    };

    fetchLevels();
  }, []);
  return (
    <div className="grid">
      {allLevels.map((level, index) => (
        <div key={index}>{JSON.stringify(level)}</div>
      ))}
    </div>
  );
}
