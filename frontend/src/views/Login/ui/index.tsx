'use client'

import { useEffect, useState } from 'react';
import s from './Login.module.scss'
import Link from 'next/link';
import type {User} from '@/shared/types'

export default function Login(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [newUserData, setNewUserData] = useState<User>({username: "", password: ""})
    useEffect(() => { //получение нового пользователя из формы регистрации (newUserData)
        const data = localStorage.getItem('regUserData')
        if(data)
            setNewUserData(JSON.parse(data))
    }, [])

    function submitLogin(e: React.FormEvent){ //сравнение информации из формы авторизации с newUserData
        e.preventDefault()
        if(newUserData.username === username && newUserData.password === password){
            const userData:User = {
                username: username,
                password: password
            }
            localStorage.setItem('userData', JSON.stringify(userData)) //установление данных вошедшего пользователя
        }
        else
            alert("Неправильный пароль или логин")
    }

    return (
        <div className={s.container}>
            <form className={s.mainForm} onSubmit={submitLogin}>
                <h1>Авторизация</h1>
                <input placeholder="Ваш логин" value={username} onChange={(e:any) => setUsername(e.target.value)} className={s.input_style}/>
                <input type="password" placeholder="Ваш пароль" value={password} onChange={(e:any) => setPassword(e.target.value)} className={s.input_style}/>
                <h5 className={s.alert}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <button className={s.btn}><Link href="/">Войти</Link></button>
            </form>
        </div>
    );
};