"use client";
import { useStore } from "@/shared/store";

export default function StoryEditor() {
  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const scenes = useStore((state) => state.scenes);
  const setSceneTitle = useStore((state) => state.setSceneTitle);
  const addNewScene = useStore((state) => state.addNewScene);
  const setChoiceText = useStore((state) => state.setChoiceText);
  const setChoiceNextScene = useStore((state) => state.setChoiceNextScene);
  const setChoiceAccess = useStore((state) => state.setChoiceAccess);
  const addNewChoice = useStore((state) => state.addNewChoice);
  const setIsPublic = useStore((state) => state.setIsPublic);
  const isPublic = useStore((state) => state.isPublic);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Редактор истории
      </h1>

      {/* Список сцен */}
      {scenes.map((scene) => (
        <div
          key={scene.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            background: "#fafafa",
          }}
        >
          {/* Строка с ID и заголовком сцены */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontWeight: "bold", minWidth: "3rem" }}>
              ID: {scene.id}
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
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Список выборов */}
          {scene.choices.map((choice) => (
            <div
              key={choice.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="text"
                value={choice.text}
                onChange={(e) =>
                  setChoiceText(scene.id, choice.id, e.target.value)
                }
                placeholder={`Выбор ${choice.id}`}
                style={{
                  flex: 1,
                  padding: "0.4rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
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
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  minWidth: "160px",
                }}
              >
                <option value={0}>Выберите сцену
                </option>
                  {scenes.filter((s)=> s.id !== scene.id).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title || `Сцена ${s.id}`}
                    </option>
                  ))}
              </select>
              <label
                style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                <input
                  type="checkbox"
                  checked={choice.access}
                  onChange={(e) =>
                    setChoiceAccess(scene.id, choice.id, e.target.checked)
                  }
                />
                Доступен
              </label>
            </div>
          ))}

          <button
            onClick={() => addNewChoice(scene.id)}
            style={{
              marginTop: "0.5rem",
              background: "#eee",
              border: "none",
              padding: "0.4rem 0.8rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Добавить выбор
          </button>
        </div>
      ))}

      <button
        style={{
          width: "100%",
          background: "#4CAF50",
          color: "#fff",
          padding: "0.8rem",
          borderRadius: "6px",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
          marginTop: "1rem",
        }}
        onClick={addNewScene}
      >
        ➕ Добавить сцену
      </button>
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
        }}
      >
        <button
          onClick={() =>
            // логика сохранения
            console.log("Черновик сохранен")
          }
          style={buttonStyle}
        >
          💾 Сохранить
        </button>
        <button
          onClick={() => setIsPublic(true)}
          disabled={isPublic}
          style={{
            ...buttonStyle,
            backgroundColor: isPublic ? "#aaa" : "#4CAF50",
            cursor: isPublic ? "not-allowed" : "pointer",
          }}
        >
          🌐 Опубликовать
        </button>
        <button
          onClick={() => setIsPublic(false)}
          disabled={!isPublic}
          style={{
            ...buttonStyle,
            backgroundColor: !isPublic ? "#aaa" : "#4CAF50",
            cursor: !isPublic ? "not-allowed" : "pointer",
          }}
        >
          ❌ Отменить публикацию
        </button>
        {/* <button
          onClick={() => {
            if (confirm("Удалить историю полностью?")) resetStory();
          }}
          style={{
            ...buttonStyle,
            backgroundColor: "#d32f2f",
          }}
        >
          🗑 Удалить
        </button> */}
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
};
