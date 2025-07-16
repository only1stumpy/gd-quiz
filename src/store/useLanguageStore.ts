import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  language: "en" | "ru";
  setEnglish: () => void;
  setRussian: () => void;
}

const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "en",
      setEnglish: () => set({ language: "en" }),
      setRussian: () => set({ language: "ru" }),
    }),
    { name: "languageStore" }
  )
);

export default useLanguageStore;
