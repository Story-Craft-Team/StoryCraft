import s from "./ui/Chapter.module.scss";

interface Props {
  id: number;
}

export default function Chapter({ id }: Props) {
  return (
    <div className={s.chapter_container}>
      <div className={s.chapter_title}>
        <h2>Chapter {id}</h2>
      </div>
      <div className={s.chapter}>
        <textarea
          className={s.text_input}
          placeholder="First chapter of the story"
        ></textarea>
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
