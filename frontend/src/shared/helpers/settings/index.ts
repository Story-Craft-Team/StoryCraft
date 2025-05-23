import { useStore } from "@/shared/store";
import { ChangeEvent } from "react";

/*
    An add-on in the form of a useSettingsChange custom hook that allows you to use the useStore hook inside the ThemeChange and LanguageChange
*/
export const useSettingsChange = () => {
    const setLanguage = useStore(state => state.setLanguage) //getting a setLanguage custom hook into the store
    const setTheme = useStore(state => state.setTheme) //getting a setTheme custom hook into the store

    /*
        The function change theme in storage.
        The function accepts the following parameters:
        @e - properties of the target object
    */
    function ThemeChange(e: ChangeEvent<HTMLInputElement>) {
        const Theme = e.target.value === "0"? "dark" : "light" //definition the changed theme based on the value of the target object (input)
        setTheme(Theme)
    }

    /*
        The function change language in storage and set it in localStorage.
        The function accepts the following parameters:
        @e - properties of the target object
    */
    function LanguageChange(e: ChangeEvent<HTMLInputElement>){
        const Language = e.target.value === "0"? "ru" : "en" //definition the changed language based on the value of the target object (input)
        setLanguage(Language)
        localStorage.setItem('Language', Language)
    }
    
    return {ThemeChange, LanguageChange}
};
