"use client";

import { useLocales } from "@/hooks/useLocales";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props) {
  const { locale } = useLocales();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-(--neon-blue)">
          {locale("errors.title")}
        </h1>

        <p className="text-white/70">
          {locale("errors.description")}
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="text-left text-sm text-red-400 bg-black/50 p-4 rounded overflow-auto max-h-40">
            {props.error.message.split('\n')[0]}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={props.reset}
            className="px-6 py-3 bg-(--neon-blue) text-white rounded-lg hover:opacity-80 transition-opacity"
            type="button"
          >
            {locale("errors.retry")}
          </button>

          <Link
            href="/"
            className="px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            {locale("errors.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
