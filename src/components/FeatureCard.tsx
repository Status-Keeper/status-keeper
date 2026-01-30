type Props = { title: string; text: string; kicker?: string }

export function FeatureCard({ title, text, kicker }: Props) {
  return (
    <article className="card">
      <div className="cardMedia" aria-hidden="true" />
      <div className="cardBody">
        {kicker ? <div className="kicker">{kicker}</div> : null}
        <h3 className="cardTitle">{title}</h3>
        <p className="cardText">{text}</p>
      </div>
    </article>
  )
}
