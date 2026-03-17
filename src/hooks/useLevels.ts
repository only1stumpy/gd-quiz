import { useEffect } from "react";
import useQuizStore, { useAllLevelsStore } from "@/store/quizStore";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {Difficulty} from "@/types/difficulty";
import {API} from "@/lib/api";
import {useNotify} from "@/hooks/useNotify";


export function useLevels(setIsLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
    const notify = useNotify();
    const allLevels = useAllLevelsStore((state) => state.allLevels);
    const router = useRouter();
    const fetchLevels = async (signal: AbortSignal) => {
        try {
            setIsLoading(true);
            const levels = await API.getAllLevels(signal)

            if (!signal.aborted && levels?.length) {
                useAllLevelsStore.getState().setAllLevels(levels);
                notify.success("fetchLevels");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.name === "AbortError") {
                    return;
                }
                notify.error("fetchLevels", err.message);
            }
        } finally {
            if (!signal.aborted) setIsLoading(false);
        }
    };

    useEffect(() => {
        // Если уровни уже загружены, то не нужно делать запрос
        if (allLevels.length > 0) return;
        // Создаем AbortController для отмены запроса, если пользователь покидает страницу
        const controller = new AbortController();
        fetchLevels(controller.signal);
        return () => {
            controller.abort();
        };
    }, []);

    const storeLevels = async (mode: Difficulty) => {
        try {
            setIsLoading(true);

            if (allLevels.length === 0) {
                notify.error("fetchLevels", "No levels loaded");
                return;
            }
            const seed = nanoid(6);
            let randomStart = undefined;
            if (mode === "hard") randomStart = Math.floor(Math.random() * (allLevels.length - 100));
            useQuizStore.getState().setDifficulty(mode, { randomStart });
            await API.seed(seed, mode, useQuizStore.getState().selectedLevels);
            router.push(`/quiz/${mode}/${seed}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                notify.error("seed", err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return {storeLevels}
}