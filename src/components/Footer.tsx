"use client";

import useLanguageStore from "@/store/useLanguageStore";

export default function Footer() {
  const language = useLanguageStore((state) => state.language);
  return (
    <footer className="scroll-reveal text-center py-12 px-8 border-t-1 border-(--card-border) mt-12">
      {language === "en" ? (
        <p>
          Created with ❤️ by <a href="https://t.me/only1stumpyy">only1stumpy</a>
          © 2025 | If you find any bugs, dm me on{" "}
          <a
            href="https://t.me/only1stumpyy"
            className="text-blue-300 underline cursor-pointer"
            rel="noopener noreferrer"
            target="_blank"
          >
            Telegram
          </a>{" "}
          or{" "}
          <a
            href="https://discord.gg/H4EU4KvSkR"
            className="text-blue-300 underline cursor-pointer"
            rel="noopener noreferrer"
            target="_blank"
          >
            Discord
          </a>
        </p>
      ) : (
        <p>
          Создано с ❤️ <a href="https://t.me/only1stumpyy">only1stumpy</a> ©
          2025 | Если найдешь баг, пиши в{" "}
          <a
            href="https://t.me/only1stumpyy"
            className="text-blue-300 underline cursor-pointer"
            rel="noopener noreferrer"
            target="_blank"
          >
            Telegram
          </a>{" "}
          или в{" "}
          <a
            href="https://discord.gg/H4EU4KvSkR"
            className="text-blue-300 underline cursor-pointer"
            rel="noopener noreferrer"
            target="_blank"
          >
            Discord
          </a>
        </p>
      )}
    </footer>
  );
}
