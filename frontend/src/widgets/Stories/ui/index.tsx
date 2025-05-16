import Story from "@/features/Story/ui";
import s from "./Stories.module.scss";

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
