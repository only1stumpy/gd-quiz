import {useLocales} from "@/hooks/useLocales";
import {toast} from "react-toastify";


export function useNotify() {
    const {locale} = useLocales()
    return {
        error: (errorType: string, error: string) => {
            toast.error(locale("error."+errorType));
            console.error(`${errorType}: ${error}`);
        },
        success: (successType:string) => {
            toast.success(locale(`success.${successType}`));
        }
    }
}