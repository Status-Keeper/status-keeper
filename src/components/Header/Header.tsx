import './Header.css';
import logo from '../../assets/icon.svg';

export function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} />
      </div>
    </header>
  );
}
