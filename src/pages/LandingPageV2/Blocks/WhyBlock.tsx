import { SectionShell } from "../SectionShell"

import ico1 from './../images/chat_icon.png';
import ico2 from './../images/folder_icon.png';
import ico3 from './../images/incom_icon.png';
import ico4 from './../images/secur_icon.png';

export function WhyBlock() {
	const cards = [
		{
			icon: ico1,
			title: 'Меньше сообщений',
			text: 'Меньше уточнений — больше времени на реальные дела.',
		},
		{
			icon: ico2,
			title: 'Все документы в одном месте',
			text: 'Файлы и фотоэтапа под рукой в любой момент.',
		},
		{
			icon: ico3,
			title: 'Без сложных входов',
			text: 'Просто отправляете ссылку клиенту.',
		},
		{
			icon: ico4,
			title: 'Данные в безопасности',
			text: 'Ваша информация всегда под защитой.',
		},
	]

	return (
		<SectionShell>
			<div className="heroTop heroTop--small">
				<h2 className="title">Почему стоит выбрать Status Keeper?</h2>
			</div>

			<div className="whyGrid">
				{cards.map((card) => (
					<article className="whyCard" key={card.title}>
						<div className="whyCard__icon"><img src={card.icon} /></div>
						<div className="whyCard__title">{card.title}</div>
						<div className="whyCard__text">{card.text}</div>
					</article>
				))}
			</div>
		</SectionShell>
	)
}