import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocityX: number;
  velocityY: number;
}

export const ConfettiCannon = ({ onFire }: { onFire: () => void }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [cannonAngle, setCannonAngle] = useState(0);

  const colors = ["#FF6B9D", "#A18CD1", "#FFD26F", "#96E6B3", "#FFA07A", "#3677FF"];

  const fireCannon = () => {
    onFire();
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: 50,
      y: 90,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      velocityX: (Math.random() - 0.5) * 40,
      velocityY: -(Math.random() * 30 + 20),
    }));

    setPieces(newPieces);
    setCannonAngle(-30);

    setTimeout(() => {
      setCannonAngle(0);
      setTimeout(() => setPieces([]), 3000);
    }, 200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card/40 backdrop-blur-sm rounded-2xl border-2 border-accent/30 p-6 space-y-6">
        <h3 className="text-2xl font-bold text-accent text-center">💥 Confetti Cannon</h3>

        <div className="relative h-64 bg-card/20 rounded-xl border border-accent/20 overflow-hidden">
          {pieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-3 h-3 animate-confetti-fall"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                background: piece.color,
                transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                animation: `confetti-physics 3s ease-out forwards`,
                "--velocity-x": `${piece.velocityX}vw`,
                "--velocity-y": `${piece.velocityY}vh`,
              } as any}
            />
          ))}

          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-transform duration-200"
            style={{ transform: `translateX(-50%) rotate(${cannonAngle}deg)` }}
          >
            <div className="text-6xl">🎆</div>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={fireCannon} size="lg" className="animate-float">
            Fire Cannon! 🚀
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes confetti-physics {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--velocity-x), calc(var(--velocity-y) + 100vh)) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
