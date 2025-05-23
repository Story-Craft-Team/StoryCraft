"use client";
import SceneCard from "@/entities/SceneCard/ui";
import { useStore } from "@/shared/store";

const colors = {
  bg: "#1a1a1a",
  panel: "#2a2a2a",
  text: "#f0f0f0",
  accent: "#ff5722",
  inputBg: "rgba(0, 0, 0, 0.5)",
  inputBorder: "none",
};

export default function StoryEditor() {
  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const scenes = useStore((state) => state.scenes);
  const setSceneTitle = useStore((state) => state.setSceneTitle);
  const setSceneDescription = useStore((state) => state.setSceneDescription);
  const addNewScene = useStore((state) => state.addNewScene);
  const setChoiceText = useStore((state) => state.setChoiceText);
  const setChoiceNextScene = useStore((state) => state.setChoiceNextScene);
  const setChoiceAccess = useStore((state) => state.setChoiceAccess);
  const addNewChoice = useStore((state) => state.addNewChoice);
  const setIsPublic = useStore((state) => state.setIsPublic);
  const setSceneMaxChoices = useStore((state) => state.setSceneMaxChoices);
  const setSceneIsEnd = useStore((state) => state.setSceneIsEnd);
  const isPublic = useStore((state) => state.isPublic);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: "100vh",
      }}
    >
      {scenes.map((scene) => (
        <SceneCard key={scene.id} scene={scene} />
      ))}

      <button
        onClick={addNewScene}
        style={{
          width: "100%",
          background: colors.accent,
          color: "#fff",
          fontFamily: "'Nunito', sans-serif",
          padding: "0.6rem",
          borderRadius: "6px",
          border: "none",
          fontSize: "1rem",
          marginTop: "1rem",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Добавить сцену
      </button>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "flex-start",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => console.log("Сохранено")}
          style={{
            padding: "0.6rem 1rem",
            fontFamily: "'Nunito', sans-serif",
            backgroundColor: colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
        >
          Сохранить
        </button>

        <button
          onClick={() => setIsPublic(true)}
          disabled={isPublic}
          style={{
            padding: "0.6rem 1rem",
            backgroundColor: isPublic ? "#999" : colors.accent,
            color: "#fff",
            border: "none",
            fontFamily: "'Nunito', sans-serif",
            borderRadius: "8px",
            boxShadow: isPublic ? "none" : "0 2px 6px rgba(0, 0, 0, 0.2)",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: isPublic ? "not-allowed" : "pointer",
            opacity: isPublic ? 0.7 : 1,
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseOver={(e) => {
            if (!isPublic) e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Опубликовать
        </button>

        <button
          onClick={() => setIsPublic(false)}
          disabled={!isPublic}
          style={{
            padding: "0.6rem 1rem",
            backgroundColor: !isPublic ? "#999" : "#d32f2f",
            color: "#fff",
            fontFamily: "'Nunito', sans-serif",
            border: "none",
            borderRadius: "8px",
            boxShadow: !isPublic ? "none" : "0 2px 6px rgba(0, 0, 0, 0.2)",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: !isPublic ? "not-allowed" : "pointer",
            opacity: !isPublic ? 0.7 : 1,
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseOver={(e) => {
            if (isPublic) e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Отменить публикацию
        </button>
      </div>
    </div>
  );
}
