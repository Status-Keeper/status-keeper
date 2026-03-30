import { FeatureBlock } from './Blocks/FeatureBlock';
import { HeroBlock } from './Blocks/HeroBlock/HeroBlock';
import { PainBlock } from './Blocks/PainBlock';
import { WhyBlock } from './Blocks/WhyBlock';

import './styles.css';

export interface BaseBlock {
	link: string;
}

export function LandingPage2() {
	const link = "https://t.me/status_keeper_bot";

	return (
		<div>
			<HeroBlock link={link} />
			<FeatureBlock link={link} />
			<PainBlock link={link} />
			<WhyBlock />
		</div>
	)
}
