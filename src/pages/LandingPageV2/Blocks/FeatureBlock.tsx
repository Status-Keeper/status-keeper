import { BaseBlock } from "../LP2";
import { SectionShell } from "../SectionShell"

import image1 from '../images/shiva2.png';
import image2 from '../images/tools.png';

export function FeatureBlock(props: BaseBlock) {
	const items = [
		'Создавайте проекты',
		'Отмечайте выполнение этапов',
		'Вся информация в одном месте',
		'Status Page для клиентов',
	]

	return (
		<SectionShell>
			<div className="heroTop heroTop--small">
				<h2 className="title">
					SK — это интуитивно понятный бот для работы с проектами
				</h2>
				<p className="subtitle">Работайте и общайтесь с клиентами в одном удобном сервисе</p>
			</div>

			<div className="sceneRow sceneRow--features">
				<div className="illustration illustration--left compact">
					<img width={'100%'} src={image1} />
				</div>

				<div className="miniBoard">
					<div className="miniBoard__form">
						<div className="miniBoard__header">Новый проект</div>
						<div className="miniField" />
						<div className="miniField" />
						<div className="miniField" />
						<div className="miniBtn" />
					</div>

					<div className="miniBoard__checklist">
						{Array.from({ length: 5 }).map((_, i) => (
							<div className="checkRow" key={i}>
								<span className="checkRow__dot" />
								<span className="checkRow__line" />
								<span className="checkRow__ok">✓</span>
							</div>
						))}
					</div>
				</div>

				<div className="compact">
					<img width={'100%'} src={image2} />
				</div>
			</div>

			<div className="featureLabels">
				{items.map((item) => (
					<div className="featureLabel" key={item}>
						{item}
					</div>
				))}
			</div>

			<div className="ctaRow">
				<a className="button button--yellow" href={props.link}>
					Начать работу
				</a>
			</div>
		</SectionShell>
	)
}