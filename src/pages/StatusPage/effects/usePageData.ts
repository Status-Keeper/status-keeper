import { useEffect, useState } from 'react';
import { tabs } from '../../common/tabs';
import { ProjectStatus, Stage } from '../StatusPage';
import { toLocaleShortDate } from '../../../utils/dateformatter';

export function usePageData(setData: (data: null | ProjectStatus) => void) {
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);


	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const usr = params.get('usr')
		const project = params.get('project')

		if (!usr || !project) return

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.database);

		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const u = header.indexOf('USER_ID');
				const p = header.indexOf('№ проекта');


				const statgeTitle = header.indexOf('Название Этапа');
				const stageIndex = header.indexOf('№ Этапа');
				const finishDate = header.indexOf('Дата завершения этапа (факт)');
				const planDate = header.indexOf('Дата завершения этапа (план)');
				const stageStatus = header.indexOf('Статус этапа');
				const currentStageIndex = header.indexOf('Текущий этап');

				const repairPercent = header.indexOf('Статус ремонта');

				const objectTitle = header.indexOf('Название объекта');



				const info = rows.filter((r: string[]) => r[u] === usr && r[p] === project);
				if (!info) {
					setData(null);
					setIsDataLoaded(true);
					return;
				}

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
							finishDate: stage[finishDate] === '-' ? null : new Date(stage[finishDate]),
							isCurrent: stage[statgeTitle] === currentStage,
							deadline: new Date(stage[planDate]),
						}
					);
				})


				setIsDataLoaded(true);

				setData({
					progress: parseInt(projectInfo[repairPercent]),
					stages,
					deadline: stages[stages.length - 1].deadline!,
					finishDate: stages[stages.length - 1].finishDate,
					objectTitle: projectInfo[objectTitle],
				});
			})
	}, []);

	return isDataLoaded;
}