import Markdown from 'react-markdown';
import { text } from './texsts/cookies-banner';
import { Header } from '../../components/Header/Header';

export function CookiesUsagePage() {
	return (
		<div>
			<Header />
			<Markdown>{text}</Markdown>
		</div>
	);
}