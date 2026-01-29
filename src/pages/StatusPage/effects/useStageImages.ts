import { useEffect, useState } from "react";
import { ProjectStatus, StageImages } from "../StatusPage";
import { tabs } from "./tabs";

export function useStageImages(data: ProjectStatus | null, setStageImages: (data: StageImages) => void): boolean {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	// извлечение изображений
	useEffect(() => {
		if (data === null) {
			return;
		}

		const params = new URLSearchParams(window.location.search)
		const usr = params.get('usr')
		const project = params.get('project')

		if (!usr || !project) return;

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.images);

		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const u = header.indexOf('USER_ID');
				const p = header.indexOf('№ проекта');

				const values = rows.filter((r: string[]) => r[u] === usr && r[p] === project);

				if (!values) {
					setIsLoaded(true);
					return;
				}

				const stepImages: StageImages = {};

				// @ts-ignore
				values.forEach(step => {
					const imageUrls = new String(step[5]).split(',').map(r => ({ key: r.trim(), url: `https://cp.puzzlebot.top/file?b=526145&f=${r.trim()}` }));
					stepImages[step[3]] = imageUrls;
				});

				setIsLoaded(true);
				setStageImages(stepImages);
			})
	}, [data]);

	return isLoaded;
}