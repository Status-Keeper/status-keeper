type Props = { deadline: string }

export function StageCard({ deadline }: Props) {
	return (
		<section className="stage-card">
			<div className="stage-info">
				<div className="stage-label">Статус этапа</div>
				<div className="stage-title">Сантехника (черновая)</div>
				<div className="stage-date">
					Примерная дата завершения: <b>{deadline}</b>
				</div>
				<div className="stage-badge">
					<span>✓</span> Идут работы
				</div>
			</div>
			<div className="stage-image" />
		</section>
	);
}
