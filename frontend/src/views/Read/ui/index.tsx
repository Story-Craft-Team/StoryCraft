"use client";
import { StoryHeader } from "@/entities";
import { useStoryEditor } from "@/shared/lib/hooks";

export default function ReadPage() {
  const { title, scenes } = useStoryEditor();
  const sceneCount = scenes.length;

  return (
    <>
      <StoryHeader title={title} sceneCount={sceneCount} />
    </>
  );
}
