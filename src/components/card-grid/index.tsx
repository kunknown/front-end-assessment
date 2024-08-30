import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import Card from '../card';

import './card-grid.css';

type CardGridProps = {
  startNewGameHandler: () => void;
  resetGameHandler: () => void;
  startNewGame: boolean;
  resetGame: boolean;
}

export default function CardGrid({startNewGame, resetGame, startNewGameHandler, resetGameHandler}: CardGridProps) {
  const [firstSelection, setFirstSelection] = useState<null | number>(null);
  const [secondSelection, setSecondSelection] = useState<null | number>(null);
  const matchedPairValues = useMemo<Set<number>>(() => new Set(), []); //check what happend without memo!
  const [cardValues, setCardValues] = useState([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [isResetDone, setIsResetDone] = useState<boolean>(false);
  const getNewCardValues = () => {
    const valueDistributionSetOne = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
    const valueDistributionSetTwo = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
    const newValuesArr: Array<number> = [];
    for(let i = 0; i < 8; i++) {
      let randomNumOne = 0;
      let randomNumTwo = 0;
      while(!valueDistributionSetOne.has(randomNumOne)){
        randomNumOne = Math.floor(Math.random() * 9);
      }
      newValuesArr.push(randomNumOne);
      valueDistributionSetOne.delete(randomNumOne);
      while(!valueDistributionSetTwo.has(randomNumTwo)) {
        randomNumTwo = Math.floor(Math.random() * 9);
      }
      newValuesArr.push(randomNumTwo);
      valueDistributionSetTwo.delete(randomNumTwo);
    }
    return newValuesArr;
  }
  useEffect(() => {
    if(isResetDone) {
      setIsResetDone(false);
      resetGameHandler();
      matchedPairValues.clear();
    }
  }, [isResetDone, resetGameHandler, matchedPairValues]);
  useEffect(() => {
    if(startNewGame && !isResetDone) {
      startNewGameHandler();
      setCardValues(getNewCardValues());
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
