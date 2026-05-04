import { getStageImage } from "../../assets/images";

import { toLocaleShortDate } from "../../utils/dateformatter";
import { Stage } from "../../utils/types/Stage";
import { Hint } from "../HInt/Hint";
import './StageCard.css'

type Props = { percent: number, deadline: Date, finishDate?: Date | null, stage: Stage | undefined }

export function StageCard({ percent, deadline, finishDate, stage }: Props) {
	let url = getStageImage(percent);


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
						{
							stage.nextStageHint &&
							<Hint title={<span>💡 Как подготовиться<sup>*</sup></span>} hints={stage.nextStageHint?.split(';')}></Hint>
						}
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
