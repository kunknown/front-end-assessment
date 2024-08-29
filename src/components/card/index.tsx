import classNames from "classnames";
import React, { useState } from "react"

import './card.css';

export type CardFace = "UP" | "DOWN";
export type CardProps = {
  value: number;
}

export default function Card({ value }: CardProps) {
  const [face, setFace] = useState<CardFace>("DOWN");
  const isFaceUp = face === "UP";
  const clickHandler = () => {
    setFace(face === "DOWN" ? "UP" : "DOWN");
    console.log(face === "DOWN" ? "UP" : "DOWN")
  }
  return (
    <div onClick={clickHandler} className={classNames("card", {'flip': isFaceUp})}>
      <div className="flip-card-container">
        <div className="flip-card-back"><img src="/favicon-32x32.png" alt="facedown card's image"></img></div>
        <div className="flip-card-front">{value}</div>
      </div>
    </div>
  )
}
