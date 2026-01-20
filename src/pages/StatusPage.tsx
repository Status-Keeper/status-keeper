import { useEffect, useState } from 'react'

import { Header } from '../components/Header';
import { Progress } from '../components/Progress';
import { StageCard } from '../components/StageCard';
import { Timeline } from '../components/Timeline';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';


export type Stage = {
  id: string;
  title: string;
  status: string;
  deadline?: Date;
  isCompleted: boolean;
  isCurrent: boolean;

}

class ProjectStatus {
  title: string = '';
  progress: number = 0;
  stages: Stage[] = [];
  deadline: string = '';
  objectTitle: string = '';
}

export function StatusPage() {
  const [data, setData] = useState<ProjectStatus | null>(null)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const usr = params.get('usr')
    const project = params.get('project')

    if (!usr || !project) return

    fetch(import.meta.env.VITE_URL)
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
          setLoading(false);
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
        console.log(row[5])

        setData({
          title: row[2],
          progress: parseInt(row[19]),
          stages,
          deadline: row[5].toString(),
          objectTitle: row[4].toString()
        });

        setLoading(false);
      })
  }, [])

  if (loading) return <div>Загрузка...</div>

  if (data === null) {
    return (
      <NotFoundPage />
    )
  }

  return (
    <div>
      <Header />
      <h1 className="title">Статус ремонта</h1>
      <div className="subtitle">Квартира заказчика</div>
      <Progress value={data.progress} />
      <StageCard deadline={data.deadline} stage={data.stages.find(s => s.isCurrent)} />
      <Timeline stages={data.stages} />
    </div>
  )
}
