import { images } from "../../assets/images";
import { Stage } from "../../pages/StatusPage/StatusPage";
import { toLocaleShortDate } from "../../utils/dateformatter";
import './StageCard.css'

type Props = { deadline: Date, stage: Stage | undefined, imageLinks: { [key: string]: string } }

export function StageCard({ deadline, stage, imageLinks }: Props) {
	let url = null;

	if (stage) {
		const link: string = imageLinks[stage?.title!];
		if (link) {
			url = images[link.toString()];
		}
	}

	if (!stage) {
		return (
			<section className="stage-card">
				<div className="stage-info">
					<div>
						<div className="stage-label">Проект завершен</div>
						<div className="stage-date">
							Дата завершения: <b>{toLocaleShortDate(deadline)}</b>
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className="stage-card">
			<div>
				<div className="stage-info">
					<div>
						<div className="stage-label">Статус этапа</div>
						<div className="stage-title">{stage.title}</div>

					</div>
					<div className="stage-image">
						{url && (<img src={url} />)}
					</div>
				</div>
			</div>

			<div>
				<div className="stage-info">
					<div className="stage-date">
						Примерная дата завершения: <b>{toLocaleShortDate(stage.deadline!)}</b>
					</div>
				</div>
			</div>
		</section>
	);
}
