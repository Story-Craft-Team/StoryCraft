import { useStore } from "@/shared/store";
import styles from "./EditorButtons.module.scss";

export const AddChoiceButton = ({ sceneId }: { sceneId: number }) => {
  const addNewChoice = useStore((s) => s.addNewChoice);

  return (
    <button onClick={() => addNewChoice(sceneId)} className={styles.addButton}>
      + Добавить выбор
    </button>
  );
};
