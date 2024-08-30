import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'

import './card-grid.css';
import Card from '../card';

type CardGridProps = {
  startNewGameHandler: () => void;
  resetGameHandler: () => void;
  startNewGame: boolean;
  resetGame: boolean;
}

export default function CardGrid({startNewGame, resetGame, startNewGameHandler, resetGameHandler}: CardGridProps) {
  const [firstSelection, setFirstSelection] = useState<null | number>(null);
  const [secondSelection, setSecondSelection] = useState<null | number>(null);
  console.log('selection: ', firstSelection, secondSelection)
  const matchedPairValues = useMemo<Set<number>>(() => new Set(), []); //check what happend without memo!
  const [cardValues, setCardValues] = useState([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [isResetDone, setIsResetDone] = useState<boolean>(false);
  const getNewCardValues = () => {
    console.log('new card values!');
    return [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  }
  useEffect(() => {
    if(isResetDone) {
      setIsResetDone(false);
      resetGameHandler();
      console.log('reset hit');
    }
  }, [isResetDone, resetGameHandler]);
  useEffect(() => {
    if(startNewGame && !isResetDone) {
      startNewGameHandler();
      setCardValues(getNewCardValues());
      console.log('new game hit!');
    }
  }, [isResetDone, startNewGame, startNewGameHandler]);
  useEffect(() => {
    if(secondSelection && firstSelection === secondSelection && !matchedPairValues.has(secondSelection)) {
      matchedPairValues.add(secondSelection);
    }
  }, [firstSelection, secondSelection, matchedPairValues]);
  return (
    <div className={classNames("card-grid")}>
      {cardValues.map((value, index) => <Card key={`${index}-${value}`} value={value} resetCard={resetGame || startNewGame} resetIsDone={() => {setIsResetDone(true)}} matchedPairValues={matchedPairValues} firstSelection={firstSelection} secondSelection={secondSelection} setFirstSelection={setFirstSelection} setSecondSelection={setSecondSelection} />)}
    </div>
  )
}
