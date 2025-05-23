import { useStore } from "@/shared/store";
import { FiX } from "react-icons/fi";
import styles from "./EditorButtons.module.scss";

export const RemoveSceneButton = ({ sceneId }: { sceneId: number }) => {
  return (
    <button
      onClick={() => useStore.getState().removeScene(sceneId)}
      className={styles.removeButton}
      title="Удалить сцену"
    >
      {/* <FiX /> */}
      Удалить сцену
    </button>
  );
};
