"use client";
import { IChoice, IScene } from "@/shared/lib/types";
import { useStore } from "@/shared/store";
import CustomCheckbox from "@/shared/ui/CustomCheckbox/ui";
import { FaCheck } from "react-icons/fa";
import styles from "./ChoiceCard.module.scss";

interface ChoiceCardProps {
  scene: IScene;
  choice: IChoice;
  index: number;
}

const ChoiceCard = ({ scene, choice, index }: ChoiceCardProps) => {
  const scenes = useStore((state) => state.scenes);
  const setChoiceText = useStore((state) => state.setChoiceText);
  const setChoiceNextScene = useStore((state) => state.setChoiceNextScene);
  const setChoiceAccess = useStore((state) => state.setChoiceAccess);

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
            setChoiceNextScene(scene.id, choice.id, Number(e.target.value))
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
