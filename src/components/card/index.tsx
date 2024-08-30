import classNames from "classnames";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

import './card.css';

export type CardFace = "UP" | "DOWN";
export type CardProps = {
  value: number;
  resetCard: boolean;
  resetIsDone: () => void;
  key? : number | string;
  matchedPairValues: Set<number>;
  firstSelection: number | null;
  secondSelection: number | null;
  setFirstSelection: Dispatch<SetStateAction<number | null>>;
  setSecondSelection: Dispatch<SetStateAction<number | null>>;
}
/**
 * This is the card component with an image for the back and value for the front of the card. The card flips when clicked with an animation.
 * @param value: number 
 * @returns Card
 */
export default function Card({ value, resetCard, resetIsDone, matchedPairValues, firstSelection, secondSelection, setFirstSelection, setSecondSelection }: CardProps) {
  const [face, setFace] = useState<CardFace>("DOWN");
  const isFaceUp = face === "UP";
  const isMatched = matchedPairValues.has(value);
  const canSelect = !firstSelection || !secondSelection;
  const clickHandler = () => {
    if(!isMatched && canSelect){
      if(face === "DOWN") {
        if(!firstSelection) {
          setFirstSelection(value);
          setFace("UP");
        } else {
          if(!secondSelection) {
            setSecondSelection(value);
            setFace("UP");
          }
        }
      } else {
        setFace("DOWN");
        if(!secondSelection && firstSelection) {
          setFirstSelection(null);
        }
      }
    }
  }
  useEffect(() => {
    if(resetCard) {
      setFace("DOWN");
      resetIsDone();
    }
  }, [resetCard, resetIsDone]);
  useEffect(() => {
    if(!canSelect) {
      setTimeout(() => {
        if(!matchedPairValues.has(value)){
          setFace("DOWN");
        }
        setFirstSelection(null);
        setSecondSelection(null);
      }, 1000);
    }
  }, [canSelect]);
  return (
    <div onClick={clickHandler} className={classNames("card", {'flip': isFaceUp, 'matched': matchedPairValues.has(value)})}>
      <div className="flip-card-container">
        <div className="flip-card-back"><img src="/favicon-32x32.png" alt="facedown card's image"></img></div>
        <div className="flip-card-front">{value}</div>
      </div>
    </div>
  )
}
