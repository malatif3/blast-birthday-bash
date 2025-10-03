import { useEffect, useState } from "react";

interface BalloonProps {
  color: string;
  delay: number;
  left: string;
  onPop?: () => void;
}

export const Balloon = ({ color, delay, left, onPop }: BalloonProps) => {
  const [isPopped, setIsPopped] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isPopped) {
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isPopped]);

  const handleClick = () => {
    setIsPopped(true);
    onPop?.();
  };

  if (!shouldRender) return null;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
      style={{
        left,
        animationDelay: `${delay}s`,
      }}
      onClick={handleClick}
    >
      {!isPopped ? (
        <div className="relative animate-balloon-rise">
          <div
            className="w-16 h-20 rounded-full shadow-lg animate-float-delayed"
            style={{
              background: color,
              boxShadow: `0 5px 15px ${color}80`,
            }}
          >
            <div
              className="absolute top-2 left-4 w-6 h-8 rounded-full opacity-30"
              style={{ background: "white" }}
            />
          </div>
          <div
            className="absolute bottom-0 left-1/2 w-px h-16 -translate-x-1/2"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
        </div>
      ) : (
        <div className="text-4xl animate-bounce-in">💥</div>
      )}
    </div>
  );
};
