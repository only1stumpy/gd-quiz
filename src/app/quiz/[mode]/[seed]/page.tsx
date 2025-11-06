"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ILevelData } from "@/types/level";
import SortableLevel from "@/components/SortableLevel";
import getVideoId from "@/functions/getVideoId";
import useLanguageStore from "@/store/useLanguageStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import HowToPlay from "@/components/HowToPlay";
import useQuizStore from "@/store/quizStore";
import { usePathname } from "next/navigation";
import { safeLocalStorage } from "@/functions/safeLocalStorage";
import { useRouter } from "next/navigation";
export default function QuizPage() {
  const router = useRouter();
  const path = usePathname();
  const pathname = path.split("/")[2];
  const seed = path.split("/")[3];
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFromDB() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/seed/get?seed=${seed}&mode=${pathname}`);

        if (!res.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const data = await res.json();

        if (data.levels && Array.isArray(data.levels) && data.levels.length > 0) {
          useQuizStore.getState().setSelectedLevels(data.levels);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFromDB();
  }, [seed, pathname]);
  const language = useLanguageStore((state) => state.language);
  useScrollReveal();
  const selectedLevels = useQuizStore((state) => state.selectedLevels);
  const [watchedLevels, setWatchedLevels] = useState<ILevelData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean | null>(null);
  let mode: number = selectedLevels.length;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleNext = () => {
    const current = selectedLevels[currentIndex];
    setWatchedLevels((prev) => [...prev, current]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = watchedLevels.findIndex((lvl) => lvl.id === active.id);
      const newIndex = watchedLevels.findIndex((lvl) => lvl.id === over.id);
      setWatchedLevels((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleSubmit = async () => {
    const saved = safeLocalStorage.setItem("gdquiz_levels", watchedLevels);
    if (!saved) {
      console.warn("Failed to save quiz results, but continuing anyway");
    }
    router.push(`${path}/result`);
  };

  const currentLevel = selectedLevels[currentIndex];
  const videoId = currentLevel ? getVideoId(currentLevel.video) : null;

  return (
    <>
      {showHowToPlay && (
        <HowToPlay onClose={() => setShowHowToPlay(false)} num={mode} />
      )}
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--neon-blue)] mb-4"></div>
            <p className="text-white text-xl">
              {language === "en" ? "Loading quiz..." : "Загрузка квиза..."}
            </p>
          </div>
        </div>
      ) : error ? (
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
        <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white relative animate-[slideUp_1s_ease-out_0.5s_both]">
          <button
            onClick={() => setShowHowToPlay(true)}
            aria-label={language === "en" ? "Show how to play instructions" : "Показать инструкции"}
            className="text-sm text-[var(--neon-blue)] hover:underline cursor-pointer absolute top-10 right-4 font-semibold border border-[var(--neon-blue)] rounded-full px-3 py-1 transition duration-300 ease-linear hover:bg-[var(--neon-blue)] hover:text-white shadow-[0_0_10px_rgba(0,255,255,0.5)] z-10 hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] animate-[fadeIn_1s_ease-out_1s_both]"
          >
            i
          </button>
          <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
            {language === "en" ? "View levels" : "Просмотр уровней"}
          </h1>
          {currentLevel ? (
            <div className="mb-8 animate-[slideUp_1s_ease-out_0.7s_both]">
              <p className="text-center font-semibold mb-2">
                {language === "en" ? "Level " : "Уровень "}
                {currentIndex + 1} / {selectedLevels.length} —{" "}
                {currentLevel.name}
              </p>
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`${currentLevel.name} - Geometry Dash level showcase`}
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={handleNext}
                  className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
                >
                  {currentIndex < mode - 1
                    ? language === "en"
                      ? "Next level"
                      : "Следующий уровень"
                    : language === "en"
                    ? "Go to top"
                    : "Перейти к топу"}
                </button>
              </div>
            </div>
          ) : null}

          {watchedLevels.length > 0 && (
            <div className="animate-[slideUp_1s_ease-out_1s_both]">
              <h2 className="text-xl font-semibold text-center mb-2">
                {language === "en" ? "Your current top" : "Твой текущий топ"}
              </h2>
              <p className="text-center text-sm text-gray-400 mb-4">
                {language === "en"
                  ? "Drag the levels. At the top - hardest."
                  : "Перетаскивай уровни. Сверху — самый сложный."}
              </p>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={watchedLevels.map((lvl) => lvl.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {watchedLevels.map((level, index) => (
                    <SortableLevel key={level.id} level={level} index={index} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          )}

          {watchedLevels.length === mode && (
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
              >
                {language === "en" ? "Submit top" : "Отправить топ"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
