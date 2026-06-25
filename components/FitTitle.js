"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const range = document.createRange();
      // Set to 1px so text can't overflow and distort the parent's width
      el.style.fontSize = "1px";
      const containerWidth = el.getBoundingClientRect().width;
      // Measure text at 100px reference
      el.style.fontSize = "100px";
      range.selectNodeContents(el);
      const textWidth = range.getBoundingClientRect().width;
      if (textWidth > 0 && containerWidth > 0) {
        el.style.fontSize = `${Math.floor(100 * containerWidth / textWidth)}px`;
        for (let i = 0; i < 4; i++) {
          range.selectNodeContents(el);
          const w = range.getBoundingClientRect().width;
          if (w <= containerWidth) break;
          el.style.fontSize = `${Math.floor(parseFloat(el.style.fontSize) * containerWidth / w)}px`;
        }
      }
    };

    document.fonts.ready.then(() => requestAnimationFrame(fit));

    // ResizeObserver fires on window resize AND scrollbar appearance
    const observer = new ResizeObserver(() => requestAnimationFrame(fit));
    observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, []);

  return <h1 ref={ref} className={className}>{children}</h1>;
}
