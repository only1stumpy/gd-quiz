import { useEffect, useState, useMemo } from "react";
import {useParams, useRouter} from "next/navigation";
import { nanoid } from "nanoid";
import useQuizStore, { useAllLevelsStore } from "@/store/quizStore"
import { LevelData } from "@/types/level";
import {API} from "@/lib/api";
import {shuffle} from "@/functions/shuffle";
import {useNotify} from "@/hooks/useNotify";

export function useMode() {

    const notify = useNotify();

    const router = useRouter();
    const [count, setCount] = useState(10);
    const [low, setLow] = useState(1);
    const [high, setHigh] = useState(1390);
    const [pos, setPos] = useState(0);
    const [selectedLevels, setSelectedLevels] = useState<LevelData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const {mode} = useParams<{mode:string}>();
    const [error, setError] = useState(false);
    const [isCreatingSeed, setIsCreatingSeed] = useState(false);

    const allLevels = useAllLevelsStore((state) => state.allLevels);

    useEffect(() => {
        if (allLevels.length === 0) {
            setError(true);
            return;
        }
        setPos(allLevels.length);
        setHigh(allLevels.length);
    }, [allLevels.length]);

    const filteredLevels = useMemo(() => {
        if (searchTerm.trim() === "") {
            return allLevels;
        }
        return allLevels.filter(
            (level) =>
                level.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                level.holder?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allLevels, searchTerm]);

    const handleLevelSelect = (level: LevelData) => {
        if (selectedLevels.some((l) => l.id === level.id)) {
            setSelectedLevels(selectedLevels.filter((l) => l.id !== level.id));
        } else {
            setSelectedLevels([...selectedLevels, level]);
        }
    };

    const createSeedWithRetry = async (levels: LevelData[], maxRetries = 3): Promise<string> => {
        for (let i = 0; i < maxRetries; i++) {
            const seed = nanoid(10);
            try {
                await API.seed(seed, mode, levels);
                return seed;
            } catch (err) {
                if (err instanceof Error && err.message.includes("collision") && i < maxRetries - 1) {
                    continue; // Retry with new seed
                }
                throw err; // Give up or different error
            }
        }
        throw new Error("Failed to create seed after retries");
    };

    const handleStart = async () => {
        if (isCreatingSeed) return;
        setIsCreatingSeed(true);

        try {
            // Validate level count
            if (count < 1 || count > 100) {
                notify.error("validation", "Level count must be between 1 and 100");
                return;
            }

            // Validate range
            if (low < 1 || high > pos || low >= high) {
                notify.error("validation", "Invalid range selected");
                return;
            }

            // Validate that range is large enough for requested count
            if (high - low + 1 < count) {
                notify.error("validation", `Range too small: need at least ${count} levels`);
                return;
            }

            useQuizStore.getState().setDifficulty("custom",{lvlNum: count, rangeStart: low, rangeEnd: high});
            const seed = await createSeedWithRetry(useQuizStore.getState().selectedLevels);
            router.push(`/quiz/${mode}/${seed}`);
        } finally {
            setIsCreatingSeed(false);
        }
    };

    const handlePlay = async () => {
        if (isCreatingSeed) return;
        setIsCreatingSeed(true);

        try {
            if (selectedLevels.length < 3) {
                notify.error("few", "You must select at least 3 levels");
            } else {
                const seed = await createSeedWithRetry(shuffle(selectedLevels));
                router.push(`/quiz/${mode}/${seed}`);
            }
        } finally {
            setIsCreatingSeed(false);
        }
    };

    const createSeed = async () => {
        return await createSeedWithRetry(shuffle(selectedLevels));
    };

    const handleCopy = async () => {
        if (isCreatingSeed) return;
        setIsCreatingSeed(true);

        try {
            if (selectedLevels.length < 3) {
                notify.error("few", "You must select at least 3 levels");
            } else {
                const seed = await createSeed();
                const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gd-quiz.vercel.app';
                navigator.clipboard.writeText(
                    `${baseUrl}/quiz/friend/${seed}`
                );
                notify.success("copy");
            }
        } finally {
            setIsCreatingSeed(false);
        }
    };


    return {
        error,
        mode,
        count,
        low,
        high,
        pos,
        setCount,
        setLow,
        setHigh,
        handleStart,
        handlePlay,
        handleCopy,
        selectedLevels,
        searchTerm,
        setSearchTerm,
        handleLevelSelect,
        filteredLevels
    }
}