"use client";
import StoryHeader from "@/entities/StoryHeader";
import { useStoryEditor } from "@/shared/lib/hooks/useStoryEditor";

export default function ReadPage() {
  const { title, scenes } = useStoryEditor();
  const sceneCount = scenes.length;


  return (
    <>
      <StoryHeader title={title} sceneCount={sceneCount} />
    </>
  );
}
