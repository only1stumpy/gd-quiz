"use client";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function HowToPlay({
  isFirstVisit,
  onClose,
}: {
  isFirstVisit: boolean;
  onClose: () => void;
}) {
  const { language } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[var(--card-bg)] text-white rounded-2xl p-6 max-w-4xl w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl hover:text-red-400"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {language === "en" ? "How to Play" : "Как играть"}
        </h2>

        {language === "en" ? (
          <>
            <p className="mb-2">
              You will be shown 10 random demons from the{" "}
              <a
                href="https://demonlist.org/"
                className="text-blue-300 underline cursor-pointer"
              >
                Global Demonlist
              </a>
              . Your task is to rank them from hardest (top) to easiest
              (bottom).
            </p>
            <p className="mb-2">
              Watch the video of each level, then place it in your top using
              drag-and-drop.
            </p>
            {isFirstVisit && (
              <p className="mb-2">
                Soon you'll be able to choose difficulty ranges and other
                options. Stay tuned and join our{" "}
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
            )}
          </>
        ) : (
          <>
            <p className="mb-2">
              Тебе будет показано 10 случайных демонов из{" "}
              <a
                href="https://demonlist.org/"
                className="text-blue-300 underline cursor-pointer"
              >
                Global Demonlist
              </a>
              . Твоя задача — ранжировать их от самого сложного (вверх) до
              самого лёгкого (вниз).
            </p>
            <p className="mb-2">
              Смотри видео каждого уровня и расставляй их с помощью
              drag-and-drop.
            </p>
            {isFirstVisit && (
              <p className="mb-2">
                В будущем появится выбор сложности и другие настройки. Следи за
                обновлениями и вступай в наш{" "}
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
          </>
        )}
      </div>
    </div>
  );
}
