import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="scroll-reveal text-center py-12 px-8 border-t-1 border-(--card-border) mt-12">
      {language === "en" ? (
        <p>
          Created with ❤️ by <a href="https://t.me/only1stumpy">only1stumpy</a>©
          2025 | Ready to prove your GD knowledge?
        </p>
      ) : (
        <p>
          Создано с ❤️ <a href="https://t.me/only1stumpy">only1stumpy</a> © 2025
          | Готовы доказать свои знания GD?
        </p>
      )}
    </footer>
  );
}
