import { useState } from 'react'

import { Header } from '../../components/Header';
import { Progress } from '../../components/Progress';
import { StageCard } from '../../components/StageCard';
import { Timeline } from '../../components/Timeline';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { TGSupportButton } from '../../components/TGSupportButton/TGSupportButton';
import { usePageData } from './effects/usePageData';
import { useStageImages } from './effects/useStageImages';
import { useStageImageLinks } from './effects/useStageImageLinks';


export type Stage = {
  id: string;
  title: string;
  status: string;
  deadline?: Date;
  isCompleted: boolean;
  isCurrent: boolean;
}

export type StageImages = {
  [stageStep: string]: Array<{ key: string, url: string }>;
}

export class ProjectStatus {
  progress: number = 0;
  stages: Stage[] = [];
  deadline: Date = new Date();
  objectTitle: string = '';
}


export function StatusPage() {
  const [data, setData] = useState<ProjectStatus | null>(null);
  const [stageImages, setStageImages] = useState<StageImages>({});
  const [stageImageLinks, setStageImageLinks] = useState<{ [key: string]: string }>({});


  let isDataLoaded = usePageData(setData);
  let isImagesLoaded = useStageImages(data, setStageImages);
  let isStageImageLinksLoaded = useStageImageLinks(setStageImageLinks);


  if (!isDataLoaded || !isImagesLoaded || !isStageImageLinksLoaded) return (
    <div>
      {/* <div>{JSON.stringify(data)}</div>
      <div>{isDataLoaded.toString()}</div>
      <div>{isImagesLoaded.toString()}</div>
      <div>{isStageImageLinksLoaded.toString()}</div> */}
      <div>
        Загрузка...
      </div>
    </div>)

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
        <TGSupportButton channelUrl='https://t.me/status_keeper_support_bot' />
      </div>
      <div className="subtitle">{data.objectTitle}</div>
      <Progress value={data.progress} />
      <StageCard deadline={data.deadline} stage={data.stages.find(s => s.isCurrent)} imageLinks={stageImageLinks} />
      <Timeline stages={data.stages} stageImages={stageImages} />

    </div>
  )
}
