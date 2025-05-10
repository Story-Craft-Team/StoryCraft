'use client'
import Story from "@/features/Story/ui";
import s from "./Stories.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Stories() {
  const [username, setUsername] = useState<string>("")
  useEffect(() => { //получение данных авторизованного пользователя
    const data = localStorage.getItem('userData');
    if (data) {
      setUsername(JSON.parse(data).username);
    }
  }, []);
  return (
    <div className={s.stories}>
      {localStorage.getItem('userData')? <h1 className={s.alert}>Приветствую, {username}</h1>: <h1 className={s.alert}>Пользователь не зарегистрирован <Link className={s.link_style} href="/auth/register">Зарегистрируйтесь</Link> или <Link className={s.link_style} href="/auth/login">Войдите</Link></h1>}
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
}
