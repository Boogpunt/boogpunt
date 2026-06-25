"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "100px";
      el.style.width = "max-content";
      const textWidth = el.getBoundingClientRect().width;
      el.style.width = "";
      const containerWidth = el.getBoundingClientRect().width;
      if (textWidth <= 0 || containerWidth <= 0) return;

      let size = Math.floor(100 * containerWidth / textWidth);
      el.style.fontSize = size + "px";

      el.style.width = "max-content";
      while (el.getBoundingClientRect().width > containerWidth && size > 1) {
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
