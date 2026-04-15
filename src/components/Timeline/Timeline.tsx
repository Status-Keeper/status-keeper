import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import type { ImageGalleryRef } from "react-image-gallery";

import { toLocaleShortDate } from "../../utils/dateformatter";
import Collapsible from "../Collapsible/Collapsible";
import { StageImages } from '../../utils/types/StageItems';
import { Stage } from '../../utils/types/Stage';

import './Timeline.css';
import { Hint } from "../HInt/Hint";


type Props = { stages: Array<Stage>, stageImages: StageImages };

export function Timeline({ stages, stageImages }: Props) {
	const galleryRef = useRef<ImageGalleryRef>(null);


	return (
		<section className="timeline">
			{stages.map((stage, idx) => (
				<div key={idx} className={"timeline-item " + (stage.isCurrent ? "active" : "")}>
					<div className={"dot " + (stage.isCompleted ? "done " : "") + (stage.isCurrent ? " current" : "")} >{stage.isCompleted && (<span>✓</span>)}</div>
					<div style={{ width: '100%' }}>
						{
							// Когда нет фотографий для этапа и это не предполсдений этап
							stageImages && !stageImages[stage.id] && !stage.isPrevious && <div className="timeline-title">{stage.title}</div>
						}

						{
							// Когда нет фотографий для этапа и это не предполсдений этап
							stageImages && !stageImages[stage.id] && stage.isPrevious && stage.acceptanceHint &&
							<Collapsible title={<div className="timeline-title">{stage.title}</div>}>
								<Hint
									hints={stage.acceptanceHint?.split(';')}
								/>
							</Collapsible>
						}

						{
							// Когда есть изображения
							stageImages && stageImages[stage.id] && stageImages[stage.id].length > 0 && (
								<div>
									<Collapsible title={<div className="timeline-title">{stage.title}</div>}>
										<div className="max-width">
											<ImageGallery
												ref={galleryRef}
												items={stageImages[stage.id].map(img => ({ original: img.url, thumbnail: img.url }))}
												autoPlay={false}
												useBrowserFullscreen={false}
												showPlayButton={false}
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
