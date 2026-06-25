"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // Measure actual text width: set el to max-content so it shrinks to exact text width
      el.style.fontSize = "100px";
      el.style.width = "max-content";
      const textWidth = el.getBoundingClientRect().width;
      // Restore to block → el fills parent content area exactly
      el.style.width = "";
      const containerWidth = el.getBoundingClientRect().width;

      if (textWidth <= 0 || containerWidth <= 0) return;

      let size = Math.floor(100 * containerWidth / textWidth);
      el.style.fontSize = size + "px";

      // Correct for sub-pixel rendering: step down 1px until text fits
      el.style.width = "max-content";
      for (let i = 0; i < 5; i++) {
        if (el.getBoundingClientRect().width <= containerWidth) break;
        el.style.fontSize = --size + "px";
      }
      el.style.width = "";
    };

    document.fonts.ready.then(() => requestAnimationFrame(fit));
    const observer = new ResizeObserver(() => requestAnimationFrame(fit));
    observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, []);

  return <h1 ref={ref} className={className}>{children}</h1>;
}
