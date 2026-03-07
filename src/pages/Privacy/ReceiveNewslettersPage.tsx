import Markdown from 'react-markdown';
import { text } from './texsts/soglasie-na-rassylku';
import { Header } from '../../components/Header/Header';

export function ReceiveNewslettersPage() {
	return (
		<div>
			<Header />
			<Markdown>{text}</Markdown>
		</div>
	);
}