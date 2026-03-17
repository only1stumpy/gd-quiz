"use client";
import Image from "next/image";
import getVideoId from "@/functions/getVideoId";
import {useLocales} from "@/hooks/useLocales";
import {ExternalLink} from "@/components/ui/ExternalLink";
import {Button} from "@/components/ui/Button";
import {useResults} from "@/hooks/useResults";

export default function ResultPage() {
  const {locale} = useLocales()
  const {
    mistakeCount,
    userTop,
    getCardColor,
    numberOfLevels,
    getRelativePlace,
    restart
  } = useResults();



  return (
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold text-center mb-4 animate-[slideUp_1s_ease-out_0.5s_both]">
          {locale("results.title")}
        </h1>
        <p className="text-center text-xl text-gray-400 mb-2 animate-[slideUp_1s_ease-out_0.7s_both]">
          {locale("results.thanks")}
          <ExternalLink href="https://discord.gg/H4EU4KvSkR">
            {locale("main.discord")}
          </ExternalLink>
          {locale("main.or")}
          <ExternalLink href="https://t.me/only1stumpyy">
            Telegram
          </ExternalLink>
        </p>

        <p className="text-center text-sm text-gray-400 mb-2 animate-[slideUp_1s_ease-out_0.8s_both]">
          {locale("results.desc")}
        </p>
        <p className="text-center text-sm text-red-600 mb-6 animate-[slideUp_1s_ease-out_0.9s_both]">
          {locale("results.errors")}: {mistakeCount}
        </p>

        <ol className="space-y-4">
          {userTop.map((level, index) => (
              <li
                  key={level.id}
                  className={`${getCardColor(
                      level,
                      index
                  )} p-4 rounded-xl border border-white/10 backdrop-blur animate-[slideUp_1s_ease-out_1s_both]`}
                  style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-300">
                    #{index + 1}{" "}
                    {locale("results.place")}
                  </div>
                  <div className="text-sm text-white/80">
                    {locale("results.relativePlace")}{numberOfLevels}
                    : {getRelativePlace(level)}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold mb-2">{level.name}</p>
                  <div className="text-sm text-white/80">
                    {locale("results.realPlace")}
                    : {level.placement}
                  </div>
                </div>
                <Image
                    src={`https://img.youtube.com/vi/${getVideoId(
                        level.verification_url
                    )}/hqdefault.jpg`}
                    alt={level.name}
                    width={480}
                    height={360}
                    className="w-full aspect-video object-cover rounded-md border border-white/10"
                />
              </li>
          ))}
        </ol>

        <div className="text-center mt-10">
          <Button
              onClick={restart}
              type="main"
              textContent={locale("results.playAgain")}
          />
        </div>
      </div>
  );
};
