import { FaUser } from "react-icons/fa";
import { IoMdCreate, IoMdSettings } from "react-icons/io";
import s from "./ui/Header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className={s.header}>
      <div className={s.left}>
        <h1>Story Craft</h1>
        <p>The project in which you can create your own story!</p>
      </div>
      <div className={s.right}>
        <Link href="/create">
          <IoMdCreate />
        </Link>
        <Link href="/settings">
          <IoMdSettings />
        </Link>
        <Link href="/account">
          <FaUser />
        </Link>
      </div>
    </div>
  );
}
