"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BgWrapper from "@/components/BgWrapper";

type LevelData = {
  id: number;
  name: string;
  video: string;
  place: number;
};

export default function ResultPage() {
  const [userTop, setUserTop] = useState<LevelData[]>([]);
  const [correctOrder, setCorrectOrder] = useState<LevelData[]>([]);
  const [totalError, setTotalError] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("gdquiz_levels");
    if (!stored) return;

    const parsed: LevelData[] = JSON.parse(stored);
    setUserTop(parsed);

    const sorted = [...parsed].sort((a, b) => a.place - b.place);
    setCorrectOrder(sorted);

    const errorSum = parsed.reduce((sum, level, i) => {
      const correctIndex = sorted.findIndex((l) => l.id === level.id);
      return sum + Math.abs(correctIndex - i);
    }, 0);
    setTotalError(errorSum);
  }, []);

  const getCardColor = (level: LevelData, index: number): string => {
    const correctIndex = correctOrder.findIndex((l) => l.id === level.id);
    if (correctIndex === -1) return "bg-gray-700";
    return correctIndex === index ? "bg-green-700/50" : "bg-red-700/50";
  };

  const getRelativePlace = (level: LevelData): number => {
    const sorted = [...userTop].sort((a, b) => a.place - b.place);
    return sorted.findIndex((l) => l.id === level.id) + 1;
  };

  const getYoutubePreview = (url: string): string => {
    const match = url.match(/(?:v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
  };

  const restart = () => {
    localStorage.removeItem("gdquiz_levels");
    router.push("/quiz");
  };

  return (
    <>
      <BgWrapper />
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold text-center mb-4">Результаты</h1>
        <p className="text-center text-sm text-gray-400 mb-2">
          Зелёное — правильно, красное — ошибка
        </p>
        <p className="text-center text-sm text-[var(--neon-green)] mb-6">
          Сумма ошибок: {totalError}
        </p>

        <ol className="space-y-4">
          {userTop.map((level, index) => (
            <li
              key={level.id}
              className={`${getCardColor(
                level,
                index
              )} p-4 rounded-xl border border-white/10 backdrop-blur`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-300">
                  #{index + 1} в твоём топе
                </div>
                <div className="text-sm text-white/80">
                  Реальное место среди этих 10: {getRelativePlace(level)}
                </div>
              </div>
              <p className="font-semibold mb-2">{level.name}</p>
              <img
                src={getYoutubePreview(level.video)}
                alt={level.name}
                className="w-full aspect-video object-cover rounded-md border border-white/10"
              />
            </li>
          ))}
        </ol>

        <div className="text-center mt-10">
          <button
            onClick={restart}
            className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:shadow-xl transition"
          >
            Сыграть ещё раз
          </button>
        </div>
      </div>
    </>
  );
}
