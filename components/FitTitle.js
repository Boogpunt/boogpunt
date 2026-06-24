"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "200px";
      const ratio = window.innerWidth / el.scrollWidth;
      el.style.fontSize = `${200 * ratio}px`;
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
