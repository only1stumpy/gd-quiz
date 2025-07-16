import { create } from "zustand";
import { ILevelData } from "@/types/level";
import { persist, createJSONStorage } from "zustand/middleware";

interface QuizState {
  selectedLevels: ILevelData[]; // выбранные уровни для игры
  setSelectedLevels: (levels: ILevelData[]) => void;
  setEasy: () => void;
  setNormal: () => void;
  setHard: (randomStart: number) => void;
  setCustom: (lvlNum: number, rangeStart: number, rangeEnd: number) => void;
  reset: () => void;
}
interface AllLevelsState {
  allLevels: ILevelData[];
  setAllLevels: (allLevels: ILevelData[]) => void;
}

export const useAllLevelsStore = create<AllLevelsState>()(
  persist(
    (set, get) => ({
      allLevels: [],
      setAllLevels: (allLevels: ILevelData[]) => set({ allLevels }),
    }),
    { name: "quizStore", storage: createJSONStorage(() => sessionStorage) }
  )
);
const useQuizStore = create<QuizState>((set, get) => ({
  selectedLevels: [],
  reset: () => set({ selectedLevels: [] }),
  setSelectedLevels: (levels: ILevelData[]) => {
    set({ selectedLevels: levels });
  },
  setEasy: () => {
    const allLevels = useAllLevelsStore.getState().allLevels;
    const shuffled = [...allLevels].sort(() => 0.5 - Math.random());
    set({ selectedLevels: shuffled.slice(0, 5) });
  },

  setNormal: () => {
    const allLevels = useAllLevelsStore.getState().allLevels;
    const shuffled = [...allLevels].sort(() => 0.5 - Math.random());
    set({ selectedLevels: shuffled.slice(0, 10) });
  },

  setHard: (randomStart: number) => {
    const allLevels = useAllLevelsStore.getState().allLevels;
    const range = allLevels.filter(
      (l) => l.place >= randomStart && l.place < randomStart + 100
    );
    const shuffled = [...range].sort(() => 0.5 - Math.random());
    set({ selectedLevels: shuffled.slice(0, 10) });
  },
  setCustom: (lvlNum: number, rangeStart: number, rangeEnd: number) => {
    const allLevels = useAllLevelsStore.getState().allLevels;
    const range = allLevels.filter(
      (l) => l.place >= rangeStart && l.place < rangeEnd
    );
    const shuffled = [...range].sort(() => 0.5 - Math.random());
    set({ selectedLevels: shuffled.slice(0, lvlNum) });
  },
}));

export default useQuizStore;
