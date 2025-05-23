'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import s from './ThemeChanger.module.scss'
import { useStore } from '@/shared/store';

interface Props{
    children: ReactNode
}

export default function ThemeChanger({children} : Props){
    const settings = useStore(state => state.settings);
    const setLanguage = useStore(state => state.setLanguage)
    const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLanguage(localStorage.getItem("Language"))
        setIsThemeLoaded(true);
    }, [])

    if (!isThemeLoaded)
        return null;

    return (
        <div className={settings.theme === 'dark'? s.darkTheme : s.lightTheme}>
            <div className={s.container}>
                {children}
            </div>
        </div>
    );
};