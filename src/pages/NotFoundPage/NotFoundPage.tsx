import { Header } from '../../components/Header/Header';
import './NotFoundPage.css';

export function NotFoundPage() {
	return (
		<div className='page'>
			<Header />
			<main className='nf'>
				<div className='nf-icon'>404</div>
				<h1 className='nf-title'>Ничего не найдено</h1>
				<p className='nf-text'>Похоже, ссылка некорректна или проект больше недоступен.</p>
				<div className='nf-hint'>Проверьте правильность ссылки или обратитесь к менеджеру проекта.</div>
			</main>
		</div>
	);
}