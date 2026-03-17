"use client";
import { Analytics } from "@vercel/analytics/next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";
import {useLocales} from "@/hooks/useLocales";
import {Button} from "@/components/ui/Button";
import {HomeCard} from "@/components/ui/HomeCard";


export default function Home() {
  useScrollReveal()  // Эффект появления при скролле
  const { locale } = useLocales() // i18n
  const items = [
    {title: "1700+", description: locale("home.hardest")},
    {title: "10", description: locale("home.levels")},
    {title: "∞", description: locale("home.att")}
  ]

  return (
      <div>
        <Analytics/>
        <section className="min-h-screen flex items-center justify-center relative p-4 md:p-8 ">
          <div className="text-center max-w-200 z-10">
            <h1 className="text-title font-black font-[orbitron] bg-linear-45 from-(--neon-blue) via-(--neon-purple) to-(--neon-green) bg-clip-text text-transparent animate-[glow_2s_ease-in-out_infinite_alternate]">
              GDQuiz
            </h1>

            <p className="text-subtitle mb-6 opacity-90 animate-[slideUp_1s_ease-out_0.5s_both]">
              by only1stumpy
            </p>

            <p className="text-xl mb-12 opacity-80 animate-[slideUp_1s_ease-out_1s_both]">
              {locale("home.desc")}
            </p>
            <Link href="/quiz">
              <Button textContent={locale("home.button")} type="main"/>
            </Link>
          </div>
        </section>
        <section
            className="scroll-reveal bg-(--card-bg) rounded-3xl p-6 md:p-12 my-6 md:my-12 mx-4 md:mx-8 backdrop-blur-md border border-(--card-border)">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-center">
            {
              items.map((item, index) => {
                return (
                    <div className="p-8" key={index}>
                      <span
                          className="font-[orbitron] text-5xl font-black bg-linear-45 from-(--neon-green) to-(--neon-blue) bg-clip-text text-transparent block">
                    {item.title}
                      </span>
                      <p className="text-base opacity-80 mt-4">
                        {item.description}
                      </p>
                    </div>
                );
              })
            }
          </div>
        </section>
        <section className="py-20 px-8 max-w-300 mx-auto">
          <div className="grid grid-cols-[1fr] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-12">
            <HomeCard badge="🎮" title={locale("home.legendary")} description={locale("home.brutal")}/>
            <HomeCard badge="📺" title={locale("home.epic")} description={locale("home.vid")}/>
            <HomeCard badge="🏆" title={locale("home.ultimate")} description={locale("home.mastery")}/>
          </div>
        </section>
      </div>
  );

}
