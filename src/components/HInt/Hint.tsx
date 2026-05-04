import { ReactNode } from "react";

interface Props {
	title?: string | ReactNode;
	hints: Array<string>;
}

export function Hint({ title, hints }: Props) {
	function capitalize(str: string): string {
		const value = str.trim();

		return String(value.trim()).charAt(0).toUpperCase() + String(value).slice(1)
	}

	return (
		<div>
			<div><b>{title ? title : <span>💡 ИИ Советы по приемке<sup>*</sup></span>}</b></div>
			<ul>
				{hints.map(hint => (<li>{capitalize(hint)}</li>))}
			</ul>
		</div>
	)
}