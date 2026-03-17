import {router} from "next/client";
import {ExternalLink} from "@/components/ui/ExternalLink";
import {Button} from "@/components/ui/Button";

type Props = {
    locale: (key: string) => string
}

export function ErrorPage(props: Props) {
    return (
        <div className="min-h-screen max-w-3xl mx-auto px-4 py-12 text-white relative animate-[slideUp_1s_ease-out_0.5s_both] flex justify-center items-center flex-col gap-4">
            <div className="text-red-500 text-center mb-4">
                <h1 className="text-5xl text-center mb-4 font-[Russo_One] animate-[slideUp_1s_ease-out_0.5s_both]">
                    {props.locale("mode.error")}
                    <ExternalLink href="https://discord.gg/H4EU4KvSkR">
                        {props.locale("main.discord")}
                    </ExternalLink>
                    {props.locale("main.or")}
                    <ExternalLink href="https://t.me/only1stumpyy">
                        Telegram
                    </ExternalLink>
                </h1>
            </div>
            <Button
                onClick={() => router.push("/quiz")}
                type="main"
                textContent={props.locale("mode.backButton")}
            />
        </div>
    )
}