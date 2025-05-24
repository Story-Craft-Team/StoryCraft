"use client";
import { IChoice, IScene } from "@/shared/lib/types";
import { useStore } from "@/shared/store";
import { CustomCheckbox } from "@/shared/ui";
import { FaCheck } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";
import styles from "./ChoiceCard.module.scss";

interface ChoiceCardProps {
  scene: IScene;
  choice: IChoice;
  index: number;
}

const ChoiceCard = ({ scene, choice, index }: ChoiceCardProps) => {
  const { scenes, setChoiceText, setChoiceNextSceneId, setChoiceAccess } =
    useStore(
      useShallow((state) => ({
        scenes: state.scenes,
        setChoiceText: state.setChoiceText,
        setChoiceNextSceneId: state.setChoiceNextSceneId,
        setChoiceAccess: state.setChoiceAccess,
      }))
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <span className={styles.index}>{index + 1}</span>
        <input
          type="text"
          value={choice.text}
          onChange={(e) => setChoiceText(scene.id, choice.id, e.target.value)}
          placeholder="Текст выбора"
          className={styles.input}
        />
      </div>

      <div className={styles.options}>
        <select
          value={choice.nextScene}
          onChange={(e) =>
            setChoiceNextSceneId(scene.id, choice.id, Number(e.target.value))
          }
          className={styles.select}
        >
          <option value={0}>Выберите следующую сцену</option>
          {scenes
            .filter((s) => s.id !== scene.id)
            .map((s) => {
              const sceneIndex = scenes.findIndex((sc) => sc.id === s.id);
              return (
                <option key={s.id} value={s.id}>
                  {s.title || `Сцена ${sceneIndex + 1}`}
                </option>
              );
            })}
        </select>
        <CustomCheckbox
          checked={choice.access}
          onChange={(checked) => setChoiceAccess(scene.id, choice.id, checked)}
          label="Доступ"
          icon={<FaCheck />}
        />
      </div>
    </div>
  );
};

export default ChoiceCard;
