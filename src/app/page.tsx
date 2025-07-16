"use client";
import useLanguageStore from "@/store/useLanguageStore";
import { Analytics } from "@vercel/analytics/next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

export default function Home() {
  const language = useLanguageStore((state) => state.language);
  useScrollReveal();

  return (
    <div>
      <Analytics />
      <section className="min-h-screen flex items-center justify-center relative p-4 md:p-8 ">
        <div className="text-center max-w-[800px] z-10">
          <h1 className="text-title font-black font-[orbitron] bg-linear-45 from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-green)] bg-clip-text text-transparent animate-[glow_2s_ease-in-out_infinite_alternate]">
            GDQuiz
          </h1>

          <p className="text-subtitle mb-6 opacity-90 animate-[slideUp_1s_ease-out_0.5s_both]">
            by only1stumpy
          </p>

          <p className="text-xl mb-12 opacity-80 animate-[slideUp_1s_ease-out_1s_both]">
            {language === "en"
              ? "Think you know Geometry Dash? Test your skills by ranking the hardest levels from most impossible to easiest. Can you beat the ultimate difficulty challenge?"
              : "Думаете, что знаете Geometry Dash? Проверьте свои навыки, ранжируя сложнейшие уровни от самого невозможного до самого легкого. Сможете ли вы пройти испытание сложности?"}
          </p>
          <Link href="/quiz">
            <button className="bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.3)] border-0 text-white py-6 px-12 text-xl font-bold rounded-[50px] cursor-pointer transition duration-300 ease-linear no-underline inline-block animate-[slideUp_1s_ease-out_1.5s_both] relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.5)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r  before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 hover:before:left-full">
              {language === "en" ? "Start Challenge" : "Начать испытание"}
            </button>
          </Link>
        </div>
      </section>

      <section className="scroll-reveal bg-(--card-bg) rounded-3xl p-6 md:p-12 my-6 md:my-12 mx-4 md:mx-8 backdrop-blur-md border-1 border-(--card-border)">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8 text-center">
          <div className="p-8">
            <span className="font-[orbitron] text-5xl font-black bg-linear-45 from-[var(--neon-green)] to-[var(--neon-blue)] bg-clip-text text-transparent block">
              1300+
            </span>
            <p className="text-base opacity-80 mt-4">
              {language === "en" ? "Hardest Levels" : "Сложнейших уровней"}
            </p>
          </div>
          <div className="p-8">
            <span className="font-[orbitron] text-5xl font-black bg-linear-45 from-[var(--neon-green)] to-[var(--neon-blue)] bg-clip-text text-transparent block">
              10
            </span>
            <p className="text-base opacity-80 mt-4">
              {language === "en" ? "Levels Per Quiz" : "Уровней в квизе"}
            </p>
          </div>
          <div className="p-8">
            <span className="text-5xl font-black bg-linear-45 from-[var(--neon-green)] to-[var(--neon-blue)] bg-clip-text text-transparent block">
              ∞
            </span>
            <p className="text-base opacity-80 mt-4">
              {language === "en" ? "Attempts" : "Попыток"}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-[1fr] md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8 mt-12">
          <div className="scroll-reveal bg-[var(--card-bg)] border-1 border-(--card-border) rounded-3xl p-12 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100">
            <div className="text-5xl mb-8 bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              🎮
            </div>
            <h3 className="text-2xl font-semibold mb-8 text-[var(--neon-blue)]">
              {language === "en" ? "Legendary Levels" : "Легендарные уровни"}
            </h3>
            <p className="opacity-80">
              {language === "en"
                ? "Face the most brutal and legendary levels from the Geometry Dash demon list. From Amethyst to The Golden to Black Flag - can you rank them correctly?"
                : "Столкнитесь с самыми жестокими и легендарными уровнями из списка демонов Geometry Dash. От Amethyst до The Golden до Black Flag - сможете ли вы ранжировать их правильно?"}
            </p>
          </div>

          <div className="scroll-reveal bg-[var(--card-bg)] border-1 border-(--card-border) rounded-3xl p-12 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100">
            <div className="text-5xl mb-8 bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              📺
            </div>
            <h3 className="text-2xl font-semibold mb-8 text-[var(--neon-blue)]">
              {language === "en" ? "Epic Showcases" : "Демонстрация"}
            </h3>
            <p className="opacity-80">
              {language === "en"
                ? "Watch mind-blowing YouTube videos of the most skilled players conquering impossible levels. See the raw difficulty in action before making your choice."
                : "Смотрите умопомрачительные YouTube-видео самых искусных игроков, покоряющих невозможные уровни. Увидьте настоящую сложность в действии перед выбором."}
            </p>
          </div>

          <div className="scroll-reveal bg-[var(--card-bg)] border-1 border-(--card-border) rounded-3xl p-12 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100">
            <div className="text-5xl mb-8 bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              🏆
            </div>
            <h3 className="text-2xl font-semibold mb-8 text-[var(--neon-blue)]">
              {language === "en" ? "Ultimate Test" : "Главное испытание"}
            </h3>
            <p className="opacity-80">
              {language === "en"
                ? "Prove your mastery by comparing your rankings with the official difficulty list. Only true GD legends can achieve perfect scores!"
                : "Докажите свое мастерство, сравнив свои рейтинги с официальным списком сложности. Только настоящие легенды GD могут достичь идеальных результатов!"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
