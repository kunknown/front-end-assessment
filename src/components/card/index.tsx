import './card.css';
import cardBack from '../../assets/card_back.jpg'

export type TCard = {id: number, image: string, isFlipped: boolean, isMatched: boolean, alt: string};

const Card = ({ card, onClick }: { card: TCard, onClick: (card: TCard) => void }) => {
  return (
  <button 
    className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`} 
    onClick={() => !card.isFlipped && !card.isMatched && onClick(card)}
  >
    <div className="card-inner">
      <div className="card-front"><img src={card.image}/></div>
      <div className="card-back"><img src={cardBack} /></div>
    </div>
  </button>
)};

export default Card;