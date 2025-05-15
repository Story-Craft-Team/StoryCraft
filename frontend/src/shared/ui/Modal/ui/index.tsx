import React, { ReactNode, useState } from 'react';
import s from './modalWindow.module.scss'

interface Props{
    children: ReactNode
}

export default function Modal({children}:Props){
    const [windowIsVisible, setWindowVisible] = useState<boolean>(true)

    const changeVisible = () => windowIsVisible? setWindowVisible(false) : setWindowVisible(true)

    return (
        <div className={windowIsVisible? s.modalOverlay : s.containerUnVisible} onClick={changeVisible}>
            <div className={windowIsVisible? s.containerVisible : s.containerUnVisible} onClick={(e:React.MouseEvent) => e.stopPropagation()}>
                <button className={s.btn} onClick={changeVisible}>Close</button>
                {children}
            </div>
        </div>
    );
};