"use client";

import useLanguageStore from "@/store/useLanguageStore";
import Link from "next/link";

export default function Header() {
  const language = useLanguageStore((state) => state.language);
  const setEnglish = useLanguageStore((state) => state.setEnglish);
  const setRussian = useLanguageStore((state) => state.setRussian);

  return (
    <header className="relative bg-transparent py-[1rem] z-100">
      <div className="max-w-[1200px] mx-auto px-[2rem] flex justify-between items-center flex-col md:flex-row gap-1">
        <div className="font-[orbitron] text-2xl font-black bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
          <Link href="/">GDQuiz</Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-70 mr-1">Language:</span>
          <button
            className={`bg-[var(--card-bg)] border-1 border-black/20 text-white py-2 px-4 rounded-3xl cursor-pointer transition duration-300 ease-linear font-medium hover:bg-gray-700 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] backdrop-blur-md ${
              language === "en"
                ? "bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                : ""
            }`}
            onClick={() => setEnglish()}
          >
            EN
          </button>
          <button
            className={`bg-[var(--card-bg)] border-1 border-black/20 text-white py-2 px-4 rounded-3xl cursor-pointer transition duration-300 ease-linear font-medium hover:bg-gray-700 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] backdrop-blur-md ${
              language === "ru"
                ? "bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                : ""
            }`}
            onClick={() => setRussian()}
          >
            RU
          </button>
        </div>
      </div>
    </header>
  );
}
