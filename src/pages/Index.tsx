import { useState, useEffect } from "react";
import { Balloon } from "@/components/Balloon";
import { Confetti } from "@/components/Confetti";
import { BirthdayText } from "@/components/BirthdayText";
import { BirthdayCake } from "@/components/BirthdayCake";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { InteractiveElement } from "@/components/InteractiveElement";
import { BalloonPopGame } from "@/components/BalloonPopGame";
import { MemoryGame } from "@/components/MemoryGame";
import { ConfettiCannon } from "@/components/ConfettiCannon";
import { ScoreBoard } from "@/components/ScoreBoard";
import { toast } from "sonner";

const Index = () => {
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [balloons, setBalloons] = useState<Array<{ id: number; color: string; left: string; delay: number }>>([]);
  const [totalScore, setTotalScore] = useState(0);

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

  const handlePhotoClick = () => {
    setConfettiTrigger((prev) => prev + 1);
  };

  const handleScore = (points: number) => {
    setTotalScore((prev) => prev + points);
    setConfettiTrigger((prev) => prev + 1);
  };

  const handleMemoryWin = () => {
    setTotalScore((prev) => prev + 100);
    setConfettiTrigger((prev) => prev + 1);
    toast.success("🏆 Memory Master! +100 points!");
  };

  const handleCannonFire = () => {
    setTotalScore((prev) => prev + 5);
    setConfettiTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Animated gradient background - fixed */}
      <div 
        className="fixed inset-0 opacity-90 -z-10"
        style={{
          background: "var(--gradient-birthday)",
          animation: "gradient 15s ease infinite",
        }}
      />
      
      {/* Stars/Sparkles background - fixed */}
      <div className="fixed inset-0 opacity-20 -z-10">
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
      <ScoreBoard totalScore={totalScore} />

      {/* Balloons - fixed position */}
      <div className="fixed inset-0 pointer-events-none z-0">
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

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          <BirthdayText />
          <BirthdayCake onCelebrate={handleCelebrate} />
          <ScrollIndicator />
        </section>

        {/* Interactive Elements Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="w-full max-w-4xl space-y-12">
            <h2 
              className="text-5xl md:text-6xl font-bold text-center bg-clip-text text-transparent animate-bounce-in"
              style={{ backgroundImage: "var(--gradient-text)" }}
            >
              Make a Wish! 🌟
            </h2>
            
            <div className="flex flex-wrap justify-center gap-8">
              <InteractiveElement emoji="🎁" onClick={handleCelebrate} />
              <InteractiveElement emoji="🎊" onClick={handleCelebrate} />
              <InteractiveElement emoji="🎉" onClick={handleCelebrate} />
              <InteractiveElement emoji="🎈" onClick={handleCelebrate} />
              <InteractiveElement emoji="✨" onClick={handleCelebrate} />
              <InteractiveElement emoji="🌟" onClick={handleCelebrate} />
            </div>

            <p className="text-center text-xl text-foreground/80 animate-fade-in">
              Click each icon to celebrate! 🎆
            </p>
          </div>
        </section>

        {/* Photo Memories Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="w-full max-w-6xl space-y-12">
            <h2 
              className="text-5xl md:text-6xl font-bold text-center bg-clip-text text-transparent animate-bounce-in"
              style={{ backgroundImage: "var(--gradient-text)" }}
            >
              Birthday Memories 📸
            </h2>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
              <PhotoPlaceholder size="medium" onClick={handlePhotoClick} />
              <PhotoPlaceholder size="large" onClick={handlePhotoClick} />
              <PhotoPlaceholder size="medium" onClick={handlePhotoClick} />
              <PhotoPlaceholder size="small" onClick={handlePhotoClick} />
              <PhotoPlaceholder size="medium" onClick={handlePhotoClick} />
              <PhotoPlaceholder size="small" onClick={handlePhotoClick} />
              <PhotoPlaceholder size="large" onClick={handlePhotoClick} />
              <PhotoPlaceholder size="medium" onClick={handlePhotoClick} />
            </div>

            <p className="text-center text-xl text-foreground/80 animate-fade-in">
              Click photo frames to add sparkles! ✨
            </p>
          </div>
        </section>

        {/* Mini Games Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="w-full max-w-6xl space-y-12">
            <h2 
              className="text-5xl md:text-6xl font-bold text-center bg-clip-text text-transparent animate-bounce-in"
              style={{ backgroundImage: "var(--gradient-text)" }}
            >
              Birthday Games! 🎮
            </h2>

            <div className="space-y-8">
              <BalloonPopGame onScore={handleScore} />
              <MemoryGame onWin={handleMemoryWin} />
              <ConfettiCannon onFire={handleCannonFire} />
            </div>
          </div>
        </section>

        {/* Special Message Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="w-full max-w-3xl space-y-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center gap-4 text-6xl animate-float">
                🎂 🎈 🎉
              </div>
              
              <h2 
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent animate-glow-pulse"
                style={{ backgroundImage: "var(--gradient-text)" }}
              >
                Wishing You an Amazing Year Ahead!
              </h2>
              
              <div className="space-y-4 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  May your day be filled with love, laughter, and countless balloons! 🎈
                </p>
                <p className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  Here's to another year of amazing adventures and unforgettable memories! ✨
                </p>
                <p className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  Keep scrolling up to pop more balloons! 🎊
                </p>
              </div>

              <div className="flex justify-center gap-6 pt-8">
                <InteractiveElement emoji="🥳" onClick={handleCelebrate} />
                <InteractiveElement emoji="🎂" onClick={handleCelebrate} />
                <InteractiveElement emoji="💝" onClick={handleCelebrate} />
              </div>
            </div>
          </div>
        </section>
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
