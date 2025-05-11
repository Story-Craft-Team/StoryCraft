import React, { useEffect, useState } from 'react';
import s from './modalWindow.module.scss'

export default function WelcomModal(){
    const [windowVisible, setWindowVisible] = useState<boolean>(true)
    const [username, setUsername] = useState<string>("");
    useEffect(() => {   //getting authorized user data
        const data = localStorage.getItem("userData");
        if (data) {
            setUsername(JSON.parse(data).username);
        }
    }, []);

    return (
        <div className={windowVisible? s.modalOverlay : s.containerUnVisible} onClick={() => windowVisible? setWindowVisible(false) : setWindowVisible(true)}>
            <div className={windowVisible? s.containerVisible : s.containerUnVisible}>
                <h1 className={s.alert}>Приветствую, {username}</h1>
            </div>
        </div>
    );
};