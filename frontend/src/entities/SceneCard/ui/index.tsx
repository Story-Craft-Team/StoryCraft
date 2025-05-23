"use client";

import { ChoiceCard } from "@/entities/ChoiceCard";
import { AddChoiceButton } from "@/features/Editor/ui/AddChoiceButton";
import { RemoveSceneButton } from "@/features/Editor/ui/RemoveSceneButton";
import { IScene } from "@/shared/lib/types";
import { useStore } from "@/shared/store";

interface SceneProps {
  scene: IScene;
}

const colors = {
  bg: "#1a1a1a",
  panel: "#2a2a2a",
  text: "#f0f0f0",
  accent: "#ff5722",
  inputBg: "rgba(0, 0, 0, 0.5)",
  inputBorder: "none",
};

export default function SceneCard({ scene }: SceneProps) {
  const scenes = useStore((state) => state.scenes);
  const setSceneTitle = useStore((state) => state.setSceneTitle);
  const setSceneDescription = useStore((state) => state.setSceneDescription);
  const addNewChoice = useStore((state) => state.addNewChoice);
  const setSceneMaxChoices = useStore((state) => state.setSceneMaxChoices);
  const setSceneIsEnd = useStore((state) => state.setSceneIsEnd);

  return (
    <div
      style={{
        background: colors.panel,
        border: colors.inputBorder,
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            minWidth: "1rem",
            paddingRight: "0.6rem",
            color: colors.accent,
            fontSize: "2rem",
          }}
        >
          {scenes.indexOf(scene) + 1}
        </span>

        <input
          type="text"
          value={scene.title}
          onChange={(e) => setSceneTitle(scene.id, e.target.value)}
          placeholder="Заголовок сцены"
          style={{
            flexGrow: 1,
            padding: "0.5rem",
            fontSize: "1rem",
            border: colors.inputBorder,
            borderRadius: "6px",
            backgroundColor: colors.inputBg,
            color: colors.text,
          }}
        />
      </div>

      <textarea
        value={scene.description}
        onChange={(e) => setSceneDescription(scene.id, e.target.value)}
        placeholder="Описание сцены"
        style={{
          width: "97.8%",
          minHeight: "80px",
          padding: "0.5rem",
          fontSize: "1rem",
          border: colors.inputBorder,
          borderRadius: ".3rem",
          resize: "vertical",
          lineHeight: "1.4",
          background: colors.inputBg,
          color: colors.text,
          marginBottom: "1rem",
          marginLeft: "1.6rem",
        }}
      />

      <div
        style={{
          marginLeft: "1.6rem",
          marginBottom: "1rem",
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
      >
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
            checked={scene.isEnd}
            onChange={(e) => setSceneIsEnd(scene.id, e.target.checked)}
            style={{ display: "none" }} // скрываем оригинальный чекбокс
          />
          <span
            style={{
              width: "20px",
              height: "20px",
              border: `3px solid #00000080`,
              borderRadius: "4px",
              backgroundColor: scene.isEnd ? "#000" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s, border-color 0.2s",
            }}
          >
            {scene.isEnd && (
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
          <span>Это концовка?</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Количество выборов:
          <select
            value={scene.maxChoices}
            onChange={(e) =>
              setSceneMaxChoices(scene.id, parseInt(e.target.value))
            }
            style={{
              padding: "0.4rem",
              backgroundColor: colors.inputBg,
              color: colors.text,
              border: `none`,
              borderRadius: "4px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* чойсы */}
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
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <RemoveSceneButton sceneId={scene.id} />
      </div>
    </div>
  );
}

// TODO вынести стили
