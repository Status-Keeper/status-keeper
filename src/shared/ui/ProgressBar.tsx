type Props = { value: number }

export function ProgressBar({ value }: Props) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="progress" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${v}%` }}>
          <div className="progress__stripes" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
