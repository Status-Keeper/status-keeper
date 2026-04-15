import { useEffect, useState } from 'react';
import { tabs } from '../../common/tabs';
import { toLocaleShortDate } from '../../../utils/dateformatter';
import { ProjectStatus } from '../../../utils/types/ProjectStatus';
import { Stage } from '../../../utils/types/Stage';

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

				const acceptanceHint = header.indexOf('ai_hint_acceptance');
				const nextStageHint = header.indexOf('ai_hint_next_stage');

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
								finishDate: stage[finishDate] === '-' ? null : new Date(stage[finishDate]),
								deadline: new Date(stage[planDate]),
								acceptanceHint: stage[acceptanceHint] ? stage[acceptanceHint] : undefined,
								nextStageHint: stage[nextStageHint] ? stage[nextStageHint] : undefined,
								isPrevious: false,
							}
						);
					});

					const currentIndex = stages.findIndex(s => s.isCurrent);

					if (currentIndex !== 0 || currentIndex) {
						stages[currentIndex - 1].isPrevious = true;
					}

					porjects.push({
						id: keys[i],
						userId: projectInfo[userId],
						progress: parseInt(projectInfo[repairPercent]),
						stages,
						deadline: stages[stages.length - 1].deadline!,
						finishDate: stages[stages.length - 1].finishDate,
						objectTitle: projectInfo[objectTitle],
					});
				}


				setIsDataLoaded(true);

				setData(porjects);
			})
	}, []);

	return isDataLoaded;
}