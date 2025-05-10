import { StoryEditorSlice } from "@/shared/lib/types";
import { StateCreator } from "zustand";

export const storyEditorSlice: StateCreator<
  StoryEditorSlice,
  [["zustand/immer", never]],
  [],
  StoryEditorSlice
> = (set, get) => ({
  title: "",
  author: "",
  authorId: "",
  description: "",
  image: "",
  isPublic: false,
  scenes: [],

  setTitle: (title) => set({ title }),
  setAuthor: (author) => set({ author }),
  setAuthorId: (authorId) => set({ authorId }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image }),
  setIsPublic: (isPublic) => set({ isPublic }),
  setScenes: (scenes) => set({ scenes }),
})