import { Scene } from "@/features";
import s from "./Scenes.module.scss";

export default function Scenes() {
  return (
    <div className={s.scenes}>
      <Scene id={1} />
      <Scene id={2} />
      <Scene id={3} />
    </div>
  ); // Later need to get an ID from the store
}
