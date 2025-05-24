import styles from "./StoryHeader.module.scss";

type StoryHeaderProps = {
  title: string;
  sceneCount: number;
  description?: string;
  onChangeTitle?: (val: string) => void;
  onChangeDescription?: (val: string) => void;
  editable?: boolean;
};

export default function StoryHeader({
  title,
  sceneCount,
  description,
  onChangeTitle,
  onChangeDescription,
  editable = false,
}: StoryHeaderProps) {
  return (
    <div className={styles.container}>
      {editable && onChangeTitle ? (
        <div className={styles.titleRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="story-title" className={styles.label}>
              Название истории
            </label>
            <input
              id="story-title"
              type="text"
              className={styles.titleInput}
              aria-label="Название истории"
              value={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="Название истории"
            />
          </div>
          <div className={styles.sceneCount}>Количество сцен: {sceneCount}</div>
        </div>
      ) : (
        <div className={styles.titleRow}>
          <h2 className={styles.titleText}>{title}</h2>
          <div className={styles.sceneCount}>Количество сцен: {sceneCount}</div>
        </div>
      )}

      {editable && onChangeDescription && (
        <div className={styles.inputGroup}>
          <label htmlFor="story-description" className={styles.label}>
            Описание истории
          </label>
          <textarea
            id="story-description"
            className={styles.description}
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="Описание истории"
            aria-label="Описание истории"
          />
        </div>
      )}
    </div>
  );
}
