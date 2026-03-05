import React from "react";

const STATUS_CONFIG = {
  ready: { label: "READY", color: "text-primary", dotColor: "bg-primary" },
  timing: { label: "TIMING", color: "text-accent", dotColor: "bg-accent" },
  recorded: { label: "RECORDED", color: "text-primary", dotColor: "bg-primary" },
};

export default function RadarDisplay({ status, lastMph, sessionHigh, elapsedDisplay }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.ready;

  return (
    <div className="text-center space-y-1">
      {/* Status indicator */}
      <div className="flex items-center justify-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${cfg.dotColor} ${status === "timing" ? "animate-pulse" : ""}`} />
        <span className={`text-sm font-bold tracking-[0.25em] uppercase ${cfg.color}`}>
          {cfg.label}
        </span>
      </div>

      {/* Main speed display */}
      <div className="relative">
        {status === "timing" ? (
          <div className="py-2">
            <span className="text-5xl sm:text-6xl font-black tabular-nums text-accent tracking-tight font-mono">
              {elapsedDisplay}
            </span>
            <span className="text-lg text-accent/70 ml-1 font-medium">sec</span>
          </div>
        ) : (
          <div className="py-2">
            <span className="text-7xl sm:text-8xl font-black tabular-nums text-foreground tracking-tight font-mono leading-none">
              {lastMph !== null ? lastMph.toFixed(1) : "—"}
            </span>
            <span className="text-2xl text-muted-foreground ml-1 font-bold">MPH</span>
          </div>
        )}
      </div>

      {/* Session high */}
      {sessionHigh !== null && (
        <p className="text-sm text-muted-foreground font-medium">
          Session High: <span className="text-primary font-bold">{sessionHigh.toFixed(1)}</span> MPH
        </p>
      )}
    </div>
  );
}