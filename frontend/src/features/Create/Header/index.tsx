import s from "./ui/Header.module.scss";

export default function Header() {
  return (
    <input
      className={s.title_input}
      type="text"
      placeholder="Title of the new story"
    />
  );
}
