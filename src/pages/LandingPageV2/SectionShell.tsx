export function SectionShell({
	children,
	className = '',
}: {
	children: React.ReactNode
	className?: string
}) {
	return <section className={`panel ${className}`.trim()}>{children}</section>
}