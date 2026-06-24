"use client";

import { useEffect } from "react";
import { animate } from "animejs";

const CATEGORIES = ["Installation", "Branding", "Graphic", "Typeface"];
const PX_PER_STEP = 70;

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
const INDEX_SPACING = 14; // radial gap between arcs (SVG user units)

const INDEX_LINES = [
  "Who are you when no one is watching | Ghent bookfair | Outland publishing book fair | Bounding in a spiral dance | Korea cultural centre UK | Gaeun Lee symbol | Socialed credentials",
  "Fabrika for across RCA | Yunseok Jang web | Blade typeface | Como clinic | Alice monde wedding | Hanel hair salon | Leadvault luggage | Xray 21 radiology | Josun hotel and resort",
  "The miraculous flight | enmove ZIC | Powerplants dialogue 01 | Kiss of Life logotype | 1ha web and motion | Brooklyn museum appearal",
  "Dorosiwa | Mother offline | Egg cup ceramics | Park's club popup store | Monolith NFT display",
];

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
          <g key={i} transform={`translate(${t.cx},${t.cy}) rotate(${t.rotation}) scale(0.26)`}>
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
    </svg>
  );
}

const IK = "https://ik.imagekit.io/qoon/tr:w-1400,q-85/boogpunt";

const CATEGORY_IMAGES = {
  Installation: { src: `${IK}/Watching/Watching_t_pZ7HDuKjb.jpg`,           mode: "cover" },
  Branding:     { src: `${IK}/ZIC/ZIC_t_GnmZsFq1K.jpg`,                     mode: "cover" },
  Graphic:      { src: `${IK}/Bound_in_a_spiral_dance/bsd_t_eGTNKWnIp.jpg`, mode: "cover" },
  Typeface:     null,
};

const CARDS = [
  { category: "branding",     meta: "SK enmove ZIC / Brand Identity / 2023",       img: `${IK}/ZIC/ZIC_0.png` },
  { category: "graphic",      meta: "Kiss of Life / Brand Film / 2023",             img: `${IK}/KOF/KOF_1.png` },
  { category: "branding",     meta: "Dorosiwa / Brand Identity / 2023",             img: `${IK}/Dorosiwa/Dorosiwa_1.png` },
  { category: "typeface",    meta: "Blade Typeface / Type Design / 2023",           img: `${IK}/Blade_Font/Blade_Font_1.png` },
  { category: "graphic",      meta: "Year of the Red Horse / Graphic / 2024",       img: `${IK}/Year_of_the_Red_Horse/Year_of_the_Red_Horse_1.png` },
  { category: "typeface",    meta: "Broken Birds / Art Direction / 2023",           img: `${IK}/BrokenBirds/BrokenBirds_1.png` },
  { category: "installation", meta: "Break / Architecture Demolition / 2023",        img: `${IK}/Break___Architecture_Demolition/Break___Architecture_Demolition_1.jpg` },
  { category: "installation", meta: "Invisible Memory / Exhibition / 2023",          img: `${IK}/Invisible_Memory___Precious_Thing/Invisible_Memory___Precious_Thing_1.png` },
  { category: "installation", meta: "Egg Cup / Ceramic Series / 2021",               img: `${IK}/EggCup/EggCup_1.jpg` },
  { category: "typeface",    meta: "Monolith NFT Display / Exhibition / 2022",      img: `${IK}/Monolith/Monolith_0.png` },
];

