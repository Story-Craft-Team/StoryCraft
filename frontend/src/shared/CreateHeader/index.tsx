import s from "./CreateHeader.module.scss";

export default function CreateHeader() {
  return (
    <input
      className={s.title_input}
      type="text"
      placeholder="Title of the new story"
    />
  );
}
