"use client";

import { useEffect } from "react";
import { animate } from "animejs";
import { INDEX_LINES, ALL_INDEX_ITEMS } from "@/lib/data";

const CATEGORIES = ["Graphic", "Installation", "Branding", "Typeface"];
const DEG_PER_CAT = 90; // degrees per category (4 categories × 90° = full circle)

// 92 minor ticks (every 3.75°, skipping every 24th = category major ticks)
const CLOCK_LINES = Array.from({ length: 96 }, (_, k) => {
  if (k % 24 === 0) return null;
  const deg = k * 3.75 - 90;
  const rad = (deg * Math.PI) / 180;
  const r1 = 220, r2 = 212;
  return {
    x1: +(250 + r1 * Math.cos(rad)).toFixed(1),
    y1: +(250 + r1 * Math.sin(rad)).toFixed(1),
    x2: +(250 + r2 * Math.cos(rad)).toFixed(1),
    y2: +(250 + r2 * Math.sin(rad)).toFixed(1),
  };
}).filter(Boolean);

// 4 category pointer shapes (bgpt_pt.svg) at 90° intervals — base at circumference, tip inward
const MAJOR_TICKS = [0, 24, 48, 72].map((k) => {
  const deg = k * 3.75 - 90;
  const rad = (deg * Math.PI) / 180;
  return {
    cx: +(250 + 220 * Math.cos(rad)).toFixed(1),
    cy: +(250 + 220 * Math.sin(rad)).toFixed(1),
    rotation: deg + 90,
  };
});

const brightnessCache = {};
function getImageBrightness(src) {
  if (brightnessCache[src] !== undefined) return Promise.resolve(brightnessCache[src]);
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 50; canvas.height = 50;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 50, 50);
        const data = ctx.getImageData(0, 0, 50, 50).data;
        let total = 0;
        for (let i = 0; i < data.length; i += 4)
          total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const b = total / (50 * 50);
        brightnessCache[src] = b;
        resolve(b);
      } catch { resolve(128); }
    };
    img.onerror = () => { brightnessCache[src] = 128; resolve(128); };
    img.src = src.replace(/tr:[^/]+/, "tr:w-50,h-50,q-50");
  });
}

// Index disc — arc text from 12 o'clock clockwise, wrap inner ring at 8 o'clock
const INDEX_OUTER_R = 195;
const INDEX_SPACING = 11; // radial gap between arcs (SVG user units)


// Compute arc end-point at 8 o'clock (240° clockwise from 12, i.e. 150° from +x axis)
function arcPath(r) {
  const ex = +(250 - r * 0.866025).toFixed(1);
  const ey = +(250 + r * 0.5).toFixed(1);
  return `M 250 ${250 - r} A ${r} ${r} 0 1 1 ${ex} ${ey}`;
}

function DiscSVG() {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        <path id="cat-tick" d="M14.255.23l-14.26,49.77L-14.255.23c4.73-.15,9.48-.23,14.25-.23s9.53.08,14.26.23Z" />
        {INDEX_LINES.map((_, i) => (
          <path key={i} id={`idx-arc-${i}`} d={arcPath(INDEX_OUTER_R - i * INDEX_SPACING)} />
        ))}
      </defs>

      {/* Clock mode */}
      <g className="clock-lines-group">
        {CLOCK_LINES.map((ln, i) => (
          <line key={i} className="clock-line" x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} />
        ))}
        {MAJOR_TICKS.map((t, i) => (
          <g key={i} className="clock-major-group" transform={`translate(${t.cx},${t.cy}) rotate(${t.rotation}) scale(0.26)`}>
            <rect x="-30" y="-10" width="60" height="65" fill="transparent" />
            <use href="#cat-tick" className="clock-major" />
          </g>
        ))}
      </g>

      {/* Index mode — arc text inside disc ticks */}
      <g className="index-group">
        {INDEX_LINES.map((text, i) => (
          <text key={i} className="index-text">
            <textPath href={`#idx-arc-${i}`}>{text}</textPath>
          </text>
        ))}
      </g>

      {/* Hover zone — transparent circle covers entire tick area */}
      <circle className="disc-hover-zone" cx="250" cy="250" r="220" fill="transparent" />
    </svg>
  );
}

const IK      = "https://ik.imagekit.io/qoon/tr:w-1400,q-85/boogpunt";
const BG_IK   = "https://ik.imagekit.io/qoon/tr:w-2400,q-92/boogpunt/bg/desktop";
const BG_IK_M = "https://ik.imagekit.io/qoon/tr:w-1000,q-88/boogpunt/bg/mobile";

const CATEGORY_IMAGES = {
  Graphic:      { desktop: `${BG_IK}/graphic_mainbg_d.jpg?v=2`,      mobile: `${BG_IK_M}/graphic_mainbg_m.jpg?v=2`,      mode: "cover" },
  Installation: { desktop: `${BG_IK}/installation_mainbg_d.jpg?v=2`, mobile: `${BG_IK_M}/installation_mainbg_m.jpg?v=2`, mode: "cover" },
  Branding:     { desktop: `${BG_IK}/branding_mainbg_d.jpg?v=2`,     mobile: `${BG_IK_M}/branding_mainbg_m.jpg?v=2`,     mode: "cover" },
  Typeface:     { desktop: `${BG_IK}/typeface_mainbg_d.jpg?v=2`,     mobile: `${BG_IK_M}/typeface_mainbg_m.jpg?v=2`,     mode: "cover" },
};

