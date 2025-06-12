"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BgWrapper from "@/components/BgWrapper";
import { ILevelData } from "@/types/level";
import SortableLevel from "@/components/SortableLevel";
import Header from "@/components/Header";
import getVideoId from "@/functions/getVideoId";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import HowToPlay from "@/components/HowToPlay";

export default function QuizPage() {
  const { language } = useLanguage();
  useScrollReveal();
  const [allLevels, setAllLevels] = useState<ILevelData[]>([]);
  const [watchedLevels, setWatchedLevels] = useState<ILevelData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "https://gd-quiz-api.vercel.app/api/levels"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        console.log("Fetched levels:", result);

        const shuffled = [...result.data].sort(() => 0.5 - Math.random());
        const random10 = shuffled.slice(0, 10);

        setAllLevels(random10);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  const handleNext = () => {
    const current = allLevels[currentIndex];
    setWatchedLevels((prev) => [...prev, current]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = watchedLevels.findIndex((lvl) => lvl.id === active.id);
      const newIndex = watchedLevels.findIndex((lvl) => lvl.id === over.id);
      setWatchedLevels((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("gdquiz_levels", JSON.stringify(watchedLevels));
  };

  const currentLevel = allLevels[currentIndex];
  const videoId = currentLevel ? getVideoId(currentLevel.video) : null;

  return (
    <>
      <BgWrapper />
      <Header />
      {showHowToPlay && (
        <HowToPlay
          isFirstVisit={watchedLevels.length === 0}
          onClose={() => setShowHowToPlay(false)}
        />
      )}

      <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white relative">
        <button
          onClick={() => setShowHowToPlay(true)}
          className="text-sm text-[var(--neon-blue)] hover:underline cursor-pointer absolute top-10 right-4 font-semibold border border-[var(--neon-blue)] rounded-full px-3 py-1 transition duration-300 ease-linear hover:bg-[var(--neon-blue)] hover:text-white shadow-[0_0_10px_rgba(0,255,255,0.5)] z-10 hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] animate-[fadeIn_1s_ease-out_1s_both]"
        >
          i
        </button>
        <h1 className="text-5xl text-center mb-4 font-[Russo_One] ">
          {language === "en" ? "View levels" : "Просмотр уровней"}
        </h1>
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <h1 className="text-3xl font-bold text-center mb-4">
              {language === "en"
                ? "Getting the list of levels... Just wait..."
                : "Получаем список уровней... Просто подожди..."}
            </h1>
            <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="aspect-video w-full rounded-lg bg-gray-800"></div>
            <div className="h-16 bg-gray-700 rounded-[50px] w-64 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-8">{error}</div>
        ) : currentLevel ? (
          <div className="mb-8">
            <p className="text-center font-semibold mb-2">
              {language === "en" ? "Level " : "Уровень "}
              {currentIndex + 1} / {allLevels.length} — {currentLevel.name}
            </p>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleNext}
                className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
              >
                {currentIndex < 9
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
          <>
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
          </>
        )}

        {watchedLevels.length === 10 && (
          <div className="text-center mt-8">
            <a href="/result">
              <button
                onClick={handleSubmit}
                className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
              >
                {language === "en" ? "Submit top" : "Отправить топ"}
              </button>
            </a>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
