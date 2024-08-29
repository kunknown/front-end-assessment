import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'

import './card-grid.css';

export default function CardGrid({children}: PropsWithChildren) {
  return (
    <div className={classNames("card-grid")}>{children}</div>
  )
}
