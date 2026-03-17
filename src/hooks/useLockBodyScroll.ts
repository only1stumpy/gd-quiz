import {useEffect} from "react";

export function useLockBodyScroll() {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);
}