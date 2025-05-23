'use client'

import React, { ChangeEvent } from 'react';
import s from './Settings.module.scss'
import { useStore } from '@/shared/store';
import { CustomInput } from '@/shared/ui';
import { SettingsContainer } from '@/shared/ui';
import { useSettingsChange } from '@/shared/helpers';

export default function Settings(){
    const { language, theme } = useStore(state => state.settings)
    const {LanguageChange, ThemeChange} = useSettingsChange()

    return (
        <div>
            <h3>Язык интерфейса</h3>
            <SettingsContainer>
                <h4 className={s.alert}>Русский</h4>
                <CustomInput className={s.inp} type="range" onChange={(e: ChangeEvent<HTMLInputElement>) => LanguageChange(e)} min="0" max="1" defaultValue={language === "ru"? 0 : 1}/>
                <h4 className={s.alert}>English</h4>
            </SettingsContainer>
            <h3>Тема интерфейса</h3>
            <SettingsContainer>
                <h4 className={s.alert}>Темная</h4>
                <CustomInput className={s.inp} type="range" onChange={(e: ChangeEvent<HTMLInputElement>) => ThemeChange(e)} min="0" max="0" defaultValue={theme === "dark"? 0: 1}/>
                <h4 className={s.alert}>Светлая (в разработке)</h4>
            </SettingsContainer>
        </div>
    );
};