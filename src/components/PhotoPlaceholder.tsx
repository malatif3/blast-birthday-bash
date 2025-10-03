import { useState } from "react";

interface PhotoPlaceholderProps {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export const PhotoPlaceholder = ({ size = "medium", onClick }: PhotoPlaceholderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-64 h-64",
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${sizeClasses[size]} rounded-2xl border-4 border-accent/50 bg-card/30 backdrop-blur-sm
        flex items-center justify-center cursor-pointer transition-all duration-300
        hover:scale-105 hover:border-accent hover:shadow-lg relative overflow-hidden group`}
      style={{
        boxShadow: isHovered ? "0 0 30px hsl(45 100% 60% / 0.5)" : "0 0 15px hsl(45 100% 60% / 0.2)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
      
      <div className="relative z-10 text-center space-y-2">
        <div className="text-6xl animate-float">📸</div>
        <p className="text-sm font-medium text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity">
          Add Photo
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 right-2 text-2xl animate-float-delayed">✨</div>
      <div className="absolute bottom-2 left-2 text-2xl animate-float">🎈</div>
    </button>
  );
};
