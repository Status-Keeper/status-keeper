export function toLocaleShortDate(date: Date): string {
	if (!date) return '';
	if (!(date instanceof Date)) return '';

	return date.toLocaleDateString('ru-ru', { month: "short", day: '2-digit' });
}