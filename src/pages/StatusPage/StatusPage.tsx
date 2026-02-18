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
import { ProjectStatus } from '../../utils/types/ProjectStatus';
import { StageImages } from '../../utils/types/StageItems';

export function StatusPage() {
  const [data, setData] = useState<ProjectStatus | null>(null);
  const [stageImages, setStageImages] = useState<StageImages>({});
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
      <div className='title-block'>
        <h1 className="title">Статус ремонта</h1>
      </div>

      <div className="subtitle">{data.objectTitle}</div>
      <Progress value={data.progress} />
      <StageCard deadline={data.deadline} finishDate={data.finishDate} stage={data.stages.find(s => s.isCurrent)} imageLinks={stageImageLinks} />
      <Timeline stages={data.stages} stageImages={stageImages} />

      <div className='support-area'></div>
      <TGSupportButton channelUrl='https://t.me/status_keeper_support_bot' />
    </div>
  )
}
