
import { useEffect, useState } from "react";
import {
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor,
    DragEndEvent,
} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import { LevelData } from "@/types/level";
import getVideoId from "@/functions/getVideoId";
import useQuizStore from "@/store/quizStore";
import {useParams} from "next/navigation";
import { safeLocalStorage } from "@/functions/safeLocalStorage";
import { useRouter } from "next/navigation";
import {API} from "@/lib/api";

export function useQuiz() {
    const router = useRouter();
    const { mode, seed } = useParams<{ mode: string; seed: string }>();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const selectedLevels = useQuizStore((state) => state.selectedLevels);
    const [watchedLevels, setWatchedLevels] = useState<LevelData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const levelCount: number = selectedLevels.length;
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );
    useEffect(() => {
        const controller = new AbortController();

        async function fetchFromDB() {
            try {
                setIsLoading(true);
                const data = await API.getSeed(seed, mode, controller.signal);
                if (!controller.signal.aborted) {
                    if (data.levels?.length > 0) {
                        useQuizStore.getState().setSelectedLevels(data.levels);
                    } else {
                        setError(true);
                    }
                }
            } catch (err) {
                if (!controller.signal.aborted) {setError(true); console.error(err);}
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }

        fetchFromDB();
        return () => controller.abort();
    }, [seed, mode]);

    const handleNext = () => {
        const current = useQuizStore.getState().selectedLevels[currentIndex];
        setWatchedLevels((prev) => [...prev, current]);
        setCurrentIndex((prev) => prev + 1);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = watchedLevels.findIndex((lvl) => lvl.id === active.id);
            const newIndex = watchedLevels.findIndex((lvl) => lvl.id === over.id);
            setWatchedLevels((items) => arrayMove(items, oldIndex, newIndex));
        }
    };

    const handleSubmit = async () => {
        const saved = safeLocalStorage.setItem("gdquiz_levels", watchedLevels);
        if (!saved) {
            console.warn("Failed to save quiz results, but continuing anyway");
        }
        router.push(`/quiz/${mode}/${seed}/result`);
    };

    const currentLevel = selectedLevels[currentIndex];
    const videoId = currentLevel ? getVideoId(currentLevel.verification_url) : null;

    const handleShowHowToPlay = () => {
        setShowHowToPlay((prev) => !prev);
    }


    return {
        error,
        showHowToPlay,
        handleShowHowToPlay,
        levelCount,
        isLoading,
        currentLevel,
        currentIndex,
        selectedLevels,
        videoId,
        handleNext,
        watchedLevels,
        sensors,
        handleDragEnd,
        handleSubmit
    }
}