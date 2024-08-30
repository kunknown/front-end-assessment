import { useEffect, useState } from 'react';
import Header from './components/header';

import './App.css';
import MemoryCardGame from './components/memory-card-game';

const App = () => {
  const [resetGame, setResetGame] = useState<boolean>(false);
  const [startNewGame, setStartNewGame] = useState<boolean>(false);
  
  useEffect(() => {
    // reset resetGame flag.
    if(resetGame) {
      setResetGame(false);
    }
  }, [resetGame]);
  useEffect(() => {
    // reset the startNewGame flag;
    if(startNewGame) {
      setStartNewGame(false);
    }
  }, [startNewGame]);

  // returns a responsive container div. set handles for Header. render MemoryCardGame with props.
  return (
    <div className="container">
      <Header startNewGameHandler={() => {setStartNewGame(true)}} resetGameHandler={() => {setResetGame(true)}} />
      <MemoryCardGame resetGame={resetGame} startNewGame={startNewGame} />
    </div>
)}

export default App
