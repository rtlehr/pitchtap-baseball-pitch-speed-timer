import React from "react";
import { Timer, History } from "lucide-react";

const tabs = [
  { id: "timer", label: "Timer", Icon: Timer },
  { id: "history", label: "History", Icon: History },
];

export default function BottomTabBar({ activeTab, onChange }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors no-select ${
            activeTab === id ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
        </button>
      ))}
    </div>
  );
}