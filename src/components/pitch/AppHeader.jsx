import React from "react";
import { ChevronLeft, HelpCircle } from "lucide-react";

export default function AppHeader({ activeTab, onBack, onHelp, pitcherName }) {
  const isHistory = activeTab === "history";

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border flex items-center px-4"
      style={{ paddingTop: "env(safe-area-inset-top)", height: "calc(52px + env(safe-area-inset-top))" }}
    >
      {/* Left slot */}
      <div className="w-10 flex items-center justify-start">
        {isHistory && (
          <button
            onClick={onBack}
            className="text-primary flex items-center gap-0.5 font-semibold text-sm no-select"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        )}
      </div>

      {/* Center */}
      <div className="flex-1 text-center">
        <span className="text-base font-black uppercase tracking-[0.18em] text-primary">
          PitchTap
        </span>
        {pitcherName && (
          <div className="text-[10px] text-muted-foreground font-semibold leading-none mt-0.5">
            ⚾ {pitcherName}
          </div>
        )}
      </div>

      {/* Right slot */}
      <div className="w-10 flex items-center justify-end">
        {!isHistory && (
          <button
            onClick={onHelp}
            className="text-muted-foreground hover:text-primary transition-colors no-select"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}