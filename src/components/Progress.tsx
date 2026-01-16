export function Progress({ value }: { value: number }) {
	return (
		<div className="progress-row">
			<div className="progress">
				<div className="progress-fill" style={{ width: value + "%" }} />
			</div>
			<div className="progress-value">{value}%</div>
		</div>
	);
}
