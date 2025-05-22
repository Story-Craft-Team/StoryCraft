'use client'

import React, { ChangeEvent } from 'react';
import s from './Settings.module.scss'
import { useStore } from '@/shared/store';
import { CustomInput } from '@/shared/ui/CustomInput';
import { SettingsContainer } from '@/shared/ui/SettingsContainer';
import { useLanguageChange, useThemeChange } from '@/shared/helpers/settings';

export default function Settings(){
    const settings = useStore(state => state.settings)
    const {LanguageChange} = useLanguageChange()
    const {ThemeChange} = useThemeChange()

    return (
        <div>
            <h3>Язык интерфейса</h3>
            <SettingsContainer>
                <h4 className={s.alert}>Русский</h4>
                <CustomInput className={s.inp} type="range" onChange={(e: ChangeEvent<HTMLInputElement>) => LanguageChange(e)} min="0" max="1" defaultValue={settings.language === "ru"? 0 : 1}/>
                <h4 className={s.alert}>English</h4>
            </SettingsContainer>
            <h3>Тема интерфейса</h3>
            <SettingsContainer>
                <h4 className={s.alert}>Темная</h4>
                <CustomInput className={s.inp} type="range" onChange={(e: ChangeEvent<HTMLInputElement>) => ThemeChange(e)} min="0" max="0" defaultValue={settings.theme === "dark"? 0: 1}/>
                <h4 className={s.alert}>Светлая (в разработке)</h4>
            </SettingsContainer>
        </div>
    );
};