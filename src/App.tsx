import { useState } from 'react'
import './App.css'
import Card from './components/card'
import CardGrid from './components/card-grid'
import Header from './components/header'

const App = () => {
  const [resetGame, setResetGame] = useState<boolean>(false);
  const [startNewGame, setStartNewGame] = useState<boolean>(false);
  return (
    <div className="container">
      <Header startNewGameHandler={() => {setStartNewGame(true)}} resetGameHandler={() => {setResetGame(true)}}/>
      <CardGrid startNewGame={startNewGame} resetGame={resetGame} startNewGameHandler={() => {setStartNewGame(false)}} resetGameHandler={() => setResetGame(false)} />
    </div>
)}

export default App
