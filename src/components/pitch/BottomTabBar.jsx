import React from "react";
import { NavLink } from "react-router-dom";
import { Timer, History } from "lucide-react";

const tabs = [
  { to: "/", label: "Timer", Icon: Timer, end: true },
  { to: "/history", label: "History", Icon: History, end: false },
];

export default function BottomTabBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors no-select ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
        </NavLink>
      ))}
    </div>
  );
}