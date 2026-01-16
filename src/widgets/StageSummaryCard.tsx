type Props = {
  title: string
  stageName: string
  finishLabel: string
  finishDate: string
  statusText: string
  imageAlt: string
}

export function StageSummaryCard({ title, stageName, finishLabel, finishDate, statusText, imageAlt }: Props) {
  return (
    <section className="card card--stage">
      <div className="card__left">
        <div className="card__kicker">{title}</div>
        <div className="card__title">{stageName}</div>

        <div className="card__meta">
          <div className="metaLabel">{finishLabel}</div>
          <div className="metaValue">{finishDate}</div>
        </div>

        <div className="badge">
          <span className="badge__icon" aria-hidden="true">✓</span>
          <span className="badge__text">{statusText}</span>
        </div>
      </div>

      <div className="card__right" aria-label="Превью фото">
        <div className="stageImage" role="img" aria-label={imageAlt} />
      </div>
    </section>
  )
}
