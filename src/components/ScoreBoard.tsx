import { useEffect, useState } from "react";

interface ScoreBoardProps {
  totalScore: number;
}

export const ScoreBoard = ({ totalScore }: ScoreBoardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalScore > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalScore]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-accent/50 p-4 shadow-lg transition-all duration-300
          ${isAnimating ? "animate-bounce-in scale-110" : ""}`}
        style={{
          boxShadow: isAnimating ? "0 0 30px hsl(45 100% 60% / 0.8)" : "0 0 15px hsl(45 100% 60% / 0.3)",
        }}
      >
        <div className="text-center">
          <div className="text-sm text-muted-foreground font-medium">Total Score</div>
          <div className="text-3xl font-bold text-accent flex items-center gap-2">
            🏆 {totalScore}
          </div>
        </div>
      </div>
    </div>
  );
};
