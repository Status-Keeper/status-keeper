type Props = { num: number; title: string; text: string }

export function StepCard({ num, title, text }: Props) {
  return (
    <article className="step">
      <div className="stepNum" aria-hidden="true">
        {num}
      </div>
      <div className="stepMedia" aria-hidden="true" />
      <h3 className="stepTitle">{title}</h3>
      <p className="stepText">{text}</p>
    </article>
  )
}
