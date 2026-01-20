import './styles.css';

export function NotFoundPage() {
	return (
		<div className='page'>
			<header className='header'>
				<div className='logo'><span className='logo-bars'><i className='g' /><i className='b' /><i className='o' /><i className='gr' /></span><span className='logo-text'>Status <b>Keeper</b></span></div>
			</header>
			<main className='nf'>
				<div className='nf-icon'>404</div>
				<h1 className='nf-title'>Ничего не найдено</h1>
				<p className='nf-text'>Похоже, ссылка некорректна или проект больше недоступен.</p>
				<div className='nf-hint'>Проверьте правильность ссылки или обратитесь к менеджеру проекта.</div>
			</main>
		</div>
	);
}