import useLanguageStore from "@/store/useLanguageStore";

export function useLanguageChange(){
    const language = useLanguageStore((state)=>state.language)
    const ru = useLanguageStore((state) => state.setRussian);
    const en = useLanguageStore((state) => state.setEnglish);
    return {
        language: language,
        setRussianLanguage: ru,
        setEnglishLanguage: en
    }
}