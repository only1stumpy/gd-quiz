import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="scroll-reveal text-center py-12 px-8 border-t-1 border-(--card-border) mt-12">
      {language === "en" ? (
        <p>
          Created with ❤️ by <a href="https://t.me/only1stumpyy">only1stumpy</a>
          © 2025 | If you find any bugs, dm me on{" "}
          <a
            href="https://t.me/only1stumpyy"
            className="text-blue-300 underline cursor-pointer"
          >
            Telegram
          </a>{" "}
          or{" "}
          <a
            href="discord://discord.com/users/566557479127875602"
            className="text-blue-300 underline cursor-pointer"
          >
            Discord
          </a>
        </p>
      ) : (
        <p>
          Создано с ❤️ <a href="https://t.me/only1stumpyy">only1stumpy</a> ©
          2025 | Если найдешь баг, пиши в{" "}
          <a
            href="https://t.me/only1stumpy"
            className="text-blue-300 underline cursor-pointer"
          >
            Telegram
          </a>{" "}
          или в{" "}
          <a
            href="discord://discord.com/users/566557479127875602"
            className="text-blue-300 underline cursor-pointer"
          >
            Discord
          </a>
        </p>
      )}
    </footer>
  );
}
