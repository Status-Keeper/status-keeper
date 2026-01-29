import { useEffect, useState } from 'react';
import { tabs } from './tabs';

export function useStageImageLinks(setStageImageLinks: (data: { [key: string]: string }) => void) {

	const [isLinksLoaded, setIsLinksLoaded] = useState<boolean>(false);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const usr = params.get('usr')
		const project = params.get('project')

		if (!usr || !project) return;

		const url = new String(import.meta.env.VITE_URL).replace('<<tab>>', tabs.status_images);
		fetch(url)
			.then(res => res.json())
			.then(json => {
				const [header, ...rows] = json.values;
				const stage_title = header.indexOf('STAGE');
				const image_title = header.indexOf('IMAGE');

				const result: { [key: string]: string } = {};

				rows.forEach((row: { [key: string]: string }) => {
					result[row[stage_title].toString()] = row[image_title];
				});

				setStageImageLinks(result);
				setIsLinksLoaded(true);
			});
	}, []);

	return isLinksLoaded;
}