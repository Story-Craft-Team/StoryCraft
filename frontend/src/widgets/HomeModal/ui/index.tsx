'use client'

import WelcomModal from '@/widgets/WelcomModal';
import React, { useEffect, useState } from 'react';
import s from './MainModal.module.scss'

export default function HomeModal(){
    const [hasUserData, setHasUserData] = useState(false);
    useEffect(() => {
        setHasUserData(!!localStorage.getItem('userData'));
    }, []);

    return (
        <>
            {hasUserData? <WelcomModal/>: <> </>}
        </>
    );
};
