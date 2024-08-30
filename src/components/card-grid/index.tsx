import classNames from 'classnames'
import { MouseEventHandler, PropsWithChildren } from 'react'

import './card-grid.css';

type CardGridProps = {
  onClickHandler: MouseEventHandler;
}

/**
 * This is a layout component that styles the array of cards in a grid layout.
 * @param CardGridProps 
 * @returns CardGrid
 */

export default function CardGrid({onClickHandler, children}: PropsWithChildren<CardGridProps>) {
  // onclick handler is attached to notify parent when a card is clicked;
  return ( 
    <div className={classNames("card-grid")} onClick={onClickHandler}>
      {children}
    </div>
  )
}
