import { useState } from "react";

interface InteractiveElementProps {
  emoji: string;
  onClick?: () => void;
  className?: string;
}

export const InteractiveElement = ({ emoji, onClick, className = "" }: InteractiveElementProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick?.();
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-6xl transform transition-all duration-300 hover:scale-125 cursor-pointer
        ${clicked ? "animate-bounce-in scale-150" : ""} ${className}`}
    >
      {emoji}
    </button>
  );
};
