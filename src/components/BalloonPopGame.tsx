import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface FloatingBalloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
}

export const BalloonPopGame = ({ onScore }: { onScore: (points: number) => void }) => {
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const colors = ["#FF6B9D", "#A18CD1", "#FFD26F", "#96E6B3", "#FFA07A"];

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setBalloons([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setBalloons((prev) => {
        const updated = prev
          .map((b) => ({ ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -100);

        if (Math.random() > 0.7 && prev.length < 8) {
          updated.push({
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: 110,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 1.5 + 1,
          });
        }
        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) {
      if (timeLeft <= 0 && isPlaying) {
        setIsPlaying(false);
        setGameOver(true);
        onScore(score);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const popBalloon = (id: number) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 10);
    onScore(10);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card/40 backdrop-blur-sm rounded-2xl border-2 border-primary/30 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-primary">🎈 Balloon Pop Game</h3>
          <div className="flex gap-4 text-lg font-semibold">
            <span className="text-accent">Score: {score}</span>
            <span className="text-secondary">Time: {timeLeft}s</span>
          </div>
        </div>

        {!isPlaying && !gameOver && (
          <div className="text-center py-12 space-y-4">
            <p className="text-xl text-foreground/80">Pop as many balloons as you can in 30 seconds!</p>
            <Button onClick={startGame} size="lg" className="animate-bounce-in">
              Start Game 🎮
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="text-center py-12 space-y-4 animate-bounce-in">
            <p className="text-3xl font-bold text-primary">Game Over! 🎉</p>
            <p className="text-2xl text-accent">Final Score: {score}</p>
            <Button onClick={startGame} size="lg">
              Play Again 🔄
            </Button>
          </div>
        )}

        {isPlaying && (
          <div className="relative h-96 bg-card/20 rounded-xl border border-primary/20 overflow-hidden">
            {balloons.map((balloon) => (
              <button
                key={balloon.id}
                onClick={() => popBalloon(balloon.id)}
                className="absolute w-12 h-16 transition-transform hover:scale-125 cursor-pointer"
                style={{
                  left: `${balloon.x}%`,
                  bottom: `${balloon.y}%`,
                }}
              >
                <div
                  className="w-full h-full rounded-full shadow-lg animate-float-delayed"
                  style={{
                    background: balloon.color,
                    boxShadow: `0 5px 15px ${balloon.color}80`,
                  }}
                >
                  <div className="absolute top-1 left-3 w-4 h-6 rounded-full bg-white/30" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
