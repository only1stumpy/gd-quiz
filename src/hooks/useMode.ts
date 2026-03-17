import { useEffect, useState } from "react";
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
    const [filteredLevels, setFilteredLevels] = useState<LevelData[]>([]);
    const {mode} = useParams<{mode:string}>();
    const [error, setError] = useState(false);

    useEffect(() => {
        const all = useAllLevelsStore.getState().allLevels;
        if (all.length === 0) {
            setError(true);
            return;
        }
        setPos(all.length);
        setHigh(all.length);
        setFilteredLevels(all);
    }, []);

    useEffect(() => {
        const allLevels = useAllLevelsStore.getState().allLevels;
        if (searchTerm.trim() === "") {
            setFilteredLevels(allLevels);
        } else {
            const results = allLevels.filter(
                (level) =>
                    level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    level.holder.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredLevels(results);
        }
        if (useAllLevelsStore.getState().allLevels.length === 0) {
            setError(true);
        }
    }, [searchTerm]);

    const handleLevelSelect = (level: LevelData) => {
        if (selectedLevels.some((l) => l.id === level.id)) {
            setSelectedLevels(selectedLevels.filter((l) => l.id !== level.id));
        } else {
            setSelectedLevels([...selectedLevels, level]);
        }
    };

    const handleStart = async () => {
        useQuizStore.getState().setDifficulty("custom",{lvlNum: count, rangeStart: low, rangeEnd: high});
        const seed = nanoid(6);
        await API.seed(seed,mode,useQuizStore.getState().selectedLevels);
        router.push(`/quiz/${mode}/${seed}`);
    };

    const handlePlay = async () => {
        if (selectedLevels.length < 3) {
            notify.error("few", "You must select at least 3 levels");
        } else {
            const seed = await createSeed();
            router.push(`/quiz/${mode}/${seed}`);
        }
    };

    const createSeed = async () => {
        const seed = nanoid(6);
        await API.seed(seed,mode,shuffle(selectedLevels));
        return seed;
    };

    const handleCopy = async () => {
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