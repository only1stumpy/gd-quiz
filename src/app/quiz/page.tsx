"use client";
import useLanguageStore from "@/store/useLanguageStore";
import { useEffect, useState } from "react";
import { ILevelData } from "@/types/level";
import useQuizStore, { useAllLevelsStore } from "@/store/quizStore";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "react-toastify";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const allLevels = useAllLevelsStore((state) => state.allLevels);
  useScrollReveal();
  const router = useRouter();
  const fetchLevels = async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/levels", { signal });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();

      if (!signal.aborted && result?.data?.length) {
        useAllLevelsStore.getState().setAllLevels(result.data);
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      }
      console.error("Failed to fetch levels:", err);
      toast.error(
        language === "en"
          ? "Failed to fetch levels! Please reload page and try again."
          : "Не удалось загрузить уровни! Пожалуйста, перезагрузите страницу и попробуйте снова.",
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
    } finally {
      if (!signal.aborted) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (allLevels.length > 0) return;

    const controller = new AbortController();
    fetchLevels(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);
  const storeLevels = async (mode: string) => {
    setIsLoading(true);
    const seed = nanoid(6);
    const data = allLevels;
    let selected: ILevelData[] = [];
    if (mode === "easy") {
      useQuizStore.getState().setEasy();
    } else if (mode === "normal") {
      useQuizStore.getState().setNormal();
    } else if (mode === "hard") {
      const randomStart = Math.floor(Math.random() * (data.length - 100));
      useQuizStore.getState().setHard(randomStart);
    }
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

  return (
    <div className=" flex justify-center items-center flex-col">
      {isLoading ? (
        <div className="space-y-6 animate-pulse flex items-center justify-center w-screen h-screen">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-bold mt-12 text-center animate-[slideUp_1s_ease-out_0.5s_both]">
            {language === "en" ? "Choose the difficulty" : "Выбери сложность"}
          </h1>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-center gap-8 mt-12 max-w-[75vw] max-md:grid-cols-1">
            <div className="bg-[var(--card-bg)] border-1 border-[var(--card-border)] rounded-3xl p-8 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 animate-[slideUp_1s_ease-out_0.7s_both]">
              <p>
                {language === "en" ? "Number of levels" : "Количество уровней"}:
                5
              </p>
              <p>
                {language === "en" ? "Range: all top" : "Диапазон: весь топ"}
              </p>
              <button
                className="bg-linear-45 from-[var(--easy-color)] to-[var(--neon-blue)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-4 px-10 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full mt-10"
                onClick={() => storeLevels("easy")}
              >
                {language === "en" ? "Easy" : "Легкий"}
              </button>
            </div>
            <div className="bg-[var(--card-bg)] border-1 border-[var(--card-border)] rounded-3xl p-8 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 animate-[slideUp_1s_ease-out_0.9s_both]">
              <p>
                {language === "en" ? "Number of levels" : "Количество уровней"}:
                10
              </p>
              <p>
                {language === "en" ? "Range: all top" : "Диапазон: весь топ"}
              </p>
              <button
                className="bg-linear-45 from-[var(--neon-blue)] to-[var(--normal-color)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-4 px-10 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full mt-10"
                onClick={() => storeLevels("normal")}
              >
                {language === "en" ? "Normal" : "Обычный"}
              </button>
            </div>
            <div className="bg-[var(--card-bg)] border-1 border-[var(--card-border)] rounded-3xl p-8 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 animate-[slideUp_1s_ease-out_1.1s_both]">
              <p>
                {language === "en" ? "Number of levels" : "Количество уровней"}:
                10
              </p>
              <p>
                {language === "en"
                  ? "Range: random 100 range (like top 700-800 or 220-320)"
                  : "Диапазон: рандомный диапазон 100 уровней (например, топ 700-800 или 220-320)"}
              </p>
              <button
                className="bg-linear-45 from-[var(--normal-color)] to-[var(--hard-color)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-4 px-10 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full mt-4"
                onClick={() => storeLevels("hard")}
              >
                {language === "en" ? "Hard" : "Сложный"}
              </button>
            </div>
            <div className="bg-[var(--card-bg)] border-1 border-[var(--card-border)] rounded-3xl p-8 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 animate-[slideUp_1s_ease-out_1.3s_both]">
              <p>
                {language === "en" ? "Number of levels" : "Количество уровней"}:
                custom
              </p>
              <p>
                {language === "en"
                  ? "Range: custom"
                  : "Диапазон: настраиваемый"}
              </p>
              <button
                className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-4 px-10 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full mt-10"
                onClick={() => router.push(`/quiz/custom`)}
              >
                {language === "en" ? "Custom" : "Кастомная"}
              </button>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] rounded-3xl p-6 md:p-12 my-6 md:my-12 mx-4 md:mx-8 backdrop-blur-md border-1 border-[var(--card-border)] max-w-[75vw] animate-[slideUp_1s_ease-out_1.5s_both]">
            <div className="flex flex-col justify-center items-center gap-8 text-center">
              <h2 className="text-3xl font-bold mt-10 mb-4 text-center">
                {language === "en"
                  ? "Create your own game!"
                  : "Сделай свою собственную игру!"}
              </h2>
              <p>
                {language === "en"
                  ? "You can create your own game with any levels you want. You can choose number of levels, choose any level, copy link and send your friends!"
                  : "Ты можешь создать свою собственную игру с любыми уровнями, которые ты хочешь. Ты можешь выбрать количество уровней, выбрать любой уровень, скопировать ссылку и отправить своим друзьям!"}
              </p>
              <button
                className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-4 px-10 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full mt-4"
                onClick={() => router.push(`/quiz/friend`)}
              >
                {language === "en" ? "Friend" : "Дружеская"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
