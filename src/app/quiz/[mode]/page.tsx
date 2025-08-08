"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import useLanguageStore from "@/store/useLanguageStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useQuizStore, { useAllLevelsStore } from "@/store/quizStore";
import { RangeSlider } from "next-range-slider";
import { ToastContainer, toast } from "react-toastify";
import { ILevelData } from "@/types/level";

export default function Mode() {
  const language = useLanguageStore((state) => state.language);
  useScrollReveal();

  const router = useRouter();
  const [count, setCount] = useState(10);
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(1390);
  const [pos, setPos] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState<ILevelData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLevels, setFilteredLevels] = useState<ILevelData[]>([]);
  const path = usePathname();
  const mode = path.split("/")[2];
  const [error, setError] = useState(false);

  useEffect(() => {
    const all = useAllLevelsStore.getState().allLevels;
    if (all.length > 0) {
      setPos(all.length);
      setHigh(all.length);
      setFilteredLevels(all);
    }
  }, []);

  useEffect(() => {
    const allLevels = useAllLevelsStore.getState().allLevels;
    if (searchTerm.trim() === "") {
      setFilteredLevels(allLevels);
    } else {
      const results = allLevels.filter(
        (level) =>
          level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          level.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          level.verifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          level.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          level.holder.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLevels(results);
    }
    if (useAllLevelsStore.getState().allLevels.length === 0) {
      setError(true);
    }
  }, [searchTerm]);

  const handleLevelSelect = (level: ILevelData) => {
    if (selectedLevels.some((l) => l.id === level.id)) {
      setSelectedLevels(selectedLevels.filter((l) => l.id !== level.id));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const handleStart = async () => {
    useQuizStore.getState().setCustom(count, low, high);
    const seed = nanoid(6);
    await fetch("/api/seed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seed,
        mode,
        levels: useQuizStore.getState().selectedLevels,
      }),
    });
    router.push(`/quiz/${mode}/${seed}`);
  };

  const handlePlay = async () => {
    if (selectedLevels.length < 3) {
      toast.error(
        language === "en" ? "Not enough levels!" : "Недостаточно уровней!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      const seed = await pushDB();
      router.push(`/quiz/${mode}/${seed}`);
    }
  };

  const pushDB = async () => {
    const seed = nanoid(6);
    await fetch("/api/seed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seed,
        mode,
        levels: selectedLevels.sort(() => 0.5 - Math.random()),
      }),
    });
    return seed;
  };

  const handleCopy = async () => {
    if (selectedLevels.length < 3) {
      toast.error(
        language === "en" ? "Not enough levels!" : "Недостаточно уровней!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      const seed = await pushDB();
      navigator.clipboard.writeText(
        `http://gd-quiz.vercel.app/quiz/friend/${seed}`
      );
      toast.success(
        language === "en"
          ? "Link copied to clipboard!"
          : "Ссылка скопирована в буфер обмена!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <>
      {error ? (
        <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white relative animate-[slideUp_1s_ease-out_0.5s_both] flex justify-center items-center flex-col gap-4">
          <div className="text-red-500 text-center mb-4">
            {language === "en" ? (
              <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                Error: Unable to fetch levels. Please dm me on{" "}
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
              </h1>
            ) : (
              <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                Ошибка: Не удалось загрузить уровни. Пожалуйста, сообщите об
                ошибке в{" "}
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
              </h1>
            )}
          </div>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
          >
            {language === "en" ? "Go back" : "Вернуться назад"}
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
          <ToastContainer />
          {mode === "custom" && (
            <>
              <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                🎮 Custom Game
              </h1>

              <div className="grid gap-4 w-full max-w-md animate-[slideUp_1s_ease-out_1s_both]">
                <label className="flex flex-col">
                  <span className="mb-1 text-sm text-gray-300">
                    {language === "en"
                      ? "Number of levels"
                      : "Количество уровней"}
                    :
                  </span>
                  <input
                    type="number"
                    min={3}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="rounded-lg bg-black/20 border border-white/10 px-4 py-2 text-white"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="mb-1 text-sm text-gray-300">
                    {language === "en" ? "Range" : "Диапазон"}:
                  </span>
                  {pos > 1 && (
                    <RangeSlider
                      min={1}
                      max={pos}
                      step={50}
                      options={{
                        leftInputProps: {
                          value: low,
                          onChange: (e) => setLow(Number(e.target.value)),
                        },
                        rightInputProps: {
                          value: high,
                          onChange: (e) => setHigh(Number(e.target.value)),
                        },
                      }}
                    />
                  )}
                </label>

                <button
                  onClick={handleStart}
                  className="mt-8 bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
                >
                  {language === "en" ? "Play" : "Играть"}
                </button>
              </div>
            </>
          )}
          {mode === "friend" && (
            <>
              <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                🎮 Friend Game
              </h1>

              {/* Добавленный поиск уровней */}
              <div className="w-full max-w-md mb-8 animate-[slideUp_1s_ease-out_0.5s_both]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      language === "en"
                        ? "Search levels..."
                        : "Поиск уровней..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg bg-black/20 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-blue)] focus:border-transparent"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    {selectedLevels.length}/{filteredLevels.length}{" "}
                    {language === "en" ? "selected" : "выбрано"}
                  </div>
                </div>

                <div className="mt-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--neon-purple)] scrollbar-track-transparent">
                  {filteredLevels.length === 0
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="p-3 mb-2 rounded-lg bg-black/20 animate-pulse"
                        >
                          <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                          <div className="flex justify-between">
                            <div className="h-3 bg-white/20 rounded w-1/4"></div>
                            <div className="h-3 bg-white/20 rounded w-1/4"></div>
                          </div>
                          <div className="h-3 bg-white/20 rounded w-1/2 mt-2"></div>
                        </div>
                      ))
                    : filteredLevels.map((level) => (
                        <div
                          key={level.id}
                          onClick={() => handleLevelSelect(level)}
                          className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                            selectedLevels.some((l) => l.id === level.id)
                              ? "bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] text-gray-900"
                              : "bg-black/20 hover:bg-black/30"
                          }`}
                        >
                          <div className="font-bold">{level.name}</div>
                          <div className="flex justify-between text-sm">
                            <span>#{level.place}</span>
                            <span>{level.verifier}</span>
                          </div>
                          {level.description && (
                            <div className="text-sm mt-1">
                              {level.description.slice(0, 50)}...
                            </div>
                          )}
                        </div>
                      ))}
                </div>
              </div>

              <div className="grid gap-4 w-full">
                <div className="flex gap-4 mt-8 justify-center">
                  <button
                    onClick={handlePlay}
                    className={`bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full`}
                  >
                    {language === "en" ? "Play" : "Играть"}
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full`}
                  >
                    {language === "en" ? "Copy link" : "Скопировать ссылку"}
                  </button>
                </div>
              </div>
            </>
          )}
          {mode !== "custom" && mode !== "friend" && (
            <h1 className="text-4xl font-bold mb-6 font-[Russo_One]">
              There's no this Mode
            </h1>
          )}
        </div>
      )}
    </>
  );
}
