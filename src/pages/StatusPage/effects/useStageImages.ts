import { useEffect, useState } from "react";
import { tabs } from "../../common/tabs";
import { ProjectStatus } from "../../../utils/types/ProjectStatus";
import { StageImages } from "../../../utils/types/StageItems";

export function useStageImages(data: ProjectStatus | null, setStageImages: (data: StageImages) => void): boolean {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	// извлечение изображений
	useEffect(() => {
		if (data === null) {
			return;
		}

		const params = new URLSearchParams(window.location.search)
		const id = params.get('id');


		if (!id) return;

		const userId = data.userId;
		const projectId = data.id;

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.images);

		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const u = header.indexOf('USER_ID');
				const p = header.indexOf('№ проекта');

				const stepNumber = header.indexOf('Этап');
				const imageCodes = header.indexOf('Image ID штрих');
				const imageLinks = header.indexOf('Image Link');

				const values = rows.filter((r: string[]) => r[u] === userId && r[p] === projectId);

				if (!values) {
					setIsLoaded(true);
					return;
				}

				const stepImages: StageImages = {};

				// @ts-ignore
				values.forEach(step => {
					let imageUrls = [];
					if (step[imageCodes] && step[imageCodes].length > 0) {
						imageUrls = new String(step[imageCodes]).split(',').map(r => ({ key: r.trim(), url: `https://cp.puzzlebot.top/file?b=526145&f=${r.trim()}` }));
					}

					if (imageUrls.length === 0 && step[imageLinks] && step[imageLinks].length > 0) {
						imageUrls = step[imageLinks].split(';').map((r: string, idx: number) => ({ key: idx, url: r }));
					}

					stepImages[step[stepNumber]] = imageUrls;
				});

				setIsLoaded(true);
				setStageImages(stepImages);
			})
	}, [data]);

	return isLoaded;
}