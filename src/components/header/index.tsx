import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Memory Card Game</h1>
        </div>
        <div className="buttons">
          <button>NEW GAME</button>
          <button>RESET</button>
        </div>
      </div>
    </header>
  );
};

export default Header;