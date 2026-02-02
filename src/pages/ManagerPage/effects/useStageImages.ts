import { useEffect, useState } from "react";
import { ProjectStatus, StageImages } from "../ManagerPage";
import { tabs } from "../../common/tabs";

export function useStageImages(data: Array<ProjectStatus>, setStageImages: (data: StageImages) => void): boolean {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	// извлечение изображений
	useEffect(() => {
		if (data === null || data.length == 0) {
			return;
		}

		const params = new URLSearchParams(window.location.search)
		const usr = params.get('usr');

		if (!usr) return;

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.images);

		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const u = header.indexOf('USER_ID');
				const p = header.indexOf('№ проекта');

				const dataRows = rows.filter((r: string[]) => r[u] === usr);

				if (!dataRows) {
					setIsLoaded(true);
					return;
				}

				const stepImages: StageImages = {};

				// dataRows - это все изображения загруженные по всем этапам и всех проектов 


				// @ts-ignore
				dataRows.forEach(step => {


					const imageUrls = new String(step[5]).split(',').map(r => ({ key: r.trim(), url: `https://cp.puzzlebot.top/file?b=526145&f=${r.trim()}` }));
					if (!stepImages[step[p]]) {
						stepImages[step[p]] = {};
					}

					stepImages[step[p]][step[3]] = imageUrls;
				});

				setIsLoaded(true);
				setStageImages(stepImages);

			})
	}, [data]);

	return isLoaded;
}