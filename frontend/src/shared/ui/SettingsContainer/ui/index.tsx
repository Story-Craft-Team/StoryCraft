import React, { ReactNode } from 'react';
import s from './SettingsContainer.module.scss'

interface Props{
    children: ReactNode
}

export default function SettingsContainer({children} : Props){
    return (
        <div 
            className={s.container}
        >
            {children}
        </div>
    );
};