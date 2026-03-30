import { BaseBlock } from "../../LP2";
import { SectionShell } from "../../SectionShell";
// import shiva from '../../images/shiva.png';
import mat from '../../images/man_and_table.png';

import './HeroBlock.css';

export function HeroBlock(props: BaseBlock) {
	return (
		<SectionShell>
			<section className="hero">
				<div className="hero-container">

					<h1 className="hero-title">
						SK — это интуитивно понятный бот<br />
						для работы с проектами
					</h1>

					<p className="hero-subtitle">
						Работайте и общайтесь с клиентами в одном удобном сервисе
					</p>

					<div className="hero-visual">
						<img
							src={mat}
							className="hero-img hero-right"
						/>
						<a href={props.link} target="_blank">
							<button className="hero-btn">
								Попробовать бесплатно
							</button>
						</a>
					</div>
				</div>
			</section>
		</SectionShell>
	)
}