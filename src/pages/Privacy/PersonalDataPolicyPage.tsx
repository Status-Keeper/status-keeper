import Markdown from 'react-markdown';
import { text } from './texsts/politika-obrabotki-personalnyh-dannyh'
import { Header } from '../../components/Header/Header';

export function PersonalDataPolicyPage() {
	return (
		<div>
			<Header />
			<Markdown>{text}</Markdown>
		</div>
	);
}