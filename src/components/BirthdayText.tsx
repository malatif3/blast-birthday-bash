export const BirthdayText = () => {
  return (
    <div className="text-center space-y-8 animate-bounce-in">
      <h1 
        className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent animate-glow-pulse"
        style={{
          backgroundImage: "var(--gradient-text)",
          textShadow: "0 0 30px rgba(255, 105, 180, 0.5)",
        }}
      >
        HAPPY
      </h1>
      <div className="relative">
        <h2 
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent animate-glow-pulse"
          style={{
            backgroundImage: "var(--gradient-text)",
            animationDelay: "0.2s",
            textShadow: "0 0 30px rgba(138, 43, 226, 0.5)",
          }}
        >
          BIRTHDAY
        </h2>
        <div className="absolute -top-4 -right-4 text-6xl animate-float">🎉</div>
        <div className="absolute -bottom-4 -left-4 text-6xl animate-float-delayed">🎊</div>
      </div>
      <p className="text-2xl md:text-3xl font-light text-foreground/80 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        Click the balloons and cake to celebrate! 🎈
      </p>
    </div>
  );
};
