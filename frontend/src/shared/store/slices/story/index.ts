import { Store, StoryEditorSlice } from "@/shared/lib/types";
import { StateCreator } from "zustand";

export const storyEditorSlice: StateCreator<
  Store,
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

  addNewScene: () =>
    set({
      scenes: [
        ...get().scenes,
        {
          id: get().scenes.length + 1,
          title: "",
          description: "",
          image: "",
          isEnd: false,
          choices: [{ id: 1, text: "", nextScene: 0, access: true }],
        },
      ],
    }),

  removeScene: (sceneId: any) =>
    set({
      scenes: get().scenes.filter((scene) => scene.id !== sceneId),
    }),

  setSceneTitle: (sceneId, title) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, title } : scene
      ),
    }),

  setSceneDescription: (sceneId: number, description: string) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, description } : scene
      ),
    }),

  setSceneIsEnd: (sceneId, isEnd) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, isEnd } : scene
      ),
    }),

  setSceneImage: (sceneId, image) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, image } : scene
      ),
    }),

  addNewChoice: (sceneId: number) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: [
                ...scene.choices,
                {
                  id: scene.choices.length + 1,
                  text: "",
                  nextScene: 0,
                  access: true,
                },
              ],
            }
          : scene
      ),
    }),

  removeChoice: (sceneId, choiceId) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.filter((choice) => choice.id !== choiceId),
            }
          : scene
      ),
    }),

  setChoiceText: (sceneId: number, choiceId: number, text: string) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.map((choice) =>
                choice.id === choiceId ? { ...choice, text } : choice
              ),
            }
          : scene
      ),
    }),

  setChoiceNextScene: (sceneId, choiceId, nextSceneId) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.map((choice) =>
                choice.id === choiceId
                  ? { ...choice, nextScene: nextSceneId }
                  : choice
              ),
            }
          : scene
      ),
    }),

  setChoiceAccess: (sceneId, choiceId, access) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.map((choice) =>
                choice.id === choiceId ? { ...choice, access } : choice
              ),
            }
          : scene
      ),
    }),

  getSceneTitle: (sceneId: number) =>
    get().scenes.find((scene) => scene.id === sceneId)?.title || "",
});
