"use client";
import { StoryHeader } from "@/entities";
import { useStore } from "@/shared/store";

export default function ReadPage() {
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
  const sceneCount = scenes.length;

  return (
    <>
      <StoryHeader title={title} sceneCount={sceneCount} />
    </>
  );
}
