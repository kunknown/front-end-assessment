import { useState } from 'react';
import './memory-card-game.css';
import Header from '../header';
import CardGrid from '../card-grid';
import { TCard } from '../card';
import { shuffleCards } from '../../shared/utility';

const MemoryCardGame = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState<TCard[]>([]);

  const handleCardClick = (clickedCard: TCard) => {
    if (flippedCards.length < 2) {
      const updatedCards = cards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      );
      setCards(updatedCards);
      setFlippedCards([...flippedCards, clickedCard]);

      if (flippedCards.length === 1) {
        const [firstCard] = flippedCards;
        if (firstCard.image === clickedCard.image) {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.image === firstCard.image ? { ...card, isMatched: true } : card
            )
          );
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((card) =>
                card.isFlipped && !card.isMatched ? { ...card, isFlipped: false } : card
              )
            );
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
  };

  return (
    <div className="app">
      <Header onReset={resetGame} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
};

export default MemoryCardGame;