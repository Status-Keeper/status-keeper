import './Header.css';
import logo from '../../assets/icon.svg';

export function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href='https://statuskeeper.ru' target='_blank'>
          <img src={logo} />
        </a>
      </div>
    </header>
  );
}