const CARDS = [
  { categories: ["graphic"],                  meta: "Who are you, When no one is watching 4 / Graphic / 2026",      img: `${IK}/FortuneOrigami/fo_t.png`,                                              slug: "watching-4" },
  { categories: ["installation"],             meta: "Who are you, When no one is watching 2 / Installation / 2026", img: `${IK}/Minkowski/Minkowski_0.jpg`,                                            slug: "minkowski" },
  { categories: ["graphic", "installation"],  meta: "Who are you, When no one is watching 1 / Graphic / 2026",      img: `${IK}/Watching/Watching_t.jpg`,                                              slug: "watching" },
  { categories: ["typeface", "graphic"],      meta: "Bound in a Spiral Dance / Typeface / 2026",                    img: `${IK}/BoundInASpiralDance/bsd_t.jpg`,                                        slug: "bound-in-a-spiral-dance" },
  { categories: ["installation"],             meta: "Fabrika / Installation / 2026",                                img: `${IK}/Fabrika/fabrika_t.jpg`,                                                slug: "fabrika" },
  { categories: ["typeface"],                 meta: "Blade / Typeface / 2026",                                      img: `${IK}/Blade/Blade_t.jpg`,                                                    slug: "blade" },
  { categories: ["branding"],                 meta: "SK enmove ZIC / Brand Identity / 2023",                        img: `${IK}/ZIC/ZIC_0.png`,                                                        slug: "zic" },
  { categories: ["typeface"],                 meta: "Kiss of Life Film Logo / Typeface / 2023",                     img: `${IK}/KissOfLife/KOF_t.png`,                                                 slug: "kiss-of-life" },
  { categories: ["graphic"],                  meta: "Runaway / Graphic / 2026",                                     img: `${IK}/Runaway/Runaway_t.jpg`,                                                slug: "runaway" },
  { categories: ["graphic"],                  meta: "Eyelight / Graphic / 2026",                                    img: `${IK}/Eyelight/Eyelight_t.jpg`,                                              slug: "eyelight" },
  { categories: ["graphic"],                  meta: "Break / Graphic / 2024",                                       img: `${IK}/Break/Break___Architecture_Demolition_1.jpg`,                          slug: "break" },
  { categories: ["branding"],                 meta: "Dorosiwa / Branding / 2023",                                   img: `${IK}/Dorosiwa/Dorosiwa_1.png`,                                              slug: "dorosiwa" },
  { categories: ["installation"],             meta: "Egg Cup / Installation / 2022",                                img: `${IK}/EggCup/EggCup_1.jpg`,                                                  slug: "egg-cup" },
  { categories: ["installation"],             meta: "Monolith / Installation / 2022",                               img: `${IK}/Monolith/Monolith_0.jpg`,                                              slug: "monolith" },
  { categories: ["graphic"],                  meta: "Broken Birds / Graphic / 2023",                                img: `${IK}/BrokenBirds/BrokenBirds_1.png`,                                        slug: "broken-birds" },
  { categories: ["graphic"],                  meta: "Invisible Memory / Graphic / 2025",                            img: `${IK}/InvisibleMemory/Invisible_Memory___Precious_Thing_t.jpg`,               slug: "invisible-memory" },
];


