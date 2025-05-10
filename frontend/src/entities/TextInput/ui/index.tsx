import s from "./TextInput.module.scss";

export default function TextInput() {
  return (
    <textarea
      className={s.text_input}
      placeholder="First scene of the story"
    ></textarea>
  );
}