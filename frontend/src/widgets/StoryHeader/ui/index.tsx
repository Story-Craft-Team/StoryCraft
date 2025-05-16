"use client"
import { useStoryEditor } from "@/shared/lib/hooks/useStoryEditor";
import React from "react";

export default function StoryEditor() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    scenes,
    setSceneTitle,
    addNewScene,
  } = useStoryEditor();

  return (
    <div style={{ padding: "20px" }}>
      {/* Описание истории */}
      <textarea
        placeholder="Введите описание истории"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      {/* Список сцен */}
      {scenes.map((scene) => (
        <div key={scene.id} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={scene.title}
            onChange={(e) => setSceneTitle(scene.id, e.target.value)}
            placeholder={`Заголовок сцены ${scene.id}`}
            style={{ width: "100%" }}
          />
        </div>
      ))}

      {/* Кнопка добавить сцену */}
      <button onClick={addNewScene}>Добавить сцену</button>
    </div>
  );
}
