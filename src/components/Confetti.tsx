import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: number;
  size: number;
}

export const Confetti = ({ trigger }: { trigger: number }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    "hsl(340, 82%, 65%)",
    "hsl(270, 80%, 60%)",
    "hsl(45, 100%, 60%)",
    "hsl(220, 90%, 60%)",
    "hsl(160, 80%, 50%)",
  ];

  useEffect(() => {
    if (trigger > 0) {
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        size: Math.random() * 10 + 5,
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => setPieces([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 animate-confetti-fall"
          style={{
            left: piece.left,
            animationDelay: `${piece.delay}s`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            background: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
};