export default function Home() {
  useEffect(() => {
    const nav          = document.querySelector(".nav");
    const navToggle    = document.querySelector(".nav-toggle");
    const filterBar    = document.querySelector(".filter-bar");
    const introEl      = document.querySelector(".intro");
    const spacer       = document.querySelector(".spacer");
    const filterPanel  = document.querySelector(".filter-panel");
    const filterGrid   = document.querySelector(".filter-grid");
    const infoPanel    = document.querySelector(".info-panel");
    const projectsLink = document.querySelector('.nav-link[data-menu="works"]');
    const infoLink     = document.querySelector('.nav-link[data-menu="about"]');
    const indexLink    = document.getElementById("nav-index");
    const navLogo      = document.querySelector(".nav-logo");
    const allNavLinks  = [...document.querySelectorAll(".nav-link")];
    const discEl       = document.querySelector(".intro-disc");
    const linesGroupEl = document.querySelector(".clock-lines-group");
    const catLabelEl   = document.querySelector(".disc-label--cat");
    const hoverBgEl    = document.querySelector(".hover-bg");
    const hoverBgImgs  = [...hoverBgEl.querySelectorAll("img")];
    let activeBgIdx = 0;
    function setBg(src) {
      if (!hoverBgEl.classList.contains("is-visible")) {
        // Container hidden: set directly on active slot, no cross-fade
        hoverBgImgs[activeBgIdx].src = src;
        hoverBgImgs[activeBgIdx].style.opacity = "1";
        const inactive = hoverBgImgs[1 - activeBgIdx];
        inactive.style.transition = "none";
        inactive.style.opacity = "0";
        requestAnimationFrame(() => { inactive.style.transition = ""; });
        return;
      }
      const next = 1 - activeBgIdx;
      hoverBgImgs[next].src = src;
      hoverBgImgs[next].style.opacity = "1";
      hoverBgImgs[activeBgIdx].style.opacity = "0";
      activeBgIdx = next;
    }

    const isMobile   = window.matchMedia("(hover: none)").matches;
    const isPortrait = () => window.matchMedia("(orientation: portrait)").matches;

    let panelAnim, infoPanelAnim;
    let panelVisible        = false;
    let infoPanelVisible    = false;
    let activePanelCategory = null;
    let currentCatIndex  = 0;
    let currentAngle     = 0;   // current disc rotation in degrees
    let isAnimating      = false;
    let snapRafId        = null;
    let isHoveringDisc   = false;
    let autoRotateTimer  = null;
    let cooldown         = false;
    let cooldownTimer    = null;
    let typingInterval   = null;
    let rotRafId         = null;

    const INDEX_SLUG_MAP = {
      "Who are you when no one is watching 4": "/watching-4",
      "Who are you when no one is watching 2": "/minkowski",
      "Who are you when no one is watching 1": "/watching",
      "Bounding in a spiral dance": "/bound-in-a-spiral-dance",
      "Fabrika for across RCA": "/fabrika",
      "Blade typeface": "/blade",
      "SK enmove ZIC": "/zic",
      "Kiss of Life logotype": "/kiss-of-life",
      "Runaway": "/runaway",
      "Eyelight": "/eyelight",
      "Break": "/break",
      "Dorosiwa": "/dorosiwa",
      "Egg cup ceramics": "/egg-cup",
      "Monolith NFT display": "/monolith",
      "Broken Birds": "/broken-birds",
      "Invisible Memory": "/invisible-memory",
    };

    function buildIndexLinks(textPaths) {
      const NS = "http://www.w3.org/2000/svg";
      textPaths.forEach((tp, i) => {
        const items = INDEX_LINES[i].split(" | ");
        tp.textContent = "";
        items.forEach((item, j) => {
          if (j > 0) {
            const sep = document.createElementNS(NS, "tspan");
            sep.textContent = " | ";
            tp.appendChild(sep);
          }
          const tspan = document.createElementNS(NS, "tspan");
          tspan.textContent = item;
          const slug = INDEX_SLUG_MAP[item];
          if (slug) {
            tspan.classList.add("index-link");
            tspan.addEventListener("click", () => { window.location.href = slug; });
          }
          tp.appendChild(tspan);
        });
      });
    }

    function updateLabelPos() {
      if (!discEl || !catLabelEl) return;
      const rect  = discEl.getBoundingClientRect();
      const scale = rect.width / 500;
      catLabelEl.style.left = `${rect.left + 43 * scale + 8}px`;
      catLabelEl.style.top  = `${rect.top  + 250 * scale}px`;
      const targetFs = isMobile ? 11 : 16;
      const svgFs = +(targetFs / scale).toFixed(3);
      document.querySelectorAll(".index-text").forEach(el => el.setAttribute("font-size", svgFs));
    }

    function updatePanelTops() {
      const navB     = nav.getBoundingClientRect().bottom;
      const panelTop = filterBar.classList.contains("is-visible")
        ? filterBar.getBoundingClientRect().bottom
        : navB;
      const panelH = window.innerHeight - panelTop;
      filterPanel.style.top    = `${panelTop}px`;
      filterPanel.style.height = `${panelH}px`;
      infoPanel.style.top      = `${panelTop}px`;
      infoPanel.style.height   = `${panelH}px`;
    }

    function positionFilterBar() {
      const rect = projectsLink.getBoundingClientRect();
      filterBar.style.top         = `${nav.getBoundingClientRect().bottom}px`;
      filterBar.style.left        = "0";
      filterBar.style.right       = "0";
      filterBar.style.paddingLeft = isMobile ? "13px" : `${rect.left}px`;
    }

    function hideFilterBar() {
      filterBar.classList.remove("is-visible");
      updatePanelTops();
    }

    function showFilterBar() {
      positionFilterBar();
      filterBar.classList.add("is-visible");
      updatePanelTops();
    }

    document.documentElement.classList.add("main-page");

    // Mobile: increase arc spacing so text lines don't overlap at smaller SVG size
    if (isMobile) {
      const mobileSpacing = 20;
      INDEX_LINES.forEach((_, i) => {
        const pathEl = document.getElementById(`idx-arc-${i}`);
        if (pathEl) pathEl.setAttribute("d", arcPath(INDEX_OUTER_R - i * mobileSpacing));
      });
    }

    function setup() {
      updatePanelTops();
      // Use window.innerHeight offset to prevent flash when mobile address bar hides/shows
      if (!panelVisible)     filterPanel.style.transform = `translateY(${window.innerHeight}px)`;
      if (!infoPanelVisible) infoPanel.style.transform   = `translateY(${window.innerHeight}px)`;
      introEl.style.height = `${window.innerHeight}px`;
      spacer.style.height  = "0";
      updateLabelPos();
    }

    function animateToAngle(target) {
      if (isAnimating) return;
      isAnimating = true;
      cooldown = true;
      if (cooldownTimer) { clearTimeout(cooldownTimer); cooldownTimer = null; }

      const from     = currentAngle;
      const duration = 550;
      let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const p     = Math.min((ts - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // outCubic
        linesGroupEl.style.transform = `rotate(${from + (target - from) * eased}deg)`;
        if (p < 1) {
          snapRafId = requestAnimationFrame(step);
        } else {
          currentAngle = target;
          isAnimating  = false;
          snapRafId    = null;
          catLabelEl.textContent = CATEGORIES[currentCatIndex];
          catLabelEl.classList.add("is-visible");
          cooldownTimer = setTimeout(() => { cooldown = false; cooldownTimer = null; }, 250);
        }
      }
      catLabelEl.classList.remove("is-visible");
      snapRafId = requestAnimationFrame(step);
    }

    function advanceCategory(dir) {
      if (isAnimating || cooldown) return;
      if (panelVisible || infoPanelVisible) return;
      if (introEl.classList.contains("index-mode")) return;

      currentCatIndex = ((currentCatIndex + dir) % CATEGORIES.length + CATEGORIES.length) % CATEGORIES.length;
      if (isPortrait()) {
        const entry = CATEGORY_IMAGES[CATEGORIES[currentCatIndex]];
        if (entry) {
          setBg(entry.mobile);
          hoverBgEl.dataset.mode = entry.mode;
          hoverBgEl.classList.add("is-visible");
          getImageBrightness(entry.mobile).then((b) => {
            document.documentElement.classList.toggle("bg-is-dark", b < 128);
          });
        } else {
          hoverBgEl.classList.remove("is-visible");
          delete hoverBgEl.dataset.mode;
          document.documentElement.classList.remove("bg-is-dark");
        }
      } else if (isHoveringDisc) {
        onLabelEnter();
      } else {
        hoverBgEl.classList.remove("is-visible");
      }

      animateToAngle(currentAngle + dir * DEG_PER_CAT);
    }

    function layoutMasonry() {
      const gridCards = [...filterGrid.children];
      if (!gridCards.length) return;
      const gap = 8;
      const padX = 8;
      const containerW = filterGrid.clientWidth - padX * 2;
      const numCols = window.innerWidth > 640 ? 4 : 2;
      const unit = (containerW - gap * (numCols - 1)) / numCols;

      gridCards.forEach(card => {
        const span = card._span || 1;
        const w = span === 2 ? unit * 2 + gap : unit;
        card.style.cssText = `position:absolute;width:${w}px;top:-9999px;left:0;`;
      });

      const heights = gridCards.map(c => c.getBoundingClientRect().height);

      const colH = new Array(numCols).fill(0);
      gridCards.forEach((card, i) => {
        const span = card._span || 1;
        let bestCol = 0, bestH = Infinity;
        for (let c = 0; c <= numCols - span; c++) {
          const h = Math.max(...colH.slice(c, c + span));
          if (h < bestH) { bestH = h; bestCol = c; }
        }
        const x = padX + bestCol * (unit + gap);
        const y = bestH > 0 ? bestH + gap : 0;
        card.style.left = `${x}px`;
        card.style.top  = `${y}px`;
        const h = heights[i] || unit * 0.75;
        for (let c = bestCol; c < bestCol + span; c++) colH[c] = y + h;
      });

      filterGrid.style.height = `${Math.max(...colH) + 30}px`;
    }

    function populateFilterGrid(category) {
      filterGrid.innerHTML = "";
      const matching = category === "all" ? CARDS : CARDS.filter(c => c.categories.includes(category));
      matching.forEach((cardData) => {
        const article = document.createElement("article");
        article.className = "card";
        article.dataset.categories = cardData.categories.join(",");
        article.dataset.slug = cardData.slug;
        const img = document.createElement("img");
        img.className = "card-img";
        img.src = cardData.img;
        img.alt = cardData.meta;
        img.loading = "eager";
        const p = document.createElement("p");
        p.className = "card-meta";
        p.textContent = cardData.meta;
        article.appendChild(img);
        article.appendChild(p);
        article._span = 1;
        const assignSpan = () => {
          if (img.naturalWidth && img.naturalHeight) {
            const isLandscape = img.naturalWidth / img.naturalHeight > 1.4;
            article._span = (isLandscape && Math.random() < 0.5) ? 2 : 1;
          }
          layoutMasonry();
        };
        if (img.complete && img.naturalWidth > 0) assignSpan();
        else img.addEventListener("load", assignSpan, { once: true });
        filterGrid.appendChild(article);
      });
      layoutMasonry();
    }

    function showFilter(category) {
      activePanelCategory = category;
      document.documentElement.classList.add("overlay-open");
      nav.style.background = "#ffffff";
      if (isMobile) { nav.classList.remove("is-open"); nav.classList.remove("in-filter-mode"); hideFilterBar(); }
      document.body.style.overflow = "hidden";
      setup();
      if (infoPanelVisible) hideInfo();
      if (panelVisible) {
        if (panelAnim) panelAnim.pause();
        panelAnim = animate(filterPanel, {
          translateY: filterPanel.clientHeight,
          duration: 350,
          ease: "inExpo",
          onComplete: () => {
            populateFilterGrid(category);
            panelAnim = animate(filterPanel, { translateY: 0, duration: 500, ease: "outExpo" });
          },
        });
      } else {
        populateFilterGrid(category);
        panelVisible = true;
        if (panelAnim) panelAnim.pause();
        panelAnim = animate(filterPanel, { translateY: 0, duration: 700, ease: "outExpo" });
      }
    }

    function hideFilter() {
      panelVisible = false;
      activePanelCategory = null;
      sessionStorage.removeItem("filterCategory");
      document.body.style.overflow = "";
      if (!infoPanelVisible) {
        document.documentElement.classList.remove("overlay-open");
        nav.style.background = "";
      }
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      if (isMobile) hideFilterBar();
      if (panelAnim) panelAnim.pause();
      panelAnim = animate(filterPanel, {
        translateY: window.innerHeight,
        duration: 500,
        ease: "inOutExpo",
      });
    }

    function showInfo() {
      document.documentElement.classList.add("overlay-open");
      nav.style.background = "#ffffff";
      if (isMobile) { nav.classList.remove("is-open"); nav.classList.remove("in-filter-mode"); hideFilterBar(); }
      setup();
      if (panelVisible) hideFilter();
      infoPanelVisible = true;
      if (infoPanelAnim) infoPanelAnim.pause();
      infoPanelAnim = animate(infoPanel, { translateY: 0, duration: 700, ease: "outExpo" });
    }

    function hideInfo() {
      infoPanelVisible = false;
      if (!panelVisible) {
        document.documentElement.classList.remove("overlay-open");
        nav.style.background = "";
      }
      if (infoPanelAnim) infoPanelAnim.pause();
      infoPanelAnim = animate(infoPanel, {
        translateY: window.innerHeight,
        duration: 500,
        ease: "inOutExpo",
      });
    }

    function exitIndexMode() {
      if (!introEl.classList.contains("index-mode")) return;
      if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
      if (rotRafId) { cancelAnimationFrame(rotRafId); rotRafId = null; }
      document.querySelectorAll(".index-text textPath").forEach(el => { el.textContent = ""; });
      introEl.classList.remove("index-mode");
      document.documentElement.classList.remove("index-bg");
      catLabelEl.textContent = CATEGORIES[currentCatIndex];
      linesGroupEl.style.transform = `rotate(${currentAngle}deg)`;
      catLabelEl.classList.add("is-visible");
    }

    // Category label hover → dissolve in background image + auto-invert text on dark bg
    const onLabelEnter = () => {
      if (introEl.classList.contains("index-mode")) return;
      isHoveringDisc = true;
      const entry = CATEGORY_IMAGES[CATEGORIES[currentCatIndex]];
      if (entry) {
        const bgSrc = isPortrait() ? entry.mobile : entry.desktop;
        setBg(bgSrc);
        hoverBgEl.dataset.mode = entry.mode;
        hoverBgEl.classList.add("is-visible");
        getImageBrightness(bgSrc).then((b) => {
          document.documentElement.classList.toggle("bg-is-dark", b < 128);
        });
      }
    };
    const onLabelLeave = () => {
      isHoveringDisc = false;
      if (isPortrait()) return;
      hoverBgEl.classList.remove("is-visible");
      delete hoverBgEl.dataset.mode;
      document.documentElement.classList.remove("bg-is-dark");
    };
    const onLabelClick = () => {
      if (introEl.classList.contains("index-mode")) return;
      allNavLinks.forEach(l => l.classList.remove("is-active"));
      showFilter(CATEGORIES[currentCatIndex].toLowerCase());
    };

    catLabelEl.addEventListener("click", onLabelClick);

    const majorTickEls = [];
    const discHoverZone = document.querySelector(".disc-hover-zone");
    if (!isMobile && discHoverZone) {
      discHoverZone.addEventListener("mouseenter", onLabelEnter);
      discHoverZone.addEventListener("mouseleave", onLabelLeave);
      discHoverZone.addEventListener("click", onLabelClick);
    }

    // Desktop: hover Works to show filter bar
    let worksEnterHandler = null;
    let worksLeaveHandler = null;
    let filterBarEnterHandler = null;
    let filterBarLeaveHandler = null;
    if (!isMobile) {
      let hideTimer = null;
      const cancelHide = () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } };
      const scheduleHide = () => { cancelHide(); hideTimer = setTimeout(hideFilterBar, 200); };
      worksEnterHandler     = () => { cancelHide(); allNavLinks.forEach(l => l.classList.remove("is-active")); projectsLink.classList.add("is-active"); showFilterBar(); };
      worksLeaveHandler     = scheduleHide;
      filterBarEnterHandler = cancelHide;
      filterBarLeaveHandler = scheduleHide;
      projectsLink.addEventListener("mouseenter", worksEnterHandler);
      projectsLink.addEventListener("mouseleave", worksLeaveHandler);
      filterBar.addEventListener("mouseenter", filterBarEnterHandler);
      filterBar.addEventListener("mouseleave", filterBarLeaveHandler);
    }

    // Filter buttons
    const filterBtns = [...document.querySelectorAll(".filter-btn")];
    const filterBtnHandlers = filterBtns.map((btn) => {
      const handler = function () {
        const wasActive = this.classList.contains("is-active") && panelVisible;
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        if (wasActive) { hideFilter(); } else { this.classList.add("is-active"); showFilter(this.dataset.filter); }
      };
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    // Mobile: tap Works to switch nav into inline filter mode
    const mobileWorksHandler = isMobile ? (e) => {
      e.preventDefault();
      nav.classList.add("in-filter-mode");
    } : null;
    if (mobileWorksHandler) projectsLink.addEventListener("click", mobileWorksHandler);

    // Mobile: tap a nav filter item → apply filter and close nav
    const navFilterBtns = [...document.querySelectorAll(".nav-filter-btn")];
    const navFilterBtnHandlers = isMobile ? navFilterBtns.map((btn) => {
      const handler = () => {
        nav.classList.remove("is-open");
        nav.classList.remove("in-filter-mode");
        showFilter(btn.dataset.filter);
      };
      btn.addEventListener("click", handler);
      return { btn, handler };
    }) : [];

    // Mobile nav toggle (+): expand/collapse nav-menu; also clears filter mode
    const navToggleHandler = navToggle ? () => {
      const isOpen = nav.classList.toggle("is-open");
      if (!isOpen) { hideFilterBar(); nav.classList.remove("in-filter-mode"); }
      if (panelVisible || infoPanelVisible) nav.style.background = "#ffffff";
    } : null;
    if (navToggleHandler) navToggle.addEventListener("click", navToggleHandler);

    const filterGridClickHandler = (e) => {
      const card = e.target.closest(".card");
      if (card) {
        const slug = card.dataset.slug;
        if (slug) {
          if (activePanelCategory) sessionStorage.setItem("filterCategory", activePanelCategory);
          window.location.href = `/${slug}`;
        } else {
          hideFilter();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };
    filterGrid.addEventListener("click", filterGridClickHandler);

    const infoLinkHandler = (e) => {
      e.preventDefault();
      exitIndexMode();
      const wasActive = infoLink.classList.contains("is-active") && infoPanelVisible;
      allNavLinks.forEach((l) => l.classList.remove("is-active"));
      if (wasActive) {
        hideInfo();
      } else {
        infoLink.classList.add("is-active");
        showInfo();
      }
    };
    infoLink.addEventListener("click", infoLinkHandler);

    const navLogoClickHandler = () => {
      exitIndexMode();
      hideFilterBar();
      if (panelVisible) hideFilter();
      if (infoPanelVisible) hideInfo();
      allNavLinks.forEach((l) => l.classList.remove("is-active"));
    };
    navLogo.addEventListener("click", navLogoClickHandler);

    const indexLinkHandler = (e) => {
      e.preventDefault();
      if (infoPanelVisible) hideInfo();
      if (panelVisible) hideFilter();
      hideFilterBar();
      const isNowIndex = !introEl.classList.contains("index-mode");
      allNavLinks.forEach((l) => l.classList.remove("is-active"));
      if (isNowIndex) {
        hoverBgEl.classList.remove("is-visible");
        indexLink.classList.add("is-active");
        introEl.classList.add("index-mode");
        document.documentElement.classList.add("index-bg");
        catLabelEl.textContent = "Participated Project";
        catLabelEl.classList.add("is-visible");

        if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
        if (rotRafId) { cancelAnimationFrame(rotRafId); rotRafId = null; }

        const textPaths = [...document.querySelectorAll(".index-text textPath")];
        textPaths.forEach(el => { el.textContent = ""; });

        // Rotate ticks one full turn (outCubic, 700ms), typing starts simultaneously
        const startRot = currentAngle;
        const rotDur = 700;
        let t0 = null;
        function spinStep(ts) {
          if (t0 === null) t0 = ts;
          const p = Math.min((ts - t0) / rotDur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          linesGroupEl.style.transform = `rotate(${startRot + 360 * eased}deg)`;
          if (p < 1) rotRafId = requestAnimationFrame(spinStep);
          else rotRafId = null;
        }
        rotRafId = requestAnimationFrame(spinStep);

        let ci = 0;
        const maxLen = Math.max(...INDEX_LINES.map(l => l.length));
        typingInterval = setInterval(() => {
          ci++;
          textPaths.forEach((el, i) => { el.textContent = INDEX_LINES[i].slice(0, ci); });
          if (ci >= maxLen) { clearInterval(typingInterval); typingInterval = null; buildIndexLinks(textPaths); }
        }, 6);
      } else {
        exitIndexMode();
      }
    };
    indexLink.addEventListener("click", indexLinkHandler);

    const navLinkHandlers = allNavLinks.filter((l) => l !== infoLink && l !== indexLink).map((link) => {
      const handler = function () {
        exitIndexMode();
        if (infoPanelVisible) hideInfo();
        allNavLinks.forEach((l) => l.classList.remove("is-active"));
        this.classList.add("is-active");
      };
      link.addEventListener("click", handler);
      return { link, handler };
    });

    // Desktop: wheel → advance one category per scroll
    const wheelHandler = (e) => {
      if (panelVisible || infoPanelVisible) return;
      e.preventDefault();
      resetAutoRotate();
      if (isAnimating || cooldown) return;
      if (introEl.classList.contains("index-mode")) return;
      advanceCategory(e.deltaY > 0 ? 1 : -1);
    };

    // Mobile: swipe up/down → advance one category per swipe
    let touchStartY = 0;
    const touchStartHandler = isMobile ? (e) => {
      touchStartY = e.touches[0].clientY;
    } : null;
    const touchMoveHandler = isMobile ? (e) => {
      if (panelVisible || infoPanelVisible) return;
      e.preventDefault();
    } : null;
    const touchEndHandler = isMobile ? (e) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
      resetAutoRotate();
      advanceCategory(delta > 0 ? 1 : -1);
    } : null;

    function startAutoRotate() {
      if (autoRotateTimer) clearInterval(autoRotateTimer);
      autoRotateTimer = setInterval(() => {
        if (isHoveringDisc) return;
        advanceCategory(1);
      }, 3000);
    }
    function resetAutoRotate() { startAutoRotate(); }

    const showPortraitBg = () => {
      const entry = CATEGORY_IMAGES[CATEGORIES[currentCatIndex]];
      if (entry) {
        setBg(entry.mobile);
        hoverBgEl.dataset.mode = entry.mode;
        hoverBgEl.classList.add("is-visible");
        getImageBrightness(entry.mobile).then((b) => {
          document.documentElement.classList.toggle("bg-is-dark", b < 128);
        });
      }
    };
    const resizeHandler = () => {
      setup();
      if (isPortrait()) showPortraitBg();
      else { hoverBgEl.classList.remove("is-visible"); delete hoverBgEl.dataset.mode; document.documentElement.classList.remove("bg-is-dark"); }
      if (panelVisible) layoutMasonry();
    };

    setup();
    catLabelEl.textContent = CATEGORIES[0];
    catLabelEl.classList.add("is-visible");
    if (isPortrait()) {
      const initEntry = CATEGORY_IMAGES[CATEGORIES[0]];
      if (initEntry) {
        setBg(initEntry.mobile);
        hoverBgEl.dataset.mode = initEntry.mode;
        hoverBgEl.classList.add("is-visible");
      }
    }
    const savedCat = sessionStorage.getItem("filterCategory");
    if (savedCat) { sessionStorage.removeItem("filterCategory"); showFilter(savedCat); }
    startAutoRotate();
    window.addEventListener("resize", resizeHandler);
    if (isMobile) {
      document.addEventListener("touchstart", touchStartHandler, { passive: true });
      document.addEventListener("touchmove", touchMoveHandler, { passive: false });
      document.addEventListener("touchend", touchEndHandler, { passive: true });
    } else {
      window.addEventListener("wheel", wheelHandler, { passive: false });
    }

    return () => {
      document.documentElement.classList.remove("main-page");
      document.body.style.overflow = "";
      window.removeEventListener("resize", resizeHandler);
      if (isMobile) {
        document.removeEventListener("touchstart", touchStartHandler);
        document.removeEventListener("touchmove", touchMoveHandler);
        document.removeEventListener("touchend", touchEndHandler);
      } else {
        window.removeEventListener("wheel", wheelHandler);
      }
      catLabelEl.removeEventListener("click", onLabelClick);
      if (!isMobile && discHoverZone) {
        discHoverZone.removeEventListener("mouseenter", onLabelEnter);
        discHoverZone.removeEventListener("mouseleave", onLabelLeave);
        discHoverZone.removeEventListener("click", onLabelClick);
      }
      if (!isMobile) {
        if (worksEnterHandler)     projectsLink.removeEventListener("mouseenter", worksEnterHandler);
        if (worksLeaveHandler)     projectsLink.removeEventListener("mouseleave", worksLeaveHandler);
        if (filterBarEnterHandler) filterBar.removeEventListener("mouseenter", filterBarEnterHandler);
        if (filterBarLeaveHandler) filterBar.removeEventListener("mouseleave", filterBarLeaveHandler);
      }
      filterBtnHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      if (mobileWorksHandler) projectsLink.removeEventListener("click", mobileWorksHandler);
      navFilterBtnHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      if (navToggleHandler && navToggle) navToggle.removeEventListener("click", navToggleHandler);
      filterGrid.removeEventListener("click", filterGridClickHandler);
      if (typingInterval) clearInterval(typingInterval);
      if (rotRafId) cancelAnimationFrame(rotRafId);
      infoLink.removeEventListener("click", infoLinkHandler);
      indexLink.removeEventListener("click", indexLinkHandler);
      navLogo.removeEventListener("click", navLogoClickHandler);
      navLinkHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
      if (snapRafId) cancelAnimationFrame(snapRafId);
      if (cooldownTimer) clearTimeout(cooldownTimer);
      if (autoRotateTimer) clearInterval(autoRotateTimer);
      if (panelAnim) panelAnim.pause();
      if (infoPanelAnim) infoPanelAnim.pause();
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-row">
          <a href="/" className="nav-logo">Boogpunt</a>
          <button className="nav-toggle" aria-label="Menu"><span className="nav-toggle-icon">+</span></button>
        </div>
        <ul className="nav-menu">
          <li className="nav-main-item"><a href="#work" className="nav-link is-active" data-menu="works">Works</a></li>
          <li className="nav-main-item"><a href="#" id="nav-index" className="nav-link">Index</a></li>
          <li className="nav-main-item"><a href="#info" className="nav-link" data-menu="about">About</a></li>
          <li className="nav-main-item"><a href="mailto:qoon@boogpunt.com" className="nav-link" target="_blank" rel="noopener noreferrer">Contact</a></li>
          <li className="nav-filter-item"><button className="nav-link nav-filter-btn" data-filter="all">All</button></li>
          <li className="nav-filter-item"><button className="nav-link nav-filter-btn" data-filter="branding">Branding</button></li>
          <li className="nav-filter-item"><button className="nav-link nav-filter-btn" data-filter="graphic">Graphic</button></li>
          <li className="nav-filter-item"><button className="nav-link nav-filter-btn" data-filter="typeface">Typeface</button></li>
          <li className="nav-filter-item"><button className="nav-link nav-filter-btn" data-filter="installation">Installation</button></li>
        </ul>
      </nav>

      <div className="filter-bar">
        <button className="filter-btn" data-filter="all">All</button>
        <button className="filter-btn" data-filter="branding">Branding</button>
        <button className="filter-btn" data-filter="graphic">Graphic</button>
        <button className="filter-btn" data-filter="typeface">Typeface</button>
        <button className="filter-btn" data-filter="installation">Installation</button>
      </div>

      <div className="intro">
        <div className="hover-bg"><img alt="" /><img alt="" style={{opacity:0}} /></div>
        <div className="intro-disc"><DiscSVG /></div>
        <div className="disc-label disc-label--cat">{CATEGORIES[0]}</div>
      </div>

      <div className="filter-panel">
        <div className="filter-grid"></div>
      </div>

      <div className="info-panel">
        <div className="info-inner">
          <div className="info-bio">
            <h2 className="info-title">Boogpunt Studio, in Superposition Across Various Fields of Visual Communication</h2>
            <p className="info-body">Qoon is a brand and graphic designer based in London and Seoul. Drawing from his experience across industrial design, brand design, graphic design, interior design, installation, and photography, his practice focuses on building systems that translate physical structure, context, and perception into diverse forms of visual language.</p>
            <p className="info-body">During his MA at the Royal College of Art, he explores new materialist theory, particularly the concept of superposition, and develops it into visual systems. His work investigates how complex physical and scientific ideas can be translated into more intuitive and accessible visual structures.</p>
            <p className="info-body">Based on this, he approaches design not as a fixed outcome, but as an interaction that shifts, adapts, and unfolds across different environments.</p>
          </div>
          <div className="info-table">
            <div className="info-entry">
              <span className="info-label">Contact</span>
              <div className="info-items">
                <a href="https://www.instagram.com/8009pt/" target="_blank" rel="noopener noreferrer">@8009pt</a>
                <a href="mailto:qoon@boogpunt.com">qoon@boogpunt.com</a>
              </div>
            </div>
            <div className="info-entry info-entry--experience">
              <span className="info-label">Experience</span>
              <div className="info-items">
                <p>COV STUDIO. Lead Graphic Designer. 2024–2025</p>
                <p>SAM PARTNERS. Brand Designer. 2022–2024</p>
                <p>MOTHER. Graphic Designer. 2022</p>
              </div>
            </div>
            <div className="info-entry">
              <span className="info-label">Education</span>
              <div className="info-items">
                <p>Royal College of Art. MA Visual Communication</p>
                <p>De Haagse Hogeschool. CMD Exchanged Students</p>
                <p>University of Seoul. BA Product Design</p>
              </div>
            </div>
            <div className="info-entry info-entry--projects">
              <span className="info-label">Client Project</span>
              <div className="info-items">
                {[
                  { name: "Como clinic",                       desc: "branding" },
                  { name: "Double Lovers",                     desc: "interior concept proposal" },
                  { name: "Inneat",                            desc: "hair salon graphic design" },
                  { name: "Xenia clinic",                      desc: "3D visual direction" },
                  { name: "Alice monde",                       desc: "wedding venue branding" },
                  { name: "Hanel",                             desc: "hair salon branding and visual direction" },
                  { name: "Daymean",                           desc: "hair salon graphic design" },
                  { name: "Leadvault",                         desc: "luggage branding" },
                  { name: "Josun hotel and resort",            desc: "residency branding",                       gap: 1 },
                  { name: "SK enmove zic",                     desc: "lubricants branding" },
                  { name: "Second wear",                       desc: "second hands platform branding" },
                  { name: "Samsung DS FWD",                    desc: "conference branding" },
                  { name: "Mother offline",                    desc: "cafe brand renewal",                       gap: 1 },
                  { name: "Anna pesonen poster",               desc: "RCA sculpture final show poster design",   gap: 2 },
                  { name: "Blade typeface",                    desc: "typeface design" },
                  { name: "Socialed",                          desc: "brand creds" },
                  { name: "Korean cultural centre UK",         desc: "brand renewal" },
                  { name: "Xray 21",                           desc: "diagnostic radiology branding" },
                  { name: "Demolition explore: Break",         desc: "campaign design and direction" },
                  { name: "Broken bird",                       desc: "exhibition graphic design" },
                  { name: "Kiss of life",                      desc: "k-pop artist brand film logotype" },
                  { name: "Monolith",                          desc: "multimedia object design" },
                ].map((item, i) => (
                  <p key={i} style={item.gap ? { marginTop: `${item.gap * 1.1}em` } : undefined}>
                    {item.name} <span className="client-desc">{item.desc}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="grid" id="work">
        {CARDS.map((card, i) => (
          <article key={card.slug} className="card" data-categories={card.categories.join(",")} data-slug={card.slug || ""}>
            <img className="card-img" src={card.img} alt={card.meta} loading={i === 0 ? "eager" : "lazy"} />
            <p className="card-meta">{card.meta}</p>
          </article>
        ))}
      </main>

      <div className="spacer"></div>
    </>
  );
}
