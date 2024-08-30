import {MouseEventHandler, useEffect, useMemo, useState} from 'react'
import CardGrid from '../card-grid';
import Card from '../card';
import { getNewCardValues } from '../../shared/utility';

type MemoryCardGameProps = {
  resetGame: boolean;
  startNewGame: boolean;
}

/**
 * This is the parent container that contains all the logic of the card selections
 * @param MemoryCardGameProps 
 * @returns MemoryCardGame
 */

export default function MemoryCardGame({resetGame, startNewGame}: Readonly<MemoryCardGameProps>) {
  const [cardValues, setCardValues] = useState([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
  const matchedPairs = useMemo(() => new Set(), []); // set to keep track of pairs that have already been matched.
  const [firstSelection, setFirstSelection] = useState<{value: number | null, index: number | null}>({value: null, index: null}); // state for first card selection
  const [secondSelection, setSecondSelection] = useState<{value: number | null, index: number | null}>({value: null, index: null}); // state for second card selection
  const [resetCard, setResetCard] = useState<boolean>(false); // state to reset cards to face-down when 2 selected cards aren't a match.
  const stopSelection = !!(firstSelection.value && secondSelection.value); // stopSelection = true when 2 cards have been selected.
  
  const onClickHandler: MouseEventHandler = (e) => {
    // get to the (Card button) parent node.
    const target = (e.target as HTMLElement)?.parentNode?.parentNode?.parentNode as HTMLElement;

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
  }; 

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
    // clear matchedPairs set on reset.
    if(resetGame) {
      matchedPairs.clear();
    }
  }, [resetGame, matchedPairs]);
  useEffect(() => {
    // clear matchedPairs and get a new set of cardValues for a new game.
    if(startNewGame) {
      setCardValues(getNewCardValues());
      matchedPairs.clear();
    }
  }, [startNewGame, matchedPairs]);
  return (
    <CardGrid onClickHandler={onClickHandler}>
      {cardValues.map((value, index) =>{
        const resetThisCard = (resetCard && (firstSelection.value === value || secondSelection.value === value)); // check whether this card is one of the two selected and turn it face-down.
        const isMatched = matchedPairs.has(value);
        return <Card value={value} key={`${index}-${value}`} id={`${index}-${value}`} isDisabled={stopSelection || isMatched} resetCard={resetGame || startNewGame || resetThisCard } isMatched={isMatched} />; 
      })}
    </CardGrid>
  )
}
