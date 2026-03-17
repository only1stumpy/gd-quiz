"use client";
import {useLocales} from "@/hooks/useLocales";
import {ExternalLink} from "@/components/ui/ExternalLink";
import {useLockBodyScroll} from "@/hooks/useLockBodyScroll";

type Props = {
  onClose: () => void;
  num: number;
}

export default function HowToPlay(props: Props) {
  const {locale} = useLocales()
  useLockBodyScroll();
  return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-(--card-bg) text-white rounded-2xl p-6 max-w-4xl w-full shadow-lg relative">
          <button
              className="absolute top-3 right-4 text-white text-xl hover:text-red-400"
              onClick={props.onClose}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {locale("HowToPlay.title")}
          </h2>
          <p className="mb-2">
            {locale("HowToPlay.shown")}{props.num}{locale("HowToPlay.demonlist")}
            <ExternalLink href="https://demonlist.org/">
              Global Demonlist
            </ExternalLink>
            {locale("HowToPlay.task")}
          </p>
          <p className="mb-2">
            {locale("HowToPlay.video")}
          </p>
          <p className="mb-2">
            {locale("HowToPlay.tuned")}
            <ExternalLink href="https://discord.gg/H4EU4KvSkR">
              {locale("main.discord")}
            </ExternalLink>
            {locale("main.or")}
            <ExternalLink href="https://t.me/only1stumpyy">
              Telegram
            </ExternalLink>
          </p>
        </div>
      </div>
  );
}
