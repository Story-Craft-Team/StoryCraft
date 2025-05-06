import Story from "@/features/Home/Story";
import s from "./ui/Stories.module.scss";

export default function Stories() {
  return (
    <div className={s.stories}>
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
}
