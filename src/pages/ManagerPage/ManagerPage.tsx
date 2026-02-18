import { useState } from 'react'

import { Header } from '../../components/Header/Header';
import { Progress } from '../../components/Progress';
import { StageCard } from '../../components/StageCard/StageCard';
import { Timeline } from '../../components/Timeline/Timeline';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { TGSupportButton } from '../../components/TGSupportButton/TGSupportButton';
import { usePageData } from './effects/usePageData';
import { useStageImages } from './effects/useStageImages';
import { useStageImageLinks } from './effects/useStageImageLinks';
import Collapsible from '../../components/Collapsible/Collapsible';
import { ProjectStatus } from '../../utils/types/ProjectStatus';
import { ProjectStageImages } from '../../utils/types/ProjectStepImages';



export function ManagerPage() {
	const [data, setData] = useState<Array<ProjectStatus>>([]);
	const [stageImages, setStageImages] = useState<ProjectStageImages>({});
	const [stageImageLinks, setStageImageLinks] = useState<{ [key: string]: string }>({});

	const params = new URLSearchParams(window.location.search);
	const isDebug = params.get('debug');


	let isDataLoaded = usePageData(setData);
	let isImagesLoaded = useStageImages(data, setStageImages);
	let isStageImageLinksLoaded = useStageImageLinks(setStageImageLinks);


	if (data === null && isDataLoaded) {
		return (
			<NotFoundPage />
		)
	}

	if (!isDataLoaded || !isImagesLoaded || !isStageImageLinksLoaded) {
		return (
			<div>
				{
					isDebug && (
						<div>
							<div>{JSON.stringify(data)}</div>
							<div>{isDataLoaded.toString()}</div>
							<div>{isImagesLoaded.toString()}</div>
							<div>{isStageImageLinksLoaded.toString()}</div>
						</div>
					)
				}
				<div>
					Загрузка...
				</div>
			</div>
		);
	}

	if (data === null) {
		return (
			<NotFoundPage />
		)
	}

	return (
		<div>
			<Header />

			{
				data.map((project: ProjectStatus) => (
					<div key={project.id} className='mb-20'>

						<Collapsible title={(
							<div style={{ width: '100%' }}>
								<h1 className="title">{project.objectTitle}</h1>
								<Progress key={`ps_${project.id}`} value={project.progress} />
								<StageCard key={`sc_${project.id}`} deadline={project.deadline} finishDate={project.finishDate} stage={project.stages.find(s => s.isCurrent)} imageLinks={stageImageLinks} />
							</div>
						)}>
							<Timeline key={`tl_${project.id}`} stages={project.stages} stageImages={stageImages[project.id]} />
						</Collapsible>
					</div>
				))
			}

			<div className='support-area'></div>
			<TGSupportButton channelUrl='https://t.me/status_keeper_support_bot' />
		</div>
	)
}
