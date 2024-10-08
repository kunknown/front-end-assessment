import './header.css';

const Header = ({ onReset }: {onReset: () => void}) => {
  return (
  <header className="header">
    <div className="container">
      <div className="logo">
        <h1>Memory Card Game</h1>
      </div>
      <div className="buttons">
        <button onClick={onReset}>RESET</button>
      </div>
    </div>
  </header>
)};

export default Header;