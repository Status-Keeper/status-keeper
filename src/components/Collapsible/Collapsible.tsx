import { ReactNode, useState } from 'react';
import './Collapsible.css';
import arrow_down from '../../assets/arrow_down.png';
import arrow_up from '../../assets/arrow_up.png';

const Collapsible = ({ title, children }: { title?: ReactNode, children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleCollapse = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="collapsible-container">
			<span className="collapsible-trigger" onClick={toggleCollapse}>
				{title}
				<span className="collapsible-image">{isOpen ? (<img src={arrow_up}/>) : (<img src={arrow_down}/>)}</span>
			</span>
			<div className={`collapsible-content ${isOpen ? 'open' : ''}`}>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Collapsible;
