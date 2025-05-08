'use client'

import React, { useState } from 'react';
import s from './Registration.module.scss'

type User = {
    login: string
    password: string
}

export default function Registration(){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")

    function RegistrationSubmit(e: any){
        e.preventDefault()
        if(repassword == password){
            const userData:User ={
                login: login,
                password: password
            }
            localStorage.setItem("regUserData", JSON.stringify(userData))
        }
        else{
            alert("Пароли не совпадают")
        }
    }
    
    return (
        <div className={s.firstContainer}>
            <form className={s.mainForm} onSubmit={RegistrationSubmit}>
                <h1>Регистрация</h1>
                <input value={login} placeholder="Придумайте логин" className={s.input_style} onChange={(e:any) => setLogin(e.target.value)}/>
                <input value={password} placeholder="Придумайте пароль" className={s.input_style} onChange={(e:any) => setPassword(e.target.value)}/>
                <input value={repassword} placeholder="Повторите пароль" className={s.input_style} onChange={(e:any) => setRepassword(e.target.value)}/>
                <h5 className={s.text}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <button className={s.btn}>Зарегестрироваться</button>
            </form>
        </div>
    );
};