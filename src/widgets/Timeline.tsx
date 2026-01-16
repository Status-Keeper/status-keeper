import type { TimelineItem } from '../shared/mock'

interface Props {
  readonly items: TimelineItem[],
  currentId: string,
}

export function Timeline({ items, currentId }: Props) {
  return (
    <section className="timeline" aria-label="Этапы ремонта">
      {items.map((it) => {
        const isCurrent = it.id === currentId
        return (
          <div
            key={it.id}
            className={[
              'tlItem',
              it.status === 'done' ? 'tlItem--done' : '',
              it.status === 'todo' ? 'tlItem--todo' : '',
              it.status === 'active' ? 'tlItem--active' : '',
              isCurrent ? 'tlItem--current' : '',
            ].join(' ')}
          >
            <div className="tlRail" aria-hidden="true">
              <div className="tlDot">{it.status === 'done' || it.status === 'active' ? '✓' : ''}</div>
              <div className="tlLine" />
            </div>

            <div className="tlBody">
              <div className="tlTop">
                <div>
                  <div className="tlTitle">{it.title}</div>
                  <div className="tlSubtitle">{it.subtitle}</div>
                </div>
                <div className="tlChevron" aria-hidden="true">
                  {it.status !== 'todo' ? '⌄' : ''}
                </div>
              </div>

              {it.photos?.length ? (
                <div className="photos" aria-label="Фото этапа">
                  {it.photos.map((p) => (
                    <div key={p} className="photo" />
                  ))}
                </div>
              ) : null}

              {it.status === 'active' ? (
                <div className="activePill">
                  <span className="activePill__left">{it.subtitle}</span>
                  <span className="activePill__right">{it.rightLabel ?? ''}</span>
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </section>
  )
}
