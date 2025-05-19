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
  const setSceneTitle = useStore((state) => state.setSceneTitle);
  const addNewScene = useStore((state) => state.addNewScene);

  const sceneCount = scenes.length + 15; // убрать потом 15

  return (
    <>
      <StoryHeader
        onChangeTitle={setTitle}
        title={title}
        sceneCount={sceneCount}
      />
      <StoryEditor />
    </>
  );
}

// TODO Собрать по компонентам страничку едитора
