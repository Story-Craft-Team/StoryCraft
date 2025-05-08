'use client'

import { useEffect, useState } from 'react';
import s from './Login.module.scss'
import Link from 'next/link';

type User = {
    login: string
    password: string
}

export default function Login(){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [regMan, setRegMan] = useState<User>({login: "", password: ""})
    useEffect(() => {
        const data = localStorage.getItem('regUserData')
        if(data)
            setRegMan(JSON.parse(data))
        
    }, [])

    function submitLogin(e: any){
        e.preventDefault()
        if(regMan.login == login && regMan.password == password){
            const userData:User = {
                login: login,
                password: password
            }
            localStorage.setItem('userData', JSON.stringify(userData))
        }
        else
            alert("Неправильный пароль или логин")
    }

    return (
        <div className={s.firstContainer}>
            <form className={s.mainForm} onSubmit={submitLogin}>
                <h1>Авторизация</h1>
                <input placeholder="Ваш логин" value={login} onChange={(e:any) => setLogin(e.target.value)} className={s.input_style}/>
                <input placeholder="Ваш пароль" value={password} onChange={(e:any) => setPassword(e.target.value)} className={s.input_style}/>
                <h5 className={s.text}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <button className={s.btn}><Link href="/">Войти</Link></button>
            </form>
        </div>
    );
};