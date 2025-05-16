import React from "react";
import s from "./Submit.module.scss";

interface Props {
	children: React.ReactNode;
}

export default function Submit({ children }: Props) {
	return (
		<button type="submit" className={s.btn}>
			{children}
		</button>
	);
}
