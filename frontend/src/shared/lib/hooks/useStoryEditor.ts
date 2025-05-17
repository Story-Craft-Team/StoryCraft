import { useStore } from "@/shared/store";

export default function useStoryEditor() {
  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);
  const author = useStore((state) => state.author);
  const setAuthor = useStore((state) => state.setAuthor);
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const isPublic = useStore((state) => state.isPublic);
  const setIsPublic = useStore((state) => state.setIsPublic);
  const scenes = useStore((state) => state.scenes);
  const setSceneTitle = useStore((state) => state.setSceneTitle);
  const addNewScene = useStore((state) => state.addNewScene);

  return {
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    isPublic,
    setIsPublic,
    scenes,
    setSceneTitle,
    addNewScene,
  };
}
