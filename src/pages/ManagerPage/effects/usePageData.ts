import { useEffect, useState } from 'react';
import { tabs } from '../../common/tabs';
import { ProjectStatus, Stage } from '../ManagerPage';
import { toLocaleShortDate } from '../../../utils/dateformatter';

export function usePageData(setData: (data: Array<ProjectStatus>) => void) {
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);


	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const usr = params.get('usr')

		if (!usr) return

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.database);

		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const userId = header.indexOf('USER_ID');
				const projectId = header.indexOf('№ проекта');


				const statgeTitle = header.indexOf('Название Этапа');
				const stageIndex = header.indexOf('№ Этапа');
				const finishDate = header.indexOf('Дата завершения этапа (факт)');
				const planDate = header.indexOf('Дата завершения этапа (план)');
				const stageStatus = header.indexOf('Статус этапа');
				const currentStageIndex = header.indexOf('Текущий этап');

				const repairPercent = header.indexOf('Статус ремонта');

				const objectTitle = header.indexOf('Название объекта');

				const dataRows = rows.filter((r: string[]) => r[userId] === usr);
				if (!dataRows) {
					setData([]);
					setIsDataLoaded(true);
					return;
				}

				const raw_porjects: { [key: string]: Array<any> } = {};

				dataRows.map((row: any) => {
					const pId = row[projectId];

					if (!raw_porjects[pId]) {
						raw_porjects[pId] = [row];
					} else {
						raw_porjects[pId].push(row);
					}
				})

				const porjects: Array<ProjectStatus> = [];

				const keys = Object.keys(raw_porjects);

				for (let i = 0; i < keys.length; i++) {
					const info = raw_porjects[keys[i]];

					const projectInfo = info[0];

					const currentStage = info[0][currentStageIndex];

					const dataRows = info.splice(1);
					const stages: Array<Stage> = [];

					dataRows.map((stage: any) => {
						stages.push(
							{
								id: stage[stageIndex],
								title: stage[statgeTitle],
								status: stage[finishDate] === '-' ? '' : toLocaleShortDate(new Date(stage[finishDate])),
								isCompleted: stage[stageStatus] === '1',
								isCurrent: stage[statgeTitle] === currentStage,
								deadline: new Date(stage[planDate]),
							}
						);
					})

					porjects.push({
						id: keys[i],
						progress: parseInt(projectInfo[repairPercent]),
						stages,
						deadline: stages[stages.length - 1].deadline!,
						objectTitle: projectInfo[objectTitle],
					});
				}

				// for (let z = 0; z < dataRows.length; z++) {
				// 	const row = dataRows[z];

				// 	const stages: Array<Stage> = [];
				// 	let hasCurrentStep = false;
				// 	for (let i = 6, j = 0, k = 18; i <= 15; i++, j++, k++) {

				// 		stages.push(
				// 			{
				// 				id: i.toString(),
				// 				title: header[i],
				// 				status: row[i],
				// 				isCompleted: row[i] === '✅',
				// 				isCurrent: false,
				// 				deadline: row[k] ? new Date(row[k]) : undefined,
				// 			}
				// 		);

				// 		if (!stages[j].isCompleted && !hasCurrentStep) {
				// 			stages[j].isCurrent = true;
				// 			hasCurrentStep = true;
				// 		}
				// 	}

				// 	porjects.push({
				// 		id: row[p],
				// 		progress: parseInt(row[3]),
				// 		stages,
				// 		deadline: new Date(row[4].toString()),
				// 		objectTitle: row[2].toString()
				// 	});
				// }

				setIsDataLoaded(true);

				setData(porjects);
			})
	}, []);

	return isDataLoaded;
}