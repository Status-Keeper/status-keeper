import { useEffect, useState } from 'react'
import { mockStatus } from '../shared/mock';
import { ProgressBar } from '../shared/ui/ProgressBar';
import { StageSummaryCard } from '../widgets/StageSummaryCard';
// import { Timeline } from '../widgets/Timeline';

const dataMocks = mockStatus;

type Stage = {
  id: string;
  title: string;
  status: string;
}

type ProjectStatus = {
  title: string
  progress: number
  stages: Stage[]
}

export function StatusPage() {
  const [data, setData] = useState<ProjectStatus | null>(null)

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

        const row = rows.find((r: string[]) => r[u] === usr && r[p] === project)
        if (!row) return

        const stages: Array<Stage> = [];

        for (let i = 20; i <= 30; i++) {
          stages.push(
            {
              id: i.toString(),
              title: header[i],
              status: row[i],
            }
          )
        }

        setData({
          title: row[2],
          progress: Number(row[3]),
          stages,
        })
      })
  }, [])

  if (!data) return <div>Загрузка...</div>

  return (
    <div style={{ padding: 24 }}>
      <h1>{data.title}</h1>
      <p>Готовность: {data.progress}%</p>
      <ul>
        {data.stages.map(s => (
          <li key={s.id}>
            {s.title} — {s.status}
          </li>
        ))}
      </ul>

      return (
      <div className="app">
        <div className="phone">
          <header className="header">
            <div className="brand">
              <div className="brandMark" aria-hidden="true">
                <span className="pill" />
                <span className="pill pill--c2" />
                <span className="pill pill--c3" />
                <span className="pill pill--c4" />
                <span className="check" />
              </div>
              <div className="brandText">
                <span className="brandText__left">Status</span>
                <span className="brandText__right">Keeper</span>
              </div>
            </div>
          </header>

          <main className="content">
            <h1 className="title">Статус ремонта</h1>
            <div className="subtitle">{dataMocks.projectSubtitle}</div>

            <div className="progressRow">
              <ProgressBar value={dataMocks.progress} />
              <div className="progressPct" aria-label="Процент готовности">
                {dataMocks.progress}%
              </div>
            </div>

            <StageSummaryCard
              title="Статус этапа"
              stageName={dataMocks.currentStage.title}
              finishLabel="Примерная дата завершения:"
              finishDate={dataMocks.currentStage.eta}
              statusText={dataMocks.currentStage.badgeText}
              imageAlt="Фото этапа"
            />

            {/* <Timeline items={dataMocks.timeline} currentId={dataMocks.currentStage.id} /> */}
          </main>
        </div>
      </div>
      )
    </div>
  )
}
