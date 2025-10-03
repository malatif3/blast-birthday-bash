import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🎈", "🎂", "🎁", "🎉", "🎊", "🎯", "✨", "🌟"];

export const MemoryGame = ({ onWin }: { onWin: () => void }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializeGame = () => {
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsPlaying(true);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    );

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isMatched: true } : card
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (isPlaying && cards.length > 0 && cards.every((card) => card.isMatched)) {
      setTimeout(() => {
        onWin();
        setIsPlaying(false);
      }, 500);
    }
  }, [cards, isPlaying]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card/40 backdrop-blur-sm rounded-2xl border-2 border-secondary/30 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-secondary">🎴 Memory Match</h3>
          <div className="text-lg font-semibold text-accent">Moves: {moves}</div>
        </div>

        {!isPlaying && cards.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <p className="text-xl text-foreground/80">Match all the birthday pairs!</p>
            <Button onClick={initializeGame} size="lg" className="animate-bounce-in">
              Start Game 🎮
            </Button>
          </div>
        )}

        {!isPlaying && cards.length > 0 && (
          <div className="text-center py-12 space-y-4 animate-bounce-in">
            <p className="text-3xl font-bold text-secondary">You Won! 🏆</p>
            <p className="text-xl text-accent">Completed in {moves} moves!</p>
            <Button onClick={initializeGame} size="lg">
              Play Again 🔄
            </Button>
          </div>
        )}

        {isPlaying && (
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-xl border-2 text-4xl font-bold transition-all duration-300 transform
                  ${
                    card.isFlipped || card.isMatched
                      ? "bg-primary/20 border-primary scale-105"
                      : "bg-card/60 border-card-foreground/20 hover:scale-110"
                  }
                  ${card.isMatched ? "opacity-50" : ""}
                `}
                disabled={card.isMatched}
              >
                {card.isFlipped || card.isMatched ? (
                  <span className="animate-bounce-in">{card.emoji}</span>
                ) : (
                  <span className="text-2xl">❓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
