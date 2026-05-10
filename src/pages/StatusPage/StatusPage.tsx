import { useState } from 'react'

import { Header } from '../../components/Header/Header';
import { Progress } from '../../components/Progress';
import { StageCard } from '../../components/StageCard/StageCard';
import { Timeline } from '../../components/Timeline/Timeline';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { TGSupportButton } from '../../components/TGSupportButton/TGSupportButton';
import { usePageData } from './effects/usePageData';
import { useStageImages } from './effects/useStageImages';
import { ProjectStatus } from '../../utils/types/ProjectStatus';
import { StageImages } from '../../utils/types/StageItems';

import './StatusPage.css';

export function StatusPage() {
  const [data, setData] = useState<ProjectStatus | null>(null);
  const [stageImages, setStageImages] = useState<StageImages>({});


  const params = new URLSearchParams(window.location.search);
  const isDebug = params.get('debug');


  let isDataLoaded = usePageData(setData);
  let isImagesLoaded = useStageImages(data, setStageImages);


  if (!params.get('id')) {
    return (<NotFoundPage />)
  }

  if (data === null && isDataLoaded) {
    return (
      <NotFoundPage />
    )
  }

  console.log(`
    is data loaded: ${isDataLoaded}
    is images loaded: ${isImagesLoaded}
    `);

  if (!isDataLoaded || !isImagesLoaded) {
    return (
      <div>
        {
          isDebug && (
            <div>
              <div>{JSON.stringify(data)}</div>
              <div>{isDataLoaded.toString()}</div>
              <div>{isImagesLoaded.toString()}</div>
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
      <StageCard percent={data.progress} deadline={data.deadline} finishDate={data.finishDate} stage={data.stages.find(s => s.isCurrent)} />
      <Timeline stages={data.stages} stageImages={stageImages} />
      
      <div className='fyi'>
        * <i>Советы сгенерированы искусственным интеллектом. Они могут быть неточными, поэтому всегда уточняйте ключевые моменты у вашей ремонтной бригады</i>
      </div>
      
      <div className='support-area'></div>
      <TGSupportButton channelUrl='https://taplink.cc/sk_support' />

    </div>
  )
}
