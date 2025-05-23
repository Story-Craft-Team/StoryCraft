"use client";

import { Modal } from "@/shared/ui/Modal";
import React, { useEffect, useState } from "react";
import s from "./MainModal.module.scss";
import { useStore } from "@/shared/store";

export default function HomeModal() {
	const [hasUserData, setHasUserData] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const theme = useStore(state => state.settings.theme)
	useEffect(() => {
		//getting authorized user data
		setHasUserData(!!localStorage.getItem("userData"));
		const data = localStorage.getItem("userData");
		if (data) {
			setUsername(JSON.parse(data).username);
		}
	}, []);

	return (
		<>
			{hasUserData && (
				<Modal>
					<h1 className={theme === "dark" ? s.alertDark : s.alertLight}>Приветствую, {username}</h1>
				</Modal>
			)}
		</>
	);
}
