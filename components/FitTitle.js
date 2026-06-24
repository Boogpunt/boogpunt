"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => requestAnimationFrame(() => {
      el.style.fontSize = "100px";
      const textWidth = el.getBoundingClientRect().width;
      const containerWidth = el.parentElement.getBoundingClientRect().width;
      if (textWidth > 0) el.style.fontSize = `${100 * containerWidth / textWidth}px`;
    });

    fit();
    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
