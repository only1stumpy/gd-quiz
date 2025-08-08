"use client";
import useLanguageStore from "@/store/useLanguageStore";
import { useEffect } from "react";

export default function HowToPlay({
  onClose,
  num,
}: {
  onClose: any;
  num: number;
}) {
  const language = useLanguageStore((state) => state.language);

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
          className="absolute top-3 right-4 text-white text-xl hover:text-red-400"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {language === "en" ? "How to Play" : "Как играть"}
        </h2>

        {language === "en" ? (
          <>
            <p className="mb-2">
              You will be shown {num} random demons from the{" "}
              <a
                href="https://demonlist.org/"
                className="text-blue-300 underline cursor-pointer"
                rel="noopener noreferrer"
                target="_blank"
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
            <p className="mb-2">
              Stay tuned and join our{" "}
              <a
                href="https://discord.gg/H4EU4KvSkR"
                className="text-blue-300 underline cursor-pointer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Discord server
              </a>{" "}
              or{" "}
              <a
                href="https://t.me/only1stumpyy"
                className="text-blue-300 underline cursor-pointer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Telegram
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="mb-2">
              Тебе будет показано 10 случайных демонов из{" "}
              <a
                href="https://demonlist.org/"
                className="text-blue-300 underline cursor-pointer"
                rel="noopener noreferrer"
                target="_blank"
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
            <p className="mb-2">
              Следи за обновлениями и вступай в наш{" "}
              <a
                href="https://discord.gg/H4EU4KvSkR"
                className="text-blue-300 underline cursor-pointer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Discord сервер
              </a>{" "}
              или в{" "}
              <a
                href="https://t.me/only1stumpyy"
                className="text-blue-300 underline cursor-pointer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Telegram
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
