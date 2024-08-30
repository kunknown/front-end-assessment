import './header.css';

type HeaderProps = {
  startNewGameHandler: () => void;
  resetGameHandler: () => void;
}

const Header = ({startNewGameHandler, resetGameHandler}: HeaderProps) => {

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Memory Card Game</h1>
        </div>
        <div className="buttons">
          <button onClick={startNewGameHandler}>NEW GAME</button>
          <button onClick={resetGameHandler}>RESET</button>
        </div>
      </div>
    </header>
  );
};

export default Header;