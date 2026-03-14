import React from "react";

export default function TapButton({ status, onPressStart, onPressEnd }) {
  const isReady = status === "ready" || status === "recorded";

  const handlePointerDown = (e) => {
    e.preventDefault();
    if (isReady) onPressStart();
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    if (status === "timing") onPressEnd();
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
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
          <span className="text-3xl sm:text-4xl font-black">HOLD</span>
          <span className="text-xs mt-1 opacity-70">press &amp; hold to start</span>
        </>
      ) : (
        <>
          <span className="text-3xl sm:text-4xl font-black">RELEASE</span>
          <span className="text-xs mt-1 opacity-70">ball caught</span>
        </>
      )}
    </button>
  );
}