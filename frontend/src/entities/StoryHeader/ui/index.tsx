"use client";

import { usePathname } from "next/navigation";
import s from "./StoryHeader.module.scss";

type StoryHeaderProps = {
  title: string;
  sceneCount: number;
  onChangeTitle?: (newTitle: string) => void;
};

export default function StoryHeader({
  title,
  sceneCount,
  onChangeTitle,
}: StoryHeaderProps) {
  const pathname = usePathname();
  const isEditorMode = pathname.startsWith("/editor");



  return (
    <div className={s.story_block}>
      {isEditorMode && onChangeTitle ? (
        <input
          type="text"
          className={s.title_input}
          aria-label="Название истории"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Название истории"
        />
      ) : (
        <h2 className={s.title_text}>{title}</h2>
      )}

      <div className={s.scene_count}>
        <span className={s.label}>Количество сцен: {sceneCount}</span>
      </div>
    </div>
  );
}
