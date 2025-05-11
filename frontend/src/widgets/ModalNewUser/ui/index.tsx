import React, { useState } from 'react';
import s from './modalWindow.module.scss'
import Link from 'next/link';

export default function ModalNewUser(){
    return (
        <div className={s.modalOverlay}>
            <div className={s.containerVisible}>
                <h1 className={s.alert}>Пользователь не найден <Link className={s.link_style} href="/auth/register">Зарегистрируйтесь</Link> или <Link className={s.link_style} href="/auth/login">Войдите</Link></h1>
            </div>
        </div>
    );
};