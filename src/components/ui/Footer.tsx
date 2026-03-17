"use client";


import {useLocales} from "@/hooks/useLocales";
import {ExternalLink} from "@/components/ui/ExternalLink";

export default function Footer() {
  const { locale } = useLocales()
    return (
        <footer className="scroll-reveal text-center py-12 px-8 border-t border-(--card-border) mt-12">
            <p>
                {locale("footer.created")} <a href="https://t.me/only1stumpyy">only1stumpy</a>
                © 2025 | {locale("footer.bugs")}
                <ExternalLink href="https://discord.gg/H4EU4KvSkR">
                    {locale("main.discord")}
                </ExternalLink>
                {locale("main.or")}
                <ExternalLink href="https://t.me/only1stumpyy">
                    Telegram
                </ExternalLink>
            </p>
            <ExternalLink href="/privacy">
                Privacy Policy
            </ExternalLink>
        </footer>
    );
}
