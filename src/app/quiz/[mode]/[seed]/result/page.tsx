"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ILevelData } from "@/types/level";
import getVideoId from "@/functions/getVideoId";
import useLanguageStore from "@/store/useLanguageStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { safeLocalStorage } from "@/functions/safeLocalStorage";

export default function ResultPage() {
  const language = useLanguageStore((state) => state.language);
  useScrollReveal();
  const [userTop, setUserTop] = useState<ILevelData[]>([]);
  const [correctOrder, setCorrectOrder] = useState<ILevelData[]>([]);
  const [mistakeCount, setMistakeCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const stored = safeLocalStorage.getItem<ILevelData[]>("gdquiz_levels");
    if (!stored || !Array.isArray(stored)) {
      console.error("No valid quiz data found in localStorage");
      return;
    }

    setUserTop(stored);

    const correct = [...stored].sort((a, b) => a.place - b.place);
    setCorrectOrder(correct);

    let mistakeCount = 0;

    stored.forEach((level, i) => {
      const correctIndex = correct.findIndex((l) => l.id === level.id);
      if (correctIndex !== i) {
        mistakeCount++;
      }
    });

    setMistakeCount(mistakeCount);
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
    safeLocalStorage.removeItem("gdquiz_levels");
    router.push("/quiz");
  };
  const numberOfLevels = userTop.length;

  return (
    <>
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold text-center mb-4 animate-[slideUp_1s_ease-out_0.5s_both]">
          {language === "en" ? "Results" : "Результаты"}
        </h1>

        {language === "en" ? (
          <p className="text-center text-xl text-gray-400 mb-2 animate-[slideUp_1s_ease-out_0.7s_both]">
            Thank you for playing! Join our{" "}
            <a
              href="https://discord.gg/H4EU4KvSkR"
              className="text-blue-300 underline cursor-pointer"
            >
              Discord server
            </a>{" "}
            or{" "}
            <a
              href="https://t.me/only1stumpyy"
              className="text-blue-300 underline cursor-pointer"
            >
              Telegram
            </a>
          </p>
        ) : (
          <p className="text-center text-xl text-gray-400 mb-2 animate-[slideUp_1s_ease-out_0.7s_both]">
            Спасибо за игру! Вступай в наш{" "}
            <a
              href="https://discord.gg/H4EU4KvSkR"
              className="text-blue-300 underline cursor-pointer"
            >
              Discord сервер
            </a>{" "}
            или в{" "}
            <a
              href="https://t.me/only1stumpyy"
              className="text-blue-300 underline cursor-pointer"
            >
              Telegram
            </a>
          </p>
        )}

        <p className="text-center text-sm text-gray-400 mb-2 animate-[slideUp_1s_ease-out_0.8s_both]">
          {language === "en"
            ? "Here are your results, green is correct, red is wrong"
            : "Вот результаты квиза, зелёное — правильно, красное — ошибка"}
        </p>
        <p className="text-center text-sm text-red-600 mb-6 animate-[slideUp_1s_ease-out_0.9s_both]">
          {language === "en" ? "Sum of errors" : "Сумма ошибок"}: {mistakeCount}{" "}
        </p>

        <ol className="space-y-4">
          {userTop.map((level, index) => (
            <li
              key={level.id}
              className={`${getCardColor(
                level,
                index
              )} p-4 rounded-xl border border-white/10 backdrop-blur animate-[slideUp_1s_ease-out_1s_both]`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-300">
                  #{index + 1}{" "}
                  {language === "en" ? "in your top" : "в твоём топе"}
                </div>
                <div className="text-sm text-white/80">
                  {language === "en"
                    ? `Real place among these ${numberOfLevels}`
                    : `Реальное место среди этих ${numberOfLevels}`}
                  : {getRelativePlace(level)}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold mb-2">{level.name}</p>
                <div className="text-sm text-white/80">
                  {language === "en"
                    ? "Placement in global demon list"
                    : "Место в глобале"}
                  : {level.place}
                </div>
              </div>
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
            {language === "en" ? "Play again" : "Сыграть ещё раз"}
          </button>
        </div>
      </div>
    </>
  );
}
