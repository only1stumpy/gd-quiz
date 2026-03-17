"use client"
import {Difficulty} from "@/types/difficulty";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/Button";
import Image from "next/image";

const DIFFICULTY_ICONS: Record<Difficulty, string> = {
    easy: "/icons/easy.png",
    normal: "/icons/normal.png",
    hard: "/icons/hard.png",
    custom: "/icons/editor.png",
}

type Props = {
    locale: (key: string) => string;
    difficulty: Difficulty;
    storeLevels: (mode: Difficulty) => Promise<void>
};

export default function DifficultyCard(props: Props) {
    const router = useRouter()
    const clickHandler = async () => {
        if(props.difficulty === "custom") {
            await router.push("/quiz/custom")
            return
        }
        await props.storeLevels(props.difficulty)
    }
    return(
        <div className="bg-(--card-bg) border border-(--card-border) rounded-3xl p-8 text-center backdrop-blur-md transition duration-300 ease-linear relative overflow-hidden hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,255,255,0.2)] hover:border-cyan-400/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-linear-to-r before:from-blue-400 before:via-purple-400 before:to-green-400 before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 animate-[slideUp_1s_ease-out_0.7s_both] flex flex-col justify-between min-h-65">
            <div className="flex flex-col items-center gap-3">
                <Image
                    src={DIFFICULTY_ICONS[props.difficulty]}
                    alt={props.difficulty}
                    width={64}
                    height={64}
                />
                <p>{props.locale("quizPage.lvlNum")}: 5</p>
                <p>{props.locale(`quizPage.${props.difficulty}Range`)}</p>
            </div>
            <Button
                textContent={props.locale(`quizPage.${props.difficulty}Button`)}
                onClick={clickHandler}
                type={props.difficulty}
            />
        </div>
    )
}