'use client'
import Story from "@/features/Story/ui";
import s from "./Stories.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ModalNewUser, WelcomModal } from "@/widgets";
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
      {localStorage.getItem('userData')? <WelcomModal username={username}/>: <ModalNewUser/>}
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
