"use client";
import { StoryHeader } from "@/entities";
import { useStore } from "@/shared/store";
import { StoryEditor } from "@/widgets";

export default function EditorPage() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    scenes,
    setSceneTitle,
    addNewScene,
  } = useStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
    description: state.description,
    setDescription: state.setDescription,
    scenes: state.scenes,
    setSceneTitle: state.setSceneTitle,
    addNewScene: state.addNewScene,
  }));
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
