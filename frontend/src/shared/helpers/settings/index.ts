import { useStore } from "@/shared/store";
import { ChangeEvent } from "react";


export const useLanguageChange = () => {
    const setLanguage = useStore(state => state.setLanguage)
    function LanguageChange(e: ChangeEvent<HTMLInputElement>){
        const Language = e.target.value === "0"? "ru" : "en"
        setLanguage(Language)
        localStorage.setItem('Language', Language)
    }
    return {LanguageChange}
};

export const useThemeChange = () => {
    const setTheme = useStore(state => state.setTheme)
    function ThemeChange(e: ChangeEvent<HTMLInputElement>) {
        const Theme = e.target.value === "0"? "dark" : "light"
        setTheme(Theme)
    }
    return {ThemeChange}
};
