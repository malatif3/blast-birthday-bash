export const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
      <p className="text-sm text-foreground/70 font-medium">Scroll for more</p>
      <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
        <div className="w-1.5 h-3 bg-accent rounded-full animate-float" />
      </div>
    </div>
  );
};
