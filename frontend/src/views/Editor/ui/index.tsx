"use client";
import { StoryHeader } from "@/entities";
import { useStoryEditor } from "@/shared/lib/hooks";
import { StoryEditor } from "@/widgets";

export default function EditorPage() {
  const { title, setTitle, scenes } = useStoryEditor();
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
