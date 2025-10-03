import { useState, useEffect } from "react";
import { Balloon } from "@/components/Balloon";
import { Confetti } from "@/components/Confetti";
import { BirthdayText } from "@/components/BirthdayText";
import { BirthdayCake } from "@/components/BirthdayCake";

const Index = () => {
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [balloons, setBalloons] = useState<Array<{ id: number; color: string; left: string; delay: number }>>([]);

  const balloonColors = [
    "linear-gradient(135deg, #FF6B9D, #C44569)",
    "linear-gradient(135deg, #A18CD1, #FBC2EB)",
    "linear-gradient(135deg, #FFD26F, #3677FF)",
    "linear-gradient(135deg, #96E6B3, #61A5C2)",
    "linear-gradient(135deg, #FFA07A, #FF69B4)",
  ];

  useEffect(() => {
    const initialBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      color: balloonColors[i % balloonColors.length],
      left: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 5,
    }));
    setBalloons(initialBalloons);
  }, []);

  const handleBalloonPop = () => {
    setConfettiTrigger((prev) => prev + 1);
  };

  const handleCelebrate = () => {
    setConfettiTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          background: "var(--gradient-birthday)",
          animation: "gradient 15s ease infinite",
        }}
      />
      
      {/* Stars/Sparkles background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <Confetti trigger={confettiTrigger} />

      {/* Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((balloon) => (
          <div key={balloon.id} className="pointer-events-auto">
            <Balloon
              color={balloon.color}
              delay={balloon.delay}
              left={balloon.left}
              onPop={handleBalloonPop}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <BirthdayText />
          <BirthdayCake onCelebrate={handleCelebrate} />
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(20deg); }
          100% { filter: hue-rotate(0deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Index;
