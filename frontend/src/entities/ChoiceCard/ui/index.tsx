"use client";
import { IChoice, IScene } from "@/shared/lib/types";
import { useStore } from "@/shared/store";

interface ChoiceCardProps {
  scene: IScene;
  choice: IChoice;
  index: number;
}

const colors = {
  bg: "#1a1a1a",
  panel: "#2a2a2a",
  text: "#f0f0f0",
  accent: "#ff5722",
  inputBg: "rgba(0, 0, 0, 0.5)",
  inputBorder: "none",
};

const ChoiceCard = ({ scene, choice, index }: ChoiceCardProps) => {
  // const scenes = useStore((state) => state.scenes);
  // const setChoiceText = useStore((state) => state.setChoiceText);
  // const setChoiceNextScene = useStore((state) => state.setChoiceNextScene);
  // const setChoiceAccess = useStore((state) => state.setChoiceAccess);
  const { scenes, setChoiceText, setChoiceNextScene, setChoiceAccess } =
    useStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontWeight: "bold", color: "#fff" }}>
          <span>{index + 1}</span>
        </span>
        <input
          type="text"
          value={choice.text}
          onChange={(e) => setChoiceText(scene.id, choice.id, e.target.value)}
          placeholder={`Текст выбора`}
          style={{
            flex: 1,
            padding: "0.4rem",
            fontSize: "1rem",
            backgroundColor: colors.inputBg,
            border: `none`,
            borderRadius: "4px",
            color: colors.text,
            marginLeft: "0.6rem",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          marginLeft: "1.6rem",
        }}
      >
        <select
          value={choice.nextScene}
          onChange={(e) =>
            setChoiceNextScene(scene.id, choice.id, Number(e.target.value))
          }
          style={{
            padding: "0.4rem",
            fontSize: "1rem",
            backgroundColor: colors.inputBg,
            border: `none`,
            borderRadius: "4px",
            minWidth: "20rem",
            color: colors.text,
          }}
        >
          {/*TODO щас работает неправильно выборка по порядку, но когда сцену удаляешьи потом новую создаешь айди меняеться */}
          <option value={0}>Выберите следующую сцену</option>
          {scenes
            .filter((s) => s.id !== scene.id)
            .map((s) => {
              // Получаем индекс сцены в основном массиве scenes (до фильтра)
              const sceneIndex = scenes.findIndex((sc) => sc.id === s.id);
              return (
                <option key={s.id} value={s.id}>
                  {s.title || `Сцена ${sceneIndex + 1}`}
                </option>
              );
            })}
        </select>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={choice.access}
            onChange={(e) =>
              setChoiceAccess(scene.id, choice.id, e.target.checked)
            }
            style={{ display: "none" }} // скрываем оригинальный чекбокс
          />
          <span
            style={{
              width: "18px",
              height: "18px",
              border: "2px solid black",
              borderRadius: "4px",
              backgroundColor: choice.access ? "#000" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s, border-color 0.2s",
            }}
          >
            {choice.access && (
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: "14px",
                  height: "14px",
                  fill: "#fff",
                }}
              >
                <path d="M9 16.2l-3.5-3.5L4 14.3l5 5 12-12-1.4-1.4z" />
              </svg>
            )}
          </span>
          <span>Доступ</span>
        </label>
      </div>
    </div>
  );
};

export default ChoiceCard;
