import useLanguageStore from "@/store/useLanguageStore"
import en from "@/locales/en.json"
import ru from "@/locales/ru.json"

const locales = { en, ru }


function getNestedValue(obj: Record<string, unknown>, key: string): string {
    const result = key.split(".").reduce((current, k) => {
        if (typeof current === "object" && current !== null) {
            return (current as Record<string, unknown>)[k];
        }
        return undefined;
    }, obj as unknown);

    return (typeof result === "string" ? result : null) ?? key;
}
// Хук для i18n
export function useLocales() {
    const language = useLanguageStore((state) => state.language)
    const locale = locales[language as keyof typeof locales]

    return {
        locale: (key: string) => getNestedValue(locale as Record<string, unknown>, key),
        language,
    }
}