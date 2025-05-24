"use client";
import { StoryHeader } from "@/entities";
import { useStore } from "@/shared/store";
import { StoryEditor } from "@/widgets";

export default function EditorPage() {
  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const scenes = useStore((state) => state.scenes);

  return (
    <>
      <StoryHeader
        editable
        title={title}
        onChangeTitle={setTitle}
        description={description}
        onChangeDescription={setDescription}
        sceneCount={scenes.length}
      />
      <StoryEditor />
    </>
  );
}
//TODO пропсы убрать
// TODO Собрать по компонентам страничку едитора
