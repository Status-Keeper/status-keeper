import { useEffect, useState } from 'react';
import { tabs } from './tabs';
import { ProjectStatus, Stage } from '../StatusPage';

export function usePageData(setData: (data: null | ProjectStatus) => void) {
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);


	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const usr = params.get('usr')
		const project = params.get('project')

		if (!usr || !project) return

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.status);

		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const u = header.indexOf('USER_ID');
				const p = header.indexOf('PROJECT_ID');

				const row = rows.find((r: string[]) => r[u] === usr && r[p] === project);
				if (!row) {
					setData(null);
					setIsDataLoaded(true);
					return;
				}

				const stages: Array<Stage> = [];
				let hasCurrentStep = false;
				for (let i = 6, j = 0, k = 18; i <= 15; i++, j++, k++) {

					stages.push(
						{
							id: i.toString(),
							title: header[i],
							status: row[i],
							isCompleted: row[i] === '✅',
							isCurrent: false,
							deadline: row[k] ? new Date(row[k]) : undefined,
						}
					);

					if (!stages[j].isCompleted && !hasCurrentStep) {
						stages[j].isCurrent = true;
						hasCurrentStep = true;
					}

				}

				setIsDataLoaded(true);

				setData({
					progress: parseInt(row[3]),
					stages,
					deadline: new Date(row[4].toString()),
					objectTitle: row[2].toString()
				});
			})
	}, []);

	return isDataLoaded;
}