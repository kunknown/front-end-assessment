import classNames from "classnames";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import blueLadyImg from '../../assets/blue_lady.jpg';
import cakeImg from '../../assets/cake.jpg';
import dogImg from '../../assets/dog.jpg';
import dolphinImg from '../../assets/dolphin.jpg';
import foxImg from '../../assets/fox.jpg';
import giftImg from '../../assets/gift.jpg';
import kidReadingImg from '../../assets/kid_reading.png';
import purpleLadyImg from '../../assets/purple_lady.jpg';

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
const CARD_IMAGES: Record<number, {image: string, alt: string}> = {
  1: {image: blueLadyImg, alt: "image of a lady in blue"},
  2: {image: cakeImg, alt: "image of a cake"},
  3: {image: dogImg, alt: "image of a dog"},
  4: {image: dolphinImg, alt: "image of a dolphin"},
  5: {image: foxImg, alt: "image of a fox"},
  6: {image: giftImg, alt: "image of a wrapped gift"},
  7: {image: kidReadingImg, alt: "image of a kid reading a book while sitting on top of a pile of books"},
  8: {image: purpleLadyImg, alt: "image of a lady in purple"}
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
  }, [canSelect, matchedPairValues, setFirstSelection, setSecondSelection, value]);
  return (
    <div onClick={clickHandler} className={classNames("card", {'flip': isFaceUp, 'matched': matchedPairValues.has(value)})}>
      <div className="flip-card-container">
        <div className="flip-card-back"><img src="/favicon-32x32.png" alt="facedown card's image" /></div>
        <div className="flip-card-front"><img src={CARD_IMAGES[value].image} alt={CARD_IMAGES[value].alt} /></div>
      </div>
    </div>
  )
}
