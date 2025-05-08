'use client'
import Story from "@/features/Story/ui";
import s from "./Stories.module.scss";
import { useEffect, useState } from "react";
export default function Stories() {
  const [login, setLogin] = useState('')
  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setLogin(JSON.parse(data).login);
    }
  }, []);
  return (
    <div className={s.stories}>
      <h1 style={{textAlign: "center", marginTop: 15}}>Приветствую, {login}</h1>
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
