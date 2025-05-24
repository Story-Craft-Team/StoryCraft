"use client";

import { ChoiceCard } from "@/entities/ChoiceCard";
import { AddChoiceButton } from "@/features/Editor/ui/AddChoiceButton";
import { RemoveSceneButton } from "@/features/Editor/ui/RemoveSceneButton";
import { IScene } from "@/shared/lib/types";
import { useStore } from "@/shared/store";
import CustomCheckbox from "@/shared/ui/CustomCheckbox/ui";
import { FaCheck } from "react-icons/fa";
import styles from "./SceneCard.module.scss";

interface SceneProps {
  scene: IScene;
}

export default function SceneCard({ scene }: SceneProps) {
  const scenes = useStore((state) => state.scenes);
  const setSceneTitle = useStore((state) => state.setSceneTitle);
  const setSceneDescription = useStore((state) => state.setSceneDescription);
  const setSceneMaxChoices = useStore((state) => state.setSceneMaxChoices);
  const setSceneIsEnd = useStore((state) => state.setSceneIsEnd);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.index}>{scenes.indexOf(scene) + 1}</span>

        <input
          type="text"
          value={scene.title}
          onChange={(e) => setSceneTitle(scene.id, e.target.value)}
          placeholder="Заголовок сцены"
          className={styles.titleInput}
        />
      </div>

      <textarea
        value={scene.description}
        onChange={(e) => setSceneDescription(scene.id, e.target.value)}
        placeholder="Описание сцены"
        className={styles.description}
      />

      <div className={styles.controls}>
        <CustomCheckbox
          checked={scene.isEnd}
          onChange={(val) => setSceneIsEnd(scene.id, val)}
          label="Это концовка?"
          icon={<FaCheck />}
        />

        <label className={styles.selectLabel}>
          Количество выборов:
          <select
            value={scene.maxChoices}
            onChange={(e) =>
              setSceneMaxChoices(scene.id, parseInt(e.target.value))
            }
            className={styles.select}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>

      {scene.choices.map((choice, index) => (
        <ChoiceCard
          scene={scene}
          choice={choice}
          index={index}
          key={choice.id}
        />
      ))}

      {scene.choices.length < scene.maxChoices && (
        <AddChoiceButton sceneId={scene.id} />
      )}

      <div className={styles.footer}>
        <RemoveSceneButton sceneId={scene.id} />
      </div>
    </div>
  );
}
