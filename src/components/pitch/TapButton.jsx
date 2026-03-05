import React from "react";

export default function TapButton({ status, onTap }) {
  const isReady = status === "ready" || status === "recorded";
  const isTiming = status === "timing";

  return (
    <button
      onClick={onTap}
      className={`
        no-select w-48 h-48 sm:w-56 sm:h-56 rounded-full 
        flex flex-col items-center justify-center
        font-bold text-lg tracking-wide uppercase
        transition-all duration-150 active:scale-95
        border-4
        ${isReady
          ? "bg-primary/15 border-primary text-primary pulse-ready hover:bg-primary/25"
          : "bg-accent/15 border-accent text-accent pulse-timing hover:bg-accent/25"
        }
      `}
    >
      {isReady ? (
        <>
          <span className="text-3xl sm:text-4xl font-black">TAP</span>
          <span className="text-xs mt-1 opacity-70">to start timing</span>
        </>
      ) : (
        <>
          <span className="text-3xl sm:text-4xl font-black">TAP</span>
          <span className="text-xs mt-1 opacity-70">ball caught</span>
        </>
      )}
    </button>
  );
}