const PROJECTS = [
  "SK enmove ZIC Brand Renewal",
  "Dorosiwa Brand Renewal",
  "Kiss of Life : Brand Film Logotype",
  "The Miraculous Flight of the Broken Bird",
  "Monolith NFT Display Design",
  "Egg Cup Ceramic Series",
  "Year of the Red Horse",
  "Blade Typeface",
  "Invisible Memory : Precious Thing",
  "Break : Architecture Demolition",
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
    const cards        = [...document.querySelectorAll(".grid .card")];
    const allNavLinks  = [...document.querySelectorAll(".nav-link")];
    const discEl       = document.querySelector(".intro-disc");
    const linesGroupEl = document.querySelector(".clock-lines-group");
    const catLabelEl   = document.querySelector(".disc-label--cat");
    const hoverBgEl    = document.querySelector(".hover-bg");
    const hoverBgImg   = hoverBgEl.querySelector("img");

    const isMobile = window.matchMedia("(hover: none)").matches;

    let panelAnim, infoPanelAnim;
    let panelVisible     = false;
    let infoPanelVisible = false;
    let currentStep      = -1;
    let currentCatIndex  = 0;
    let vScrollY         = 0;  // virtual scroll position for mobile touch

    function updateLabelPos() {
      if (!discEl || !catLabelEl) return;
      const rect  = discEl.getBoundingClientRect();
      const scale = rect.width / 500;
      catLabelEl.style.left = `${rect.left + 43 * scale + 8}px`;
      catLabelEl.style.top  = `${rect.top  + 250 * scale}px`;
      // SVG font-size in user units so arc text renders at exactly 16px on screen
      const svgFs = +(16 / scale).toFixed(3);
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

    function setup() {
      updatePanelTops();
      // Use window.innerHeight offset to prevent flash when mobile address bar hides/shows
      if (!panelVisible)     filterPanel.style.transform = `translateY(${window.innerHeight}px)`;
      if (!infoPanelVisible) infoPanel.style.transform   = `translateY(${window.innerHeight}px)`;
      introEl.style.height = `${window.innerHeight}px`;
      spacer.style.height  = `${window.innerHeight * 5}px`;
      updateLabelPos();
    }

    function positionFilterBar() {
      const rect = projectsLink.getBoundingClientRect();
      filterBar.style.top         = `${rect.bottom}px`;
      filterBar.style.left        = "0";
      filterBar.style.right       = "0";
      filterBar.style.paddingLeft = isMobile ? "13px" : `${rect.left}px`;
    }

    function hideFilterBar() {
      filterBar.classList.remove("is-visible");
      nav.classList.remove("has-submenu");
      updatePanelTops();
    }

    function showFilterBar() {
      positionFilterBar();
      filterBar.classList.add("is-visible");
      nav.classList.add("has-submenu");
      updatePanelTops();
    }

    function processScroll(y) {
      if (panelVisible || infoPanelVisible) return;
      if (introEl.classList.contains("index-mode")) return;

      const totalSteps = Math.floor(y / PX_PER_STEP);
      if (totalSteps === currentStep) return;
      currentStep = totalSteps;

      linesGroupEl.style.transform = `rotate(${totalSteps * 30}deg)`;

      const newCatIndex = Math.floor(totalSteps / 3) % CATEGORIES.length;
      if (newCatIndex !== currentCatIndex) {
        currentCatIndex = newCatIndex;
        catLabelEl.textContent = CATEGORIES[currentCatIndex];
        if (!isMobile) hoverBgEl.classList.remove("is-visible");
      }

      const isLabelStep = totalSteps % 3 === 0;
      catLabelEl.classList.toggle("is-visible", isLabelStep);

      // Mobile: auto dissolve background image on label step
      if (isMobile) {
        const entry = CATEGORY_IMAGES[CATEGORIES[currentCatIndex]];
        if (isLabelStep && entry) {
          hoverBgImg.src = entry.src;
          hoverBgEl.dataset.mode = entry.mode;
          hoverBgEl.classList.add("is-visible");
          getImageBrightness(entry.src).then((b) => {
            document.documentElement.classList.toggle("bg-is-dark", b < 128);
          });
        } else if (!isLabelStep) {
          hoverBgEl.classList.remove("is-visible");
          delete hoverBgEl.dataset.mode;
          document.documentElement.classList.remove("bg-is-dark");
        }
      }
    }

    function onScroll() {
      processScroll(window.scrollY);
    }

    function populateFilterGrid(category) {
      filterGrid.innerHTML = "";
      const matching =
        category === "all" ? cards : cards.filter((c) => c.dataset.category === category);
      matching.forEach((card) => filterGrid.appendChild(card.cloneNode(true)));
    }

    function showFilter(category) {
      if (isMobile) { nav.classList.remove("is-open"); nav.classList.remove("in-filter-mode"); hideFilterBar(); }
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
      if (isMobile) { nav.classList.remove("is-open"); nav.classList.remove("in-filter-mode"); hideFilterBar(); }
      setup();
      if (panelVisible) hideFilter();
      infoPanelVisible = true;
      if (infoPanelAnim) infoPanelAnim.pause();
      infoPanelAnim = animate(infoPanel, { translateY: 0, duration: 700, ease: "outExpo" });
    }

    function hideInfo() {
      infoPanelVisible = false;
      if (infoPanelAnim) infoPanelAnim.pause();
      infoPanelAnim = animate(infoPanel, {
        translateY: window.innerHeight,
        duration: 500,
        ease: "inOutExpo",
      });
    }

    function exitIndexMode() {
      if (!introEl.classList.contains("index-mode")) return;
      introEl.classList.remove("index-mode");
      catLabelEl.classList.remove("is-visible");
      catLabelEl.textContent = CATEGORIES[currentCatIndex];
      currentStep = -1; // force processScroll to fully refresh state
      processScroll(isMobile ? vScrollY : window.scrollY);
    }

    // Category label hover → dissolve in background image + auto-invert text on dark bg
    const onLabelEnter = () => {
      if (introEl.classList.contains("index-mode")) return;
      const entry = CATEGORY_IMAGES[CATEGORIES[currentCatIndex]];
      if (entry) {
        hoverBgImg.src = entry.src;
        hoverBgEl.dataset.mode = entry.mode;
        hoverBgEl.classList.add("is-visible");
        getImageBrightness(entry.src).then((b) => {
          document.documentElement.classList.toggle("bg-is-dark", b < 128);
        });
      }
    };
    const onLabelLeave = () => {
      hoverBgEl.classList.remove("is-visible");
      delete hoverBgEl.dataset.mode;
      document.documentElement.classList.remove("bg-is-dark");
    };
    const onLabelClick = () => {
      allNavLinks.forEach(l => l.classList.remove("is-active"));
      showFilter(CATEGORIES[currentCatIndex].toLowerCase());
    };

    catLabelEl.addEventListener("mouseenter", onLabelEnter);
    catLabelEl.addEventListener("mouseleave", onLabelLeave);
    catLabelEl.addEventListener("click", onLabelClick);

    // Desktop: hover Works to show filter bar; 200ms grace period before hiding
    let worksEnterHandler = null;
    let worksLeaveHandler = null;
    let filterBarEnterHandler = null;
    let filterBarLeaveHandler = null;
    if (!isMobile) {
      let hideTimer = null;
      const cancelHide = () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } };
      const scheduleHide = () => { cancelHide(); hideTimer = setTimeout(hideFilterBar, 200); };

      worksEnterHandler = () => {
        cancelHide();
        allNavLinks.forEach(l => l.classList.remove("is-active"));
        projectsLink.classList.add("is-active");
        showFilterBar();
      };
      worksLeaveHandler   = scheduleHide;
      filterBarEnterHandler = cancelHide;
      filterBarLeaveHandler = scheduleHide;

      projectsLink.addEventListener("mouseenter", worksEnterHandler);
      projectsLink.addEventListener("mouseleave", worksLeaveHandler);
      filterBar.addEventListener("mouseenter", filterBarEnterHandler);
      filterBar.addEventListener("mouseleave", filterBarLeaveHandler);
    }

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
      if (!isOpen) {
        hideFilterBar();
        nav.classList.remove("in-filter-mode");
      }
    } : null;
    if (navToggleHandler) navToggle.addEventListener("click", navToggleHandler);

    // Filter buttons
    const filterBtns = [...document.querySelectorAll(".filter-btn")];
    const filterBtnHandlers = filterBtns.map((btn) => {
      const handler = function () {
        const wasActive = this.classList.contains("is-active") && panelVisible;
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        if (wasActive) {
          hideFilter();
        } else {
          this.classList.add("is-active");
          showFilter(this.dataset.filter);
        }
      };
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    const filterGridClickHandler = (e) => {
      if (e.target.closest(".card")) {
        hideFilter();
        window.scrollTo({ top: 0, behavior: "smooth" });
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

    const navLogoClickHandler = (e) => {
      e.preventDefault();
      exitIndexMode();
      hideFilterBar();
      if (panelVisible) hideFilter();
      if (infoPanelVisible) hideInfo();
      allNavLinks.forEach((l) => l.classList.remove("is-active"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    navLogo.addEventListener("click", navLogoClickHandler);

    const indexLinkHandler = (e) => {
      e.preventDefault();
      const isNowIndex = !introEl.classList.contains("index-mode");
      allNavLinks.forEach((l) => l.classList.remove("is-active"));
      if (isNowIndex) {
        indexLink.classList.add("is-active");
        introEl.classList.add("index-mode");
        catLabelEl.textContent = "Participated Project";
        catLabelEl.classList.add("is-visible");
      } else {
        exitIndexMode();
      }
    };
    indexLink.addEventListener("click", indexLinkHandler);

    const navLinkHandlers = allNavLinks.filter((l) => l !== infoLink && l !== indexLink).map((link) => {
      const handler = function () {
        exitIndexMode();
        allNavLinks.forEach((l) => l.classList.remove("is-active"));
        this.classList.add("is-active");
      };
      link.addEventListener("click", handler);
      return { link, handler };
    });

    let scrollRafId = null;
    const scrollHandler = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => { scrollRafId = null; onScroll(); });
    };

    // Mobile: virtual scroll via touch to prevent page movement + address bar animation
    let touchStartY = 0;
    const touchStartHandler = isMobile ? (e) => {
      touchStartY = e.touches[0].clientY;
    } : null;
    const touchMoveHandler = isMobile ? (e) => {
      if (panelVisible || infoPanelVisible) return;
      e.preventDefault();
      if (introEl.classList.contains("index-mode")) return; // scroll paused in index mode
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      vScrollY = Math.max(0, Math.min(window.innerHeight * 4, vScrollY + delta));
      processScroll(vScrollY);
    } : null;

    const resizeHandler = () => {
      setup();
      processScroll(isMobile ? vScrollY : window.scrollY);
    };

    setup();
    processScroll(0);
    window.addEventListener("resize", resizeHandler);
    if (isMobile) {
      document.addEventListener("touchstart", touchStartHandler, { passive: true });
      document.addEventListener("touchmove", touchMoveHandler, { passive: false });
    } else {
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
      if (isMobile) {
        document.removeEventListener("touchstart", touchStartHandler);
        document.removeEventListener("touchmove", touchMoveHandler);
      } else {
        window.removeEventListener("scroll", scrollHandler);
      }
      catLabelEl.removeEventListener("mouseenter", onLabelEnter);
      catLabelEl.removeEventListener("mouseleave", onLabelLeave);
      catLabelEl.removeEventListener("click", onLabelClick);
      if (!isMobile) {
        if (worksEnterHandler)     projectsLink.removeEventListener("mouseenter", worksEnterHandler);
        if (worksLeaveHandler)     projectsLink.removeEventListener("mouseleave", worksLeaveHandler);
        if (filterBarEnterHandler) filterBar.removeEventListener("mouseenter", filterBarEnterHandler);
        if (filterBarLeaveHandler) filterBar.removeEventListener("mouseleave", filterBarLeaveHandler);
      }
      if (mobileWorksHandler) projectsLink.removeEventListener("click", mobileWorksHandler);
      navFilterBtnHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      if (navToggleHandler && navToggle) navToggle.removeEventListener("click", navToggleHandler);
      filterBtnHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      filterGrid.removeEventListener("click", filterGridClickHandler);
      infoLink.removeEventListener("click", infoLinkHandler);
      indexLink.removeEventListener("click", indexLinkHandler);
      navLogo.removeEventListener("click", navLogoClickHandler);
      navLinkHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      if (panelAnim) panelAnim.pause();
      if (infoPanelAnim) infoPanelAnim.pause();
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-logo">Boogpunt</a>
        <button className="nav-toggle" aria-label="Menu">+</button>
        <ul className="nav-menu">
          <li className="nav-main-item"><a href="#work" className="nav-link is-active" data-menu="works">Works</a></li>
          <li className="nav-main-item"><a href="#" id="nav-index" className="nav-link">Index</a></li>
          <li className="nav-main-item"><a href="#info" className="nav-link" data-menu="about">About</a></li>
          <li className="nav-main-item"><a href="mailto:qoon@boogpunt.com" className="nav-link">Contact</a></li>
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
        <div className="hover-bg"><img alt="" /></div>
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
            <div className="info-entry">
              <span className="info-label">Prize</span>
              <div className="info-items">
                <p>Global Design IT Awards Silver 2023</p>
              </div>
            </div>
            <div className="info-entry">
              <span className="info-label">Contact</span>
              <div className="info-items">
                <p>Qoon@boogpunt.com</p>
                <p>@8009pt</p>
              </div>
            </div>
            <div className="info-entry info-entry--projects">
              <span className="info-label"></span>
              <div className="info-items">
                {PROJECTS.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="grid" id="work">
        {CARDS.map((card, i) => (
          <article key={i} className="card" data-category={card.category}>
            <img className="card-img" src={card.img} alt={card.meta} loading="lazy" />
            <p className="card-meta">{card.meta}</p>
          </article>
        ))}
      </main>

      <div className="spacer"></div>
    </>
  );
}
