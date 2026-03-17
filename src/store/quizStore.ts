import {create} from "zustand";
import {LevelData} from "@/types/level";
import {createJSONStorage, persist} from "zustand/middleware";
import {shuffle} from "@/functions/shuffle";
import {Difficulty} from "@/types/difficulty";


// Типы и интерфейсы
interface QuizState {
  selectedLevels: LevelData[]; // выбранные уровни для игры
  setSelectedLevels: (levels: LevelData[]) => void;
  setDifficulty:(difficulty: Difficulty, options?: DifficultyOptions) => void;
  reset: () => void;
}
interface AllLevelsState {
  allLevels: LevelData[];
  setAllLevels: (allLevels: LevelData[]) => void;
}

type DifficultyOptions = {
  lvlNum?:number,
  rangeStart?: number,
  rangeEnd?: number,
  randomStart?: number
}

// Стор для хранения всех уровней и занесения их в сессионное хранилище
export const useAllLevelsStore = create<AllLevelsState>()(
  persist(
    (set) => ({
      allLevels: [],
      setAllLevels: (allLevels: LevelData[]) => set({ allLevels }),
    }),
    { name: "quizStore", storage: createJSONStorage(() => sessionStorage) }
  )
);


// Стор для манипуляций с загруженными уровнями: изменение списка в зависимости от сложности
const useQuizStore = create<QuizState>((set) => ({

  selectedLevels: [],

  reset: () => set({ selectedLevels: [] }),

  // Установка выбранных уровней в дружеском режиме
  setSelectedLevels: (levels: LevelData[]) => {
    set({ selectedLevels: levels });
  },

  // Установка выбранных уровней в зависимости от сложности
  setDifficulty:(difficulty: Difficulty, options?: DifficultyOptions) => {
    const {lvlNum, rangeStart, rangeEnd, randomStart} = options ?? {};
    const allLevels = useAllLevelsStore.getState().allLevels;
    let levels: LevelData[] = allLevels;
    let MAX_LEVELS = 10;
    switch (difficulty){
      case "easy": {
        MAX_LEVELS = 5;
        break;
      }
      case "normal": {
        break;
      }
      case "hard": {
        levels = rangeFilter(allLevels, { randomStart });
        break;
      }
      case "custom": {
        MAX_LEVELS = lvlNum || 10;
        levels = rangeFilter(allLevels, {rangeStart, rangeEnd});
        break;
      }
    }
    set({ selectedLevels: shuffle(levels).slice(0, MAX_LEVELS) });
  },

}));

// Функция фильтрации уровней по сложности
function rangeFilter(allLevels: LevelData[], options?: DifficultyOptions ){
  const {rangeStart, rangeEnd, randomStart} = options ?? {}

  if (randomStart !== undefined)
    return allLevels.filter(
        (l) => l.placement >= randomStart && l.placement < randomStart + 100
    );

  if (rangeStart !== undefined && rangeEnd !== undefined)
    return allLevels.filter(
        (l) => l.placement >= rangeStart && l.placement < rangeEnd
    );

  return allLevels
}

export default useQuizStore;
