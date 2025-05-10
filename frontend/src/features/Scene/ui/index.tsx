import TextInput from "@/entities/TextInput/ui";
import s from "./Scene.module.scss";

interface Props {
  id: number;
}

export default function Scene({ id }: Props) {
  return (
    <div className={s.sceneiner}>
      <div className={s.scene_title}>
        <h2>Scene {id}</h2>
      </div>
      <div className={s.scene}>
      <TextInput />
        <div className={s.actions_container}>
          <div className={s.actions}>
            <textarea
              className={s.action_input}
              placeholder="First action of the story"
            ></textarea>
            <textarea
              className={s.action_input}
              placeholder="First action of the story"
            ></textarea>
            <textarea
              className={s.action_input}
              placeholder="First action of the story"
            ></textarea>
            <textarea
              className={s.action_input}
              placeholder="First action of the story"
            ></textarea>
          </div>
          <button className={s.add_action}>Add action</button>
        </div>
      </div>
    </div>
  );
}
