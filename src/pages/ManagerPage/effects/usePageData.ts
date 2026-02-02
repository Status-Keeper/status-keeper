import { useEffect, useState } from 'react';
import { tabs } from '../../common/tabs';
import { ProjectStatus, Stage } from '../ManagerPage';

export function usePageData(setData: (data: Array<ProjectStatus>) => void) {
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);


	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const usr = params.get('usr')

		if (!usr) return

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.status);

		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const u = header.indexOf('USER_ID');
				const p = header.indexOf('PROJECT_ID');

				const dataRows = rows.filter((r: string[]) => r[u] === usr);
				if (!dataRows) {
					setData([]);
					setIsDataLoaded(true);
					return;
				}
				const porjects: Array<ProjectStatus> = [];

				for (let z = 0; z < dataRows.length; z++) {
					const row = dataRows[z];

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

					porjects.push({
						id: row[p],
						progress: parseInt(row[3]),
						stages,
						deadline: new Date(row[4].toString()),
						objectTitle: row[2].toString()
					});
				}

				setIsDataLoaded(true);

				setData(porjects);
			})
	}, []);

	return isDataLoaded;
}