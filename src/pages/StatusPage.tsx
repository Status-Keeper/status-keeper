import { useEffect, useState } from 'react'

import { Header } from '../components/Header';
import { Progress } from '../components/Progress';
import { StageCard } from '../components/StageCard';
import { Timeline } from '../components/Timeline';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';
import { TGSupportButton } from '../components/TGSupportButton/TGSupportButton';

const tabs = {
  status: 'status',
  images: 'Images',
}


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

class ProjectStatus {
  progress: number = 0;
  stages: Stage[] = [];
  deadline: string = '';
  objectTitle: string = '';
}

type Loaders = {
  isDataLoading?: boolean;
  isImagesLoading?: boolean;
}

export function StatusPage() {
  const [data, setData] = useState<ProjectStatus | null>(null);
  const [stageImages, setStageImages] = useState<StageImages>({});
  const [loading, setLoading] = useState<Loaders>({ isDataLoading: true, isImagesLoading: true });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const usr = params.get('usr')
    const project = params.get('project')

    if (!usr || !project) return

    const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.status);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        const [header, ...rows] = json.values
        const u = header.indexOf('USER_ID')
        const p = header.indexOf('№ проекта')

        console.log(`u is ${u}`);
        console.log(`p is ${p}`);

        const row = rows.find((r: string[]) => r[u] === usr && r[p] === project);
        if (!row) {
          setData(null);
          setLoading({ ...loading, isDataLoading: false });
          return;
        }

        const stages: Array<Stage> = [];
        let hasCurrentStep = false;

        for (let i = 20, j = 0; i <= 30; i++, j++) {
          stages.push(
            {
              id: i.toString(),
              title: header[i],
              status: row[i],
              isCompleted: row[i] === '✅',
              isCurrent: false,
            }
          );

          if (!stages[j].isCompleted && !hasCurrentStep) {
            stages[j].isCurrent = true;
            hasCurrentStep = true;
          }

        }

        setLoading({ ...loading, isDataLoading: false });

        setData({
          progress: parseInt(row[19]),
          stages,
          deadline: row[5].toString(),
          objectTitle: row[4].toString()
        });
      })
  }, []);

  // извлечение изображений
  useEffect(() => {
    if (data === null) {
      return;
    }

    const params = new URLSearchParams(window.location.search)
    const usr = params.get('usr')
    const project = params.get('project')

    if (!usr || !project) return;

    const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.images);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        const [header, ...rows] = json.values;
        const u = header.indexOf('USER_ID');
        const p = header.indexOf('№ проекта');

        const values = rows.filter((r: string[]) => r[u] === usr && r[p] === project);

        if (!values) {
          setLoading({ ...loading, isImagesLoading: false });
          return;
        }

        const stepImages: StageImages = {};

        // @ts-ignore
        values.forEach(step => {
          const imageUrls = new String(step[5]).split(',').map(r => ({ key: r.trim(), url: `https://cp.puzzlebot.top/file?b=526145&f=${r.trim()}` }));
          stepImages[step[3]] = imageUrls;
        });

        setLoading({ ...loading, isImagesLoading: false });
        setStageImages(stepImages);
      })
  }, [data]);

  if (loading.isDataLoading || loading.isImagesLoading) return <div>Загрузка...</div>

  if (data === null) {
    return (
      <NotFoundPage />
    )
  }

  return (
    <div>
      <Header />
      <h1 className="title">Статус ремонта</h1>
      <div className="subtitle">{data.objectTitle}</div>
      <Progress value={data.progress} />
      <StageCard deadline={data.deadline} stage={data.stages.find(s => s.isCurrent)} />
      <Timeline stages={data.stages} stageImages={stageImages} />
      <TGSupportButton channelUrl='https://t.me/olegveres' />
    </div>
  )
}
