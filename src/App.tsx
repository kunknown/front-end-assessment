import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import CardGrid from './components/card-grid';
import Header from './components/header';
import Card from './components/card';
import { getNewCardValues } from './shared/utility';

import './App.css';

const App = () => {
  const [cardValues, setCardValues] = useState([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [firstSelection, setFirstSelection] = useState<{value: number | null, index: number | null}>({value: null, index: null}); // state for first card selection
  const [secondSelection, setSecondSelection] = useState<{value: number | null, index: number | null}>({value: null, index: null}); // state for second card selection
  const [resetGame, setResetGame] = useState<boolean>(false);
  const [startNewGame, setStartNewGame] = useState<boolean>(false);
  const [resetCard, setResetCard] = useState<boolean>(false); // state to reset cards to face-down when 2 selected cards aren't a match.
  const matchedPairs = useMemo(() => new Set(), []); // set to keep track of pairs that have already been matched.
  const stopSelection = !!(firstSelection.value && secondSelection.value); // stopSelection = true when 2 cards have been selected.
  
  const onClickHandler: MouseEventHandler = (e) => {
    // get to the (Card button) parent node.
    const target = e.target?.parentNode?.parentNode?.parentNode as HTMLElement;

    // get the id and extract the value and index from the id.
    const id = target.getAttribute("id")?.split("-") ?? [null, null];
    const [index, value] = id;
    
    // if same card is clicked twice, reset the firstSelection state.
    if(Number(value) === firstSelection.value && Number(index) === firstSelection.index) {
      setFirstSelection({value: null, index: null});
    }

    // set firstSelection state if it's null.
    if(!firstSelection.value) {
      setFirstSelection({value: Number(value), index: Number(index)});
    } else { // set secondSelection state if first is not null.
      setSecondSelection({value: Number(value), index: Number(index)});
    }
  }

  useEffect(() => {
    // process when both cards have been picked.
    if(stopSelection) {
      // if it's a match add it to matchedPairs set and clear the selections.
      if(firstSelection.value === secondSelection.value) {
        matchedPairs.add(secondSelection.value);
        setFirstSelection({value: null, index: null});
        setSecondSelection({value: null, index: null});
      } else { // if it's not a match, signal to reset the cards to face-down after a delay.
        setTimeout(() => {
          setResetCard(true);
        }, 1000);
      }
    }
  }, [stopSelection, firstSelection, secondSelection, matchedPairs]);
  useEffect(() => {
    // clear the selections and reset the resetCard flag;
    if(resetCard) {
      setResetCard(false);
      setFirstSelection({value: null, index: null});
      setSecondSelection({value: null, index: null});
    }
  }, [resetCard]);
  useEffect(() => {
    // reset resetGame flag and clear matchedPairs set.
    if(resetGame) {
      setResetGame(false);
      matchedPairs.clear();
    }
  }, [resetGame, matchedPairs]);
  useEffect(() => {
    // reset the startNewGame flag, clear matchedPairs, and get a new set of cardValues for a new game;
    if(startNewGame) {
      setStartNewGame(false);
      setCardValues(getNewCardValues());
      matchedPairs.clear();
    }
  }, [startNewGame, matchedPairs]);

  // returns a responsive container div. set handles for Header. set handle for CardGrid. display all Cards.
  return (
    <div className="container">
      <Header startNewGameHandler={() => {setStartNewGame(true)}} resetGameHandler={() => {setResetGame(true)}} />
      <CardGrid onClickHandler={onClickHandler}>
        {cardValues.map((value, index) =>{
          const resetThisCard = (resetCard && (firstSelection.value === value || secondSelection.value === value)); // check whether this card is one of the two selected and turn it face-down.
          const isMatched = matchedPairs.has(value);
          return <Card value={value} key={index} id={`${index}-${value}`} isDisabled={stopSelection || isMatched} resetCard={resetGame || startNewGame || resetThisCard } isMatched={isMatched} />; 
        })}
      </CardGrid>
    </div>
)}

export default App
