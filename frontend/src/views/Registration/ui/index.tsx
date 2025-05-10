'use client'

import React, { useState } from 'react';
import s from './Registration.module.scss'
import type {User} from '@/shared/types'
export default function Registration(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")

    function RegistrationSubmit(e: React.FormEvent){ //установление данных зарегистрировавшигося пользователя
        e.preventDefault()
        if(rePassword === password){
            const userData:User ={
                username: username,
                password: password
            }
            localStorage.setItem("regUserData", JSON.stringify(userData))
        }
        else{
            alert("Пароли не совпадают")
        }
    }
    
    return (
        <div className={s.container}>
            <form className={s.mainForm} onSubmit={RegistrationSubmit}>
                <h1>Регистрация</h1>
                <input value={username} placeholder="Придумайте логин" className={s.input_style} onChange={(e:any) => setUsername(e.target.value)}/>
                <input type="password" value={password} placeholder="Придумайте пароль" className={s.input_style} onChange={(e:any) => setPassword(e.target.value)}/>
                <input type="password" value={rePassword} placeholder="Повторите пароль" className={s.input_style} onChange={(e:any) => setRePassword(e.target.value)}/>
                <h5 className={s.alert}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <button className={s.btn}>Зарегестрироваться</button>
            </form>
        </div>
    );
};