import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const apply = (e) => {
      document.documentElement.classList.toggle("dark", e.matches);
    };
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    apply(mq);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return children;
}