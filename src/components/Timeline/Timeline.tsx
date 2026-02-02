import { Stage, StageImages } from "../../pages/StatusPage/StatusPage";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { toLocaleShortDate } from "../../utils/dateformatter";
import Collapsible from "../Collapsible/Collapsible";

import './Timeline.css';


type Props = { stages: Array<Stage>, stageImages: StageImages };

export function Timeline({ stages, stageImages }: Props) {
	return (
		<section className="timeline">
			{stages.map((stage, idx) => (
				<div key={idx} className={"timeline-item " + (stage.isCurrent ? "active" : "")}>
					<div className={"dot " + (stage.isCompleted ? "done " : "") + (stage.isCurrent ? " current" : "")} >{stage.isCompleted && (<span>✓</span>)}</div>
					<div>
						{
							stageImages && !stageImages[stage.title] && <div className="timeline-title">{stage.title}</div>
						}

						{
							stageImages && stageImages[stage.title] && (
								<div>
									<Collapsible title={<div className="timeline-title">{stage.title}</div>}>
										<div className="max-width">

											<Carousel
												images={stageImages[stage.title].map(img => ({ src: img.url }))} style={{ width: "100%" }}
												canAutoPlay={false}
											/>
										</div>
									</Collapsible>
								</div>
							)
						}
						{
							stage.isCompleted &&
							<div className="timeline-sub">Завершено {stage.status}</div>
						}

						{
							(stage.isCurrent) &&
							<div className="timeline-in-progress">
								<div className="timeline-sub">Примерно до <span className="dark">{stage.deadline && toLocaleShortDate(stage.deadline)}</span></div>
								<div className="timeline-sub">В работе</div>
							</div>
						}

						{
							(!stage.isCurrent && !stage.isCompleted) &&
							<div className="timeline-sub">Примерно до <span className="dark">{stage.deadline && toLocaleShortDate(stage.deadline)}</span></div>
						}

					</div>
				</div>
			))
			}
			{/* <span className="line"></span> */}
		</section >
	);
}
