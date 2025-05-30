"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BgWrapper from "@/components/BgWrapper";
import { ILevelData } from "@/types/level";
import Header from "@/components/Header";
import getVideoId from "@/functions/getVideoId";
import { useLanguage } from "@/context/LanguageContext";

export default function ResultPage() {
  const { language } = useLanguage();
  const [userTop, setUserTop] = useState<ILevelData[]>([]);
  const [correctOrder, setCorrectOrder] = useState<ILevelData[]>([]);
  const [totalError, setTotalError] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("gdquiz_levels");
    if (!stored) return;

    const parsed: ILevelData[] = JSON.parse(stored);
    setUserTop(parsed);

    const sorted = [...parsed].sort((a, b) => a.place - b.place);
    setCorrectOrder(sorted);

    const errorSum = parsed.reduce((sum, level, i) => {
      const correctIndex = sorted.findIndex((l) => l.id === level.id);
      return sum + Math.abs(correctIndex - i);
    }, 0);
    setTotalError(errorSum);
  }, []);

  const getCardColor = (level: ILevelData, index: number): string => {
    const correctIndex = correctOrder.findIndex((l) => l.id === level.id);
    if (correctIndex === -1) return "bg-gray-700";
    return correctIndex === index ? "bg-green-700/30" : "bg-red-700/30";
  };

  const getRelativePlace = (level: ILevelData): number => {
    const sorted = [...userTop].sort((a, b) => a.place - b.place);
    return sorted.findIndex((l) => l.id === level.id) + 1;
  };

  const restart = () => {
    localStorage.removeItem("gdquiz_levels");
    router.push("/quiz");
  };

  return (
    <>
      <BgWrapper />
      <Header />
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
                src={`https://img.youtube.com/vi/${getVideoId(
                  level.video
                )}/hqdefault.jpg`}
                alt={level.name}
                className="w-full aspect-video object-cover rounded-md border border-white/10"
              />
            </li>
          ))}
        </ol>

        <div className="text-center mt-10">
          <button
            onClick={restart}
            className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
          >
            Сыграть ещё раз
          </button>
        </div>
      </div>
    </>
  );
}
