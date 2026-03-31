"use client";
import { useState } from "react";
import {useLocales} from "@/hooks/useLocales";
import {useLevels} from "@/hooks/useLevels";
import DifficultyCard from "@/components/ui/DifficultyCard";
import Link from "next/link";
import {Button} from "@/components/ui/Button";
import Image from "next/image";

export default function QuizClient() {

    const { locale } = useLocales()  // i18n

    // ui hooks
    const [isLoading, setIsLoading] = useState(false);

    const { storeLevels } = useLevels(setIsLoading) // levels fetching

    return (
        <div className="flex justify-center items-center flex-col">
            {isLoading ? (
                <div className="space-y-6 animate-pulse flex items-center justify-center w-screen h-screen">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    <h1 className="text-5xl font-bold mt-12 text-center animate-[slideUp_1s_ease-out_0.5s_both]">
                        {locale("quizPage.title")}
                    </h1>
                    <div className="flex flex-col items-center w-[75vw] gap-8 my-12">
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 w-full max-md:grid-cols-1">
                            <DifficultyCard locale={locale} difficulty="easy" storeLevels={storeLevels} />
                            <DifficultyCard locale={locale} difficulty="normal" storeLevels={storeLevels} />
                            <DifficultyCard locale={locale} difficulty="hard" storeLevels={storeLevels} />
                            <DifficultyCard locale={locale} difficulty="custom" storeLevels={storeLevels} />
                        </div>
                        <div className="bg-(--card-bg) rounded-3xl p-4 md:p-12 backdrop-blur-md border border-(--card-border) w-full animate-[slideUp_1s_ease-out_1.5s_both]">
                            <div className="flex flex-col justify-center items-center gap-6 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <Image src="/icons/friend.png" alt="friend" width={72} height={72} />
                                    <h2 className="text-3xl font-bold">{locale("quizPage.friendTitle")}</h2>
                                </div>
                                <p>{locale("quizPage.friendDesc")}</p>
                                <Link href="/quiz/friend">
                                    <Button textContent={locale("quizPage.friendButton")} type="friend"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}