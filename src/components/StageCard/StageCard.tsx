import { images } from "../../assets/images";

import { toLocaleShortDate } from "../../utils/dateformatter";
import { Stage } from "../../utils/types/Stage";
import './StageCard.css'

type Props = { deadline: Date, finishDate?: Date | null, stage: Stage | undefined, imageLinks: { [key: string]: string } }

export function StageCard({ deadline, finishDate, stage, imageLinks }: Props) {
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
							Дата завершения: <b>{toLocaleShortDate(finishDate ? finishDate : deadline)}</b>
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
