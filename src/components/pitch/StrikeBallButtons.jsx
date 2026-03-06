import React from "react";

export default function StrikeBallButtons({ onStrike, onBall, status }) {
  const disabled = status === "timing";

  return (
    <div className="flex gap-3 w-full max-w-sm">
      <button
        onClick={onStrike}
        disabled={disabled}
        className={`
          no-select flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider
          transition-colors border border-border
          ${disabled
            ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95"
          }
        `}
      >
        Strike
      </button>
      <button
        onClick={onBall}
        disabled={disabled}
        className={`
          no-select flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider
          transition-colors border border-border
          ${disabled
            ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95"
          }
        `}
      >
        Ball
      </button>
    </div>
  );
}