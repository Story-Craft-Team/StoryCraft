"use client";
import { StoryHeader } from "@/entities";
import { useStore } from "@/shared/store";
import { StoryEditor } from "@/widgets";
import { useShallow } from "zustand/react/shallow";

export default function EditorPage() {
  

  return (
    <>
      <StoryHeader mode="editor" />
      <StoryEditor />
    </>
  );
}
