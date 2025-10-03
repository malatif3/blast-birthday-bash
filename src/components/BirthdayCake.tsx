import { useState } from "react";

interface BirthdayCakeProps {
  onCelebrate: () => void;
}

export const BirthdayCake = ({ onCelebrate }: BirthdayCakeProps) => {
  const [isCelebrating, setIsCelebrating] = useState(false);

  const handleClick = () => {
    setIsCelebrating(true);
    onCelebrate();
    setTimeout(() => setIsCelebrating(false), 600);
  };

  return (
    <div className="mt-16 flex justify-center">
      <button
        onClick={handleClick}
        className={`text-8xl transform transition-all duration-300 hover:scale-110 cursor-pointer ${
          isCelebrating ? "animate-bounce-in scale-125" : ""
        }`}
        aria-label="Celebrate with the cake!"
      >
        🎂
      </button>
    </div>
  );
};
