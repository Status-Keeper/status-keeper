import { Stage } from "../../utils/types/Stage";
import { Hint } from "../HInt/Hint";
import './NextStageCard.css'

type Props = {
	stage: Stage | undefined,
	hint: string | undefined,
}

export function NextStageCard({ stage, hint }: Props) {
	if (!stage) {
		return null;
	}

	const hints = hint ? hint.split(';') : [];

	return (
		<div>
			<section className="next-stage-card">
				<div>
					<div className="next-stage-info">
						<div>
							<div className="next-stage-label">Следующий этап</div>
							<div className="next-stage-title">{stage.title}</div>
							{
								stage.nextStageHint &&
								<Hint title={<span>💡 Как подготовиться<sup>*</sup></span>} hints={hints}></Hint>
							}
						</div>
					</div>
				</div>
			</section>

			{
				hints.length > 0 &&
				<div className='fyi'>
					* <i>Советы сгенерированы искусственным интеллектом. Они могут быть неточными, поэтому всегда уточняйте ключевые моменты у вашей ремонтной бригады</i>
				</div>
			}

		</div>

	);
}
