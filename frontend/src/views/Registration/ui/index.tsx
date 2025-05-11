'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import s from './Registration.module.scss'
import type {User} from '@/shared/types'
import { useRouter } from 'next/navigation';
import { Submit } from '@/shared/Submit';
import { CustomInput } from '@/shared/CustomInput';
import { CustomForm } from '@/shared/CustomForm';

export default function Registration(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")
    const router = useRouter()

    function RegistrationSubmit(e: FormEvent<HTMLFormElement>){ //установление данных зарегистрировавшигося пользователя
        if(rePassword === password){
            const userData:User ={
                username: username,
                password: password
            }
            localStorage.setItem("regUserData", JSON.stringify(userData))
            router.push('/auth/login');
        }
        else
            alert("Пароли не совпадают")
        
    }
    
    return (
        <div className={s.container}>
            <CustomForm onSubmit={RegistrationSubmit}>
                <h1>Регистрация</h1>
                <CustomInput value={username} placeholder="Придумайте логин" onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                <CustomInput type="password" value={password} placeholder="Придумайте пароль" onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                <CustomInput type="password" value={rePassword} placeholder="Повторите пароль" onChange={(e:ChangeEvent<HTMLInputElement>) => setRePassword(e.target.value)}/>
                <h5 className={s.alert}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <Submit>Зарегистрироваться</Submit>
            </CustomForm>
        </div>
    );
};