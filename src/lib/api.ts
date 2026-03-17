import {LevelData} from "@/types/level";

export const API = {
    //  Запрос на получение всех уровней
     getAllLevels: async(signal: AbortSignal): Promise<LevelData[]> => {
        return await fetch("/api/levels", { signal })
            .then((res) => res.json())
            .then((json)=> json.data)
            .catch((err) => {throw new Error(`HTTP error! status: ${err.status}`);})
     },
    // Запрос на создание сида с заданными параметрами
    seed: async (seed: string, mode: string, levels: LevelData[]): Promise<Response> => {
        return await fetch("/api/seed", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                seed,
                mode,
                levels,
            }),
        })
    },
    // Запрос на получение сида по seed и mode
    getSeed: async (seed: string, mode: string, signal: AbortSignal) => {
         return await fetch(`/api/seed/get?seed=${seed}&mode=${mode}`, { signal })
             .then((res) => res.json())
             .catch((err) => {throw new Error(`HTTP error! status: ${err.status}`);})
    }

}