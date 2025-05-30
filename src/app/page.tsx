"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Particles
    const createParticles = () => {
      const container = document.querySelector(".particles");
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-[2px] h-[2px] rounded-full bg-[var(--neon-blue)] animate-[particles]";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${Math.random() * 3 + 5}s`;
        container.appendChild(particle);
      }
    };

    // Language Switch
    const initLanguageSwitch = () => {
      const savedLang = localStorage.getItem("language") || "en";
      document.documentElement.setAttribute("data-lang", savedLang);

      document
        .querySelectorAll<HTMLButtonElement>(".language-btn")
        .forEach((btn) => {
          if (btn.getAttribute("data-lang") === savedLang) {
            btn.classList.add(
              "bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.5)]"
            );
          }

          btn.addEventListener("click", function () {
            const lang = this.getAttribute("data-lang");
            if (!lang) return;

            document.documentElement.setAttribute("data-lang", lang);
            localStorage.setItem("language", lang);

            document
              .querySelectorAll(".language-btn")
              .forEach((b) =>
                b.classList.remove(
                  "bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                )
              );
            this.classList.add(
              "bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.5)]"
            );
          });
        });
    };

    // Scroll Reveal
    const initScrollReveal = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((el) => {
        observer.observe(el);
      });
    };

    createParticles();
    initLanguageSwitch();
    initScrollReveal();
  }, []);

  const goToApp = () => {
    window.location.href = "/pages";
  };
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-linear-45 from-[#0a0a0f] from-0% via-[#1a1a2e] via-50% to-[#16213e] to-100% ">
        <div className="absolute w-full h-full overflow-hidden">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="absolute w-full h-full"></div>
      </div>

      <header className="relative bg-transparent py-[1rem] z-100">
        <div className="max-w-[1200px] mx-auto px-[2rem] flex justify-between items-center">
          <div className="font-[orbitron] text-2xl font-black bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
            GDQuiz
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-70 mr-1">Language:</span>
            <button
              className={`bg-[var(--card-bg)] border-1 border-black/20 text-white py-2 px-4 rounded-3xl cursor-pointer transition duration-300 ease-linear font-medium hover:bg-gray-700 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] backdrop-blur-md ${
                language === "en"
                  ? "bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                  : ""
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              className={`bg-[var(--card-bg)] border-1 border-black/20 text-white py-2 px-4 rounded-3xl cursor-pointer transition duration-300 ease-linear font-medium hover:bg-gray-700 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] backdrop-blur-md ${
                language === "ru"
                  ? "bg-linear-45 from-[var(--neon-blue)] to-[var(--neon-purple)] shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                  : ""
              }`}
              onClick={() => setLanguage("ru")}
            >
              RU
            </button>
          </div>
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center relative p-8">
        <div className="text-center max-w-[800px] z-10">
          <h1 className="text-title font-black font-[orbitron] bg-linear-45 from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-green)] bg-clip-text text-transparent animate-[glow_2s_ease-in-out_infinite_alternate]">
            GDQuiz
          </h1>

          <p className="text-subtitle mb-6 opacity-90 animate-[slideUp_1s_ease-out_0.5s_both]">
            by only1stumpy
          </p>

          <p className="hero-description">
            {language === "en"
              ? "Think you know Geometry Dash? Test your skills by ranking the hardest levels from easiest to most impossible. Can you beat the ultimate difficulty challenge?"
              : "Думаете, что знаете Geometry Dash? Проверьте свои навыки, ранжируя сложнейшие уровни от самого легкого до самого невозможного. Сможете ли вы пройти испытание сложности?"}
          </p>

          <button className="cta-button">
            {language === "en" ? "Start Challenge" : "Начать испытание"}
          </button>
        </div>
      </section>

      <section className="stats scroll-reveal">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">1300+</span>
            <p className="stat-label">
              {language === "en" ? "Hardest Levels" : "Сложнейших уровней"}
            </p>
          </div>
          <div className="stat-item">
            <span className="stat-number">10</span>
            <p className="stat-label">
              {language === "en" ? "Levels Per Quiz" : "Уровней в квизе"}
            </p>
          </div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <p className="stat-label">
              {" "}
              {language === "en" ? "Attempts" : "Попыток"}
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card scroll-reveal">
            <div className="feature-icon">🎮</div>
            <h3 className="feature-title">
              {language === "en" ? "Legendary Levels" : "Легендарные уровни"}
            </h3>
            <p className="feature-description">
              {language === "en"
                ? "Face the most brutal and legendary levels from the Geometry Dash demon list. From Amethyst to The Golden to Black Flag - can you rank them correctly?"
                : "Столкнитесь с самыми жестокими и легендарными уровнями из списка демонов Geometry Dash. От Amethyst до The Golden до Black Flag - сможете ли вы ранжировать их правильно?"}
            </p>
          </div>

          <div className="feature-card scroll-reveal">
            <div className="feature-icon">📺</div>
            <h3 className="feature-title">
              {language === "en" ? "Epic Showcases" : "Эпичные демонстрации"}
            </h3>
            <p className="feature-description">
              {language === "en"
                ? "Watch mind-blowing YouTube videos of the most skilled players conquering impossible levels. See the raw difficulty in action before making your choice."
                : "Смотрите умопомрачительные YouTube-видео самых искусных игроков, покоряющих невозможные уровни. Увидьте настоящую сложность в действии перед выбором."}
            </p>
          </div>

          <div className="feature-card scroll-reveal">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">
              {language === "en" ? "Ultimate Test" : "Главное испытание"}
            </h3>
            <p className="feature-description">
              {language === "en"
                ? "Prove your mastery by comparing your rankings with the official difficulty list. Only true GD legends can achieve perfect scores!"
                : "Докажите свое мастерство, сравнив свои рейтинги с официальным списком сложности. Только настоящие легенды GD могут достичь идеальных результатов!"}
            </p>
          </div>
        </div>
      </section>
      <footer className="footer scroll-reveal">
        {language === "en" ? (
          <p>
            Created with ❤️ by{" "}
            <a href="https://t.me/only1stumpy">only1stumpy</a> © 2025 | Ready to
            prove your GD knowledge?
          </p>
        ) : (
          <p>
            Создано с ❤️ <a href="https://t.me/only1stumpy">only1stumpy</a> ©
            2025 | Готовы доказать свои знания GD?
          </p>
        )}
      </footer>
    </div>
  );
}
