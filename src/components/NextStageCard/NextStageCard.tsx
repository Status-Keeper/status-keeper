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

	return (
		<section className="next-stage-card">
			<div>
				<div className="next-stage-info">
					<div>
						<div className="next-stage-label">Следующий этап</div>
						<div className="next-stage-title">{stage.title}</div>
						{
							stage.nextStageHint &&
							<Hint title={<span>💡 Как подготовиться<sup>*</sup></span>} hints={hint ? hint.split(';') : []}></Hint>
						}
					</div>
				</div>
			</div>
		</section>
	);
}
