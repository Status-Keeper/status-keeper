interface Props {
	title?: string;
	hints: Array<string>;
}

export function Hint({ title, hints }: Props) {

	return (
		<div>
			<div><b>{title ? title : "💡 ИИ Советы по приемке:"}</b></div>
			<ul>
				{hints.map(hint => (<li>{hint}</li>))}
			</ul>
		</div>
	)
}