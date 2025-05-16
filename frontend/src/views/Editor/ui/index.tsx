"use client"
import { useParams } from "next/navigation";
import s from './Editor.module.scss'
import StoryEditor from "@/widgets/StoryEditor";

export default function EditorPage() {
  const { id } = useParams()

  return (
    <>
      <div className={s.story_block}>
        <h2 className={s.title}>Название истории(пока заглушка)</h2>
        <h2 className={s.scene_number}>Сцена: {id}</h2>
      </div>
      

      <StoryEditor />
    </>
  )
}

// TODO вынести код в начале, потому что переимпользуеться в read/:id (мб где то еще будет)
// TODO Собрать по компонентам страничку едитора
