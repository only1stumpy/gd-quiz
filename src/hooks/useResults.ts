import {useEffect, useMemo, useState} from "react";
import {LevelData} from "@/types/level";
import {useRouter} from "next/navigation";
import {safeLocalStorage} from "@/functions/safeLocalStorage";


export function useResults() {

    const [userTop, setUserTop] = useState<LevelData[]>([]);
    const [correctOrder, setCorrectOrder] = useState<LevelData[]>([]);
    const [mistakeCount, setMistakeCount] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const stored = safeLocalStorage.getItem<LevelData[]>("gdquiz_levels");
        if (!stored || !Array.isArray(stored)) {
            console.error("No valid quiz data found in localStorage");
            return;
        }

        setUserTop(stored);

        const correct = [...stored].sort((a, b) => a.placement - b.placement);
        setCorrectOrder(correct);

        let count = 0;

        stored.forEach((level, i) => {
            const correctIndex = correct.findIndex((l) => l.id === level.id);
            if (correctIndex !== i) {
                count++;
            }
        });

        setMistakeCount(count);
    }, []);

    const correctIndexMap = useMemo(() =>
            new Map(correctOrder.map((l, i) => [l.id, i])),
        [correctOrder]);

    const getCardColor = (level: LevelData, index: number) => {
        const correctIndex = correctIndexMap.get(level.id);
        if (correctIndex === undefined) return "bg-gray-700";
        return correctIndex === index ? "bg-green-700/30" : "bg-red-700/30";
    };

    const sortedByPlacement = useMemo(() =>
            [...userTop].sort((a, b) => a.placement - b.placement),
        [userTop]);

    const getRelativePlace = (level: LevelData) =>
        sortedByPlacement.findIndex(l => l.id === level.id) + 1;

    const restart = () => {
        safeLocalStorage.removeItem("gdquiz_levels");
        router.push("/quiz");
    };
    const numberOfLevels = userTop.length;
    return {
        mistakeCount,
        userTop,
        getCardColor,
        numberOfLevels,
        getRelativePlace,
        restart
    }
}