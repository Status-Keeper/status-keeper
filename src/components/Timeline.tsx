import { Stage } from "../pages/StatusPage";

type Props = { stages: Array<Stage> };

export function Timeline({ stages }: Props) {
	return (
		<section className="timeline">
			{stages.map((stage, idx) => (
				<div key={idx} className={"timeline-item " + (stage.isCurrent ? "active" : "")}>
					<div className={"dot " + (stage.isCompleted || stage.isCurrent ? "done" : "")} >{(stage.isCompleted || stage.isCurrent) && '✓'}</div>
					<div>
						<div className="timeline-title">{stage.title}</div>
						{
							stage.isCompleted &&
							<div className="timeline-sub">Завершено {stage.status}</div>
						}

						{
							(stage.isCurrent) &&
							<div className="timeline-in-progress">
								<div className="timeline-sub">Примерно до {stage.status}</div>
								<div className="timeline-sub">В работе</div>
							</div>
						}

						{
							(!stage.isCurrent && !stage.isCompleted) &&
							<div className="timeline-sub">Примерно до {stage.status}</div>
						}

					</div>
				</div>
			))}
			{/* <span className="line"></span> */}
		</section>
	);
}
