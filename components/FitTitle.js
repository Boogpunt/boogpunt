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

    const run = () => requestAnimationFrame(fit);
    document.fonts.ready.then(run);
    document.fonts.addEventListener("loadingdone", run);
    const observer = new ResizeObserver(run);
    observer.observe(el.parentElement);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", run);
    };
  }, []);

  return <h1 ref={ref} className={className}>{children}</h1>;
}
