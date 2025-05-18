"use client";
import { useStore } from "@/shared/store";

export default function StoryEditor() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    scenes,
    setSceneTitle,
    addNewScene,
  } = useStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
    description: state.description,
    setDescription: state.setDescription,
    scenes: state.scenes,
    setSceneTitle: state.setSceneTitle,
    addNewScene: state.addNewScene,
  }));

  return (
    <div>
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
