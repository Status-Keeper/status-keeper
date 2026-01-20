import './TGSupportButton.css';
import image from './Logo.png';

type Props = { channelUrl: string };
export function TGSupportButton({ channelUrl }: Props) {
	return (
		<a
			className="tg-button"
			href={channelUrl}
			target="_blank"
			rel="noopener noreferrer"
		>
			<span className="tg-icon"><img src={image} /></span>
			<span className="tg-text">
				Написать в поддержку
				<br />
				<small>Telegram</small>
			</span>
		</a>
	);
}
