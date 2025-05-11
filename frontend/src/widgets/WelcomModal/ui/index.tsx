import React, { useState } from 'react';
import s from './modalWindow.module.scss'

interface Props{
    username: string
}

export default function WelcomModal({username}: Props){
    const [windowVisible, setWindowVisible] = useState<boolean>(true)

    return (
        <div className={windowVisible? s.modalOverlay : s.containerUnVisible} onClick={() => windowVisible? setWindowVisible(false) : setWindowVisible(true)}>
            <div className={windowVisible? s.containerVisible : s.containerUnVisible}>
                <h1 className={s.alert}>Приветствую, {username}</h1>
            </div>
        </div>
    );
};