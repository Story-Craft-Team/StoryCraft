"use client";
import StoryEditor from "@/widgets/StoryEditor";
import StoryHeader from "@/entities/StoryHeader";
import { useStoryEditor } from "@/shared/lib/hooks/useStoryEditor";

export default function EditorPage() {
  const { title, setTitle, scenes} = useStoryEditor();
  const sceneCount = scenes.length + 15 // убрать потом 15


  return (
    <>
      <StoryHeader onChangeTitle={setTitle} title={title} sceneCount={sceneCount} />
      <StoryEditor />
    </>
  );
}



// TODO Собрать по компонентам страничку едитора
