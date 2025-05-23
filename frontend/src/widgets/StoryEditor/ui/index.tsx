"use client";
import SceneCard from "@/entities/SceneCard/ui";
import { useStore } from "@/shared/store";
import styles from "./StoryEditor.module.scss";

export default function StoryEditor() {
  const scenes = useStore((state) => state.scenes);
  const addNewScene = useStore((state) => state.addNewScene);
  const setIsPublic = useStore((state) => state.setIsPublic);
  const isPublic = useStore((state) => state.isPublic);
  
  return (
    <div className={styles.container}>
      {scenes.map((scene) => (
        <SceneCard key={scene.id} scene={scene} />
      ))}

      <button onClick={addNewScene} className={styles.addSceneButton}>
        Добавить сцену
      </button>

      <div className={styles.controls}>
        <button className={`${styles.controlButton} ${styles.save}`} onClick={() => console.log("Сохранено")}>
          Сохранить
        </button>

        <button
          className={`${styles.controlButton} ${styles.publish} ${isPublic ? styles.disabled : ""}`}
          onClick={() => setIsPublic(true)}
          disabled={isPublic}
        >
          Опубликовать
        </button>

        <button
          className={`${styles.controlButton} ${styles.unpublish} ${!isPublic ? styles.disabled : ""}`}
          onClick={() => setIsPublic(false)}
          disabled={!isPublic}
        >
          Отменить публикацию
        </button>
      </div>
    </div>
  );
}
// TODO когда будет апи - то вынести 3 кнопки действия отдельно в features (наверно)