import { Store, StoryEditorSlice } from "@/shared/lib/types";
import { StateCreator } from "zustand";

export const storyEditorSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  StoryEditorSlice
> = (set, get) => ({
  title: "Плаг",
  author: "lovecult",
  authorId: "123123",
  description: "Вас обманули на вес, вы ищете плага",
  image: "",
  isPublic: false,
  scenes: [
    {
      id: 1,
      title: "Вы выезжаете с братом искать плага",
      description:
        "Вы оказываетесь в раздумьях куда поехать. Куда выберите поехать?",
      isEnd: false,
      maxChoices: 0,
      choices: [
        {
          id: 1,
          text: "В бутово",
          nextScene: 1001,
          access: true,
        },
        {
          id: 2,
          text: "В митино",
          nextScene: 1002,
          access: true,
        },
      ],
    },
    {
      id: 2,
      title: "Вы приехали в бутово",
      description: "Вы обнаружили плага, и забрали деньги обратно!",
      isEnd: true,
      maxChoices: 0,
      choices: [],
    },
    {
      id: 3,
      title: "Вы приехали в митино",
      description: "Вы никого не нашли, он улетел на самолете в другую страну!",
      isEnd: true,
      maxChoices: 0,
      choices: [],
    },
  ],
  // операции
  setTitle: (title) => set({ title }),
  setAuthor: (author) => set({ author }),
  setAuthorId: (authorId) => set({ authorId }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image }),
  setIsPublic: (isPublic) => set({ isPublic }),
  setScenes: (scenes) => set({ scenes }),

  addNewScene: () => {
    const scenes = get().scenes;
    const nextId = Math.max(0, ...scenes.map((s) => s.id)) + 1;

    set((state) => ({
      scenes: [
        ...state.scenes,
        {
          id: nextId,
          title: "",
          description: "",
          image: "",
          isEnd: false,
          maxChoices: 0,
          choices: [{ id: 1, text: "", nextScene: 0, access: true }],
        },
      ],
    }));
  },

  removeScene: (sceneId) =>
    set({
      scenes: get().scenes.filter((scene) => scene.id !== sceneId),
    }),

  setSceneTitle: (sceneId, title) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, title } : scene
      ),
    }),

  setSceneDescription: (sceneId, description) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, description } : scene
      ),
    }),

  setSceneMaxChoices: (sceneId, maxChoices) =>
    set((state) => {
      const scene = state.scenes.find((s) => s.id === sceneId);
      if (!scene) return state;

      let updatedChoices = [...scene.choices];

      const withText = updatedChoices.filter((c) => c.text?.trim());
      const withoutText = updatedChoices.filter((c) => !c.text?.trim());

      if (withText.length >= maxChoices) {
        updatedChoices = withText.slice(0, maxChoices);
      } else {
        updatedChoices = [
          ...withText,
          ...withoutText.slice(0, maxChoices - withText.length),
        ];
      }

      return {
        scenes: state.scenes.map((s) =>
          s.id === sceneId ? { ...s, maxChoices, choices: updatedChoices } : s
        ),
      };
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

  addNewChoice: (sceneId) =>
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

  setChoiceNextSceneId: (
    sceneId,
    choiceId,
    nextSceneId
  ) =>
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
});
