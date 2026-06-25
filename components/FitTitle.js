"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // Container width from parent (not el itself, since el is inline-block)
      const containerWidth = el.parentElement?.getBoundingClientRect().width;
      if (!containerWidth) return;

      el.style.fontSize = "100px";
      const textWidth = el.getBoundingClientRect().width;
      if (!textWidth) return;

      let size = Math.floor(100 * containerWidth / textWidth);
      el.style.fontSize = size + "px";

      // Trim any subpixel overshoot
      while (el.getBoundingClientRect().width > containerWidth && size > 1) {
        el.style.fontSize = --size + "px";
      }
    };

    const run = () => requestAnimationFrame(fit);
    document.fonts.ready.then(run);

    const observer = new ResizeObserver(run);
    observer.observe(el.parentElement); // window resize
    observer.observe(el);               // font change: inline-block width = text width, so font load triggers this
    return () => observer.disconnect();
  }, []);

  return <h1 ref={ref} className={className}>{children}</h1>;
}
