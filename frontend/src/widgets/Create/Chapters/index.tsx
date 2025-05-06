import Chapter from "@/features/Create/Chapters/Chapter";
import s from "./ui/Chapters.module.scss";

export default function Chapters() {
  return (
    <div className={s.chapters}>
      <Chapter id={1} />
      <Chapter id={2} />
      <Chapter id={3} />
    </div>
  ); // Later need to get an ID from the store
}
