import Card, {TCard} from '../card';
import './card-grid.css';

const CardGrid = ({ cards, onCardClick }: { cards: TCard[], onCardClick: (clickedCard: TCard) => void }) => { console.log('CardGrid'); 
  return (
  <div className="card-grid">
    {cards.map((card) => (
      <Card 
        key={card.id} 
        card={card} 
        onClick={onCardClick} 
      />
    ))}
  </div>
)};

export default CardGrid;