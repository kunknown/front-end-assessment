import './header.css';

type HeaderProps = {
  startNewGameHandler: () => void;
  resetGameHandler: () => void;
}

/**
 * This component contains the title and the buttons (new game and reset)
 * @param HeaderProps 
 * @returns Header
 */

const Header = ({startNewGameHandler, resetGameHandler}: HeaderProps) => {
  // buttons have handlers from the props attached to onclick event to trigger state change in parent component.
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