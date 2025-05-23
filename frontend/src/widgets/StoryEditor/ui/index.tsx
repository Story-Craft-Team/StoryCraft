"use client";
import { useStore } from "@/shared/store";
import { FiX } from "react-icons/fi";

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
        <div
          key={scene.id}
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

            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
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

          {scene.choices.map((choice, index) => (
            <div
              key={choice.id}
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
                  onChange={(e) =>
                    setChoiceText(scene.id, choice.id, e.target.value)
                  }
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
                    setChoiceNextScene(
                      scene.id,
                      choice.id,
                      Number(e.target.value)
                    )
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
                  <option value={0}>Выберите следующую сцену</option>
                  {scenes
                    .filter((s) => s.id !== scene.id)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title || `Сцена ${s.id}`}
                      </option>
                    ))}
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
          ))}

          {scene.choices.length < scene.maxChoices && (
            <button
              onClick={() => addNewChoice(scene.id)}
              style={{
                marginTop: "0.5rem",
                fontFamily: "'Nunito', sans-serif",
                marginLeft: "1.6rem",
                background: colors.accent,
                border: "none",
                color: "#fff",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              + Добавить выбор
            </button>
          )}
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => useStore.getState().removeScene(scene.id)}
              style={{
                width: "20%",
                background: colors.accent,
                color: "#fff",
                fontFamily: "'Nunito', sans-serif",
                padding: "0.4rem",
                borderRadius: "6px",
                border: "none",
                fontSize: ".9rem",
                cursor: "pointer",
                marginTop: "1rem",
                fontWeight: "bold",
              }}
              title="Удалить сцену"
            >
              <FiX />
              Удалить сцену
            </button>
          </div>
        </div>
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
          justifyContent: "flex-start", // прижато влево
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

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "none",
  color: "white",
  backgroundColor: "#2196F3",
  cursor: "pointer",
  fontWeight: "bold",
};
