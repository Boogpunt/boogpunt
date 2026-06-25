"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "100px";
      const range = document.createRange();
      range.selectNodeContents(el);
      const textWidth = range.getBoundingClientRect().width;
      const containerWidth = el.parentElement.getBoundingClientRect().width;
      if (textWidth > 0 && containerWidth > 0) {
        el.style.fontSize = `${Math.floor(100 * containerWidth / textWidth)}px`;
        range.selectNodeContents(el);
        const actual = range.getBoundingClientRect().width;
        if (actual > containerWidth) {
          el.style.fontSize = `${Math.floor(parseFloat(el.style.fontSize) * containerWidth / actual)}px`;
        }
      }
    };

    fit();
    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return <h1 ref={ref} className={className}>{children}</h1>;
}
