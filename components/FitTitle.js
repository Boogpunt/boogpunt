"use client";
import { useEffect, useRef } from "react";

const REFERENCE = "Runaway";

export default function FitTitle({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measureInkWidth = (text) => {
      const probe = el.cloneNode(false);
      probe.style.cssText = "position:absolute;top:-9999px;visibility:hidden;white-space:nowrap;font-size:100px";
      probe.textContent = text;
      document.body.appendChild(probe);
      const w   = probe.getBoundingClientRect().width;
      const ls  = parseFloat(window.getComputedStyle(probe).letterSpacing) || 0;
      document.body.removeChild(probe);
      return ls < 0 ? w - ls : w;
    };

    const fit = () => {
      const containerWidth = el.parentElement?.getBoundingClientRect().width;
      if (!containerWidth) return;

      const refInkW   = measureInkWidth(REFERENCE);
      const titleInkW = measureInkWidth(el.textContent);

      // Longer than REFERENCE → fill 100% of container.
      // REFERENCE or shorter → cap at 95% of REFERENCE-fit (centered with side whitespace).
      const size = titleInkW > refInkW
        ? Math.floor(100 * containerWidth / titleInkW)
        : Math.floor(95  * containerWidth / refInkW);

      el.style.fontSize = size + "px";
    };

    const run = () => requestAnimationFrame(fit);
    document.fonts.ready.then(run);

    const observer = new ResizeObserver(run);
    observer.observe(el.parentElement);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <h1 ref={ref} className={className}>{children}</h1>;
}
