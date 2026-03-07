import Markdown from 'react-markdown';
import { text } from './texsts/soglasie-na-obrabotku-personalnyh-dannyh';
import { Header } from '../../components/Header/Header';

export function PersonalDataProcessingPage() {
	return (
		<div>
			<Header />
			<Markdown>{text}</Markdown>
		</div>
	);
}