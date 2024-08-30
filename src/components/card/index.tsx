import classNames from "classnames";
import { useEffect, useState } from "react"
import { CARD_IMAGES } from "../../shared/constants";
import cardBack from '../../assets/card_back.jpg';

import './card.css';

type CardFace = "UP" | "DOWN";
type CardProps = {
  value: number;
  resetCard: boolean;
  id: number | string;
  isDisabled: boolean;
  isMatched: boolean;
}

/**
 * This is the card component with an image for the back and another image for the front of the card. The card flips when clicked with an animation.
 * @param CardProps
 * @returns Card
 */

export default function Card({ value, resetCard, isDisabled, id, isMatched }: Readonly<CardProps>) {
  const [face, setFace] = useState<CardFace>("DOWN"); // state to keep track of the card's position
  const isFaceUp = face === "UP";

  // turn card face-down when resetCard state changes to true
  useEffect(() => {
    if(resetCard) {
      setFace("DOWN");
    }
  }, [resetCard]);

  // return card as a button for better accessibility. disable it when it's matched or 2 cards have been selected.
  return (
    <button id={id as string} disabled={isDisabled} onClick={() => {setFace(face === "DOWN" ? "UP" : "DOWN")}} className={classNames("card", {'flip': isFaceUp, 'matched': isMatched})}>
      <div className="flip-card-container">
        <div className="flip-card-back"><img src={cardBack} alt="facedown card's image" /></div>
        <div className="flip-card-front"><img src={CARD_IMAGES[value].image} alt={CARD_IMAGES[value].alt} /></div>
      </div>
    </button>
  )
}
