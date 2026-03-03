import { FaCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="top-header">
      <div className="brand">
        <FaCircle className="logo-dot" />
        <div>
          <h1>PATELPROPERTY.com</h1>
          <p>Vadodara, Gujarat</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="language-pill">
          <span className="active">EN</span>
          <span>हिं</span>
          <span>ગુ</span>
        </div>
        <button className="sell-btn">Sell Property</button>
      </div>
    </header>
  );
}
