'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import s from './Login.module.scss'
import type {User} from '@/shared/types'
import { useRouter } from 'next/navigation';
import { Submit } from '@/shared/Submit';
import { CustomInput } from '@/shared/CustomInput';
import { CustomForm } from '@/shared/CustomForm';

export default function Login(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [newUserData, setNewUserData] = useState<User>({username: "", password: ""})
    const router = useRouter()

    useEffect(() => { //получение нового пользователя из формы регистрации (newUserData)
        const data = localStorage.getItem('regUserData')
        if(data)
            setNewUserData(JSON.parse(data))
    }, [])

    function submitLogin(e: FormEvent<HTMLFormElement>){ //сравнение информации из формы авторизации с newUserData
        if(newUserData.username === username && newUserData.password === password){
            const userData:User = {
                username: username,
                password: password
            }
            localStorage.setItem('userData', JSON.stringify(userData)) //установление данных вошедшего пользователя
            router.push('/');
        }
        else
            alert("Неправильный пароль или логин")
    }

    return (
        <div className={s.container}>
            <CustomForm onSubmit={submitLogin}>
                <h1>Авторизация</h1>
                <CustomInput placeholder="Ваш логин" value={username} onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                <CustomInput type="password" placeholder="Ваш пароль" value={password} onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                <h5 className={s.alert}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <Submit>Войти</Submit>
            </CustomForm>
        </div>
    );
};