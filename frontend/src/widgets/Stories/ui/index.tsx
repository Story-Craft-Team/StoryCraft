'use client'
import Story from "@/features/Story/ui";
import s from "./Stories.module.scss";
import { useEffect, useState } from "react";
export default function Stories() {
  const [username, setUsername] = useState<string>("")
  useEffect(() => { //получение данных авторизованного пользователя
    const data = localStorage.getItem('userData');
    if (data) {
      setUsername(JSON.parse(data).login);
    }
  }, []);
  return (
    <div className={s.stories}>
      <h1 className={s.alert}>Приветствую, {username}</h1>
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
