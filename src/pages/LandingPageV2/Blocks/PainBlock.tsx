import { BaseBlock } from "../LP2";
import { SectionShell } from "../SectionShell";

import image1 from './../images/what.png';

export function PainBlock(props: BaseBlock) {
	return (
		<SectionShell>
			<div className="heroTop heroTop--small">
				<h2 className="title">Достали постоянные сообщения от клиента?</h2>
			</div>

			<div className="painScene">
				<img width="80%" src={image1} />
			</div>

			<div className="painBottom">
				<div className="painText">Пора покончить с этим хаосом!</div>
				<a className="button button--yellow" href={props.link}>
					Попробовать SK
				</a>
			</div>
		</SectionShell>
	)
}