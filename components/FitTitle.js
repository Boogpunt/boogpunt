"use client";
import { useEffect, useRef } from "react";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "100px";
      // scrollWidth gives the text's natural width (block element with white-space:nowrap)
      // parentElement.clientWidth gives the available container width
      const ratio = el.parentElement.clientWidth / el.scrollWidth;
      if (ratio > 0) el.style.fontSize = `${100 * ratio}px`;
    };

    fit();
    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return <h1 ref={ref} className={className}>{children}</h1>;
}
