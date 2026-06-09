"use client";

import { useEffect } from "react";
import { animate } from "animejs";

const DISC_TEXT =
  "KONONENKO ARCHITECTURAL BUREAU — VISUAL IDENTITY — 2026 · NUMINOUS AGENCY — WEB DESIGN — 2025 · ROCK'N'RAMP — MOTION & TYPOGRAPHY — 2025 · CHRISTIAN FLEMING DESIGN — WEB DESIGN — 2024 · JILI BURO — VISUAL IDENTITY — 2024 · AKOVA — BRANDING & PACKAGING — 2024 · MERIDIAN STUDIO — BRAND IDENTITY — 2024 · VOLTA TYPE — TYPE DESIGN — 2023 · OSLO COLLECTIVE — EDITORIAL — 2023 · PARK AVENUE — VISUAL IDENTITY — 2023 ·";

function DiscSVG({ index }) {
  const id = `disc-ring-${index}`;
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id={id} d="M250,250 m-220,0 a220,220 0 1,1 440,0 a220,220 0 1,1,-440,0" />
      </defs>
      <circle cx="250" cy="250" r="249" fill="#0d0d0d" />
      <circle cx="250" cy="250" r="244" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="250" cy="250" r="168" fill="#1c1c1c" />
      <circle cx="250" cy="250" r="172" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="250" cy="250" r="20" fill="#555" />
      <text
        fontSize="8.5"
        fill="rgba(255,255,255,0.5)"
        fontFamily="Helvetica Neue, Helvetica, sans-serif"
        fontWeight="400"
        letterSpacing="2"
      >
        <textPath href={`#${id}`} startOffset="0%">
          {DISC_TEXT}
        </textPath>
      </text>
    </svg>
  );
}

const CARDS = [
  { category: "identity", meta: "Kononenko Architectural Bureau / Visual Identity / 2026" },
  { category: "website",  meta: "Numinous Agency / Web Design / 2025" },
  { category: "graphic",  meta: "Rock'n'Ramp / Motion · Typography / 2025" },
  { category: "website",  meta: "Christian Fleming Design / Web Design / 2024" },
  { category: "identity", meta: "Jili Buro / Visual Identity / 2024" },
  { category: "graphic",  meta: "Akova / Branding · Packaging / 2024" },
  { category: "identity", meta: "Meridian Studio / Brand Identity / 2024" },
  { category: "editorial",meta: "Volta Type / Type Design / 2023" },
  { category: "editorial",meta: "Oslo Collective / Editorial / 2023" },
  { category: "identity", meta: "Park Avenue / Visual Identity / 2023" },
];

export default function Home() {
  useEffect(() => {
    const nav          = document.querySelector(".nav");
    const filterBar    = document.querySelector(".filter-bar");
    const introEl      = document.querySelector(".intro");
    const railPath     = document.querySelector(".disc-rail-path");
    const grid         = document.querySelector(".grid");
    const spacer       = document.querySelector(".spacer");
    const filterPanel  = document.querySelector(".filter-panel");
    const filterGrid   = document.querySelector(".filter-grid");
    const projectsLink = document.querySelector('.nav-link[data-menu="projects"]');
    const navLogo      = document.querySelector(".nav-logo");
    const introFooter  = document.querySelector(".intro-footer");
    const cards        = [...document.querySelectorAll(".grid .card")];
    const discEls      = [...document.querySelectorAll(".intro-disc")];

    const DELAY_RATIO = 0.35;
    let gridAnim, panelAnim;
    let panelVisible  = false;
    let hideTimeout;
    let discOffsets   = [-1, 0, 1];
    let discAnimating = false;

    function setup() {
      const navBottom = nav.getBoundingClientRect().bottom + 8;
      const panelH    = window.innerHeight - navBottom;

      grid.style.paddingTop    = `${navBottom}px`;
      filterPanel.style.top    = `${navBottom}px`;
      filterPanel.style.height = `${panelH}px`;

      if (!panelVisible) {
        filterPanel.style.transform = `translateY(${panelH}px)`;
      }

      const vh = window.innerHeight;
      introEl.style.height = `${vh}px`;
      spacer.style.height  = `${grid.scrollHeight + vh + vh * DELAY_RATIO}px`;

      const discR = discEls[discOffsets.indexOf(0)].getBoundingClientRect().width / 2;
      const R     = discR + 10;
      const cx    = window.innerWidth / 2;
      const cy    = vh / 2;
      const c     = 10;
      railPath.setAttribute(
        "d",
        `M ${cx} 0 ` +
          `L ${cx} ${cy - R - c} ` +
          `Q ${cx} ${cy - R} ${cx - c} ${cy - R} ` +
          `A ${R} ${R} 0 0 0 ${cx - c} ${cy + R} ` +
          `Q ${cx} ${cy + R} ${cx} ${cy + R + c} ` +
          `L ${cx} ${vh}`
      );

      introFooter.style.left = `${window.innerWidth / 2 + 16}px`;
      positionDiscs(false);
    }

    function discSpacing() {
      const discW   = discEls[0].getBoundingClientRect().width;
      const minPeek = 60;
      const max     = window.innerWidth / 2 + discW / 2 - minPeek;
      return Math.min(discW * 1.25, Math.max(discW * 0.8, max));
    }

    function positionDiscs(shouldAnimate) {
      const discW   = discEls[0].getBoundingClientRect().width;
      const spacing = discSpacing();
      const cxPos   = window.innerWidth / 2;
      discEls.forEach((disc, i) => {
        const offset     = discOffsets[i];
        const targetLeft = cxPos - discW / 2 + offset * spacing;
        const isCenter   = offset === 0;
        disc.style.cursor = isCenter ? "default" : "pointer";
        if (shouldAnimate) {
          animate(disc, { left: targetLeft, opacity: isCenter ? 1 : 0.5, duration: 700, ease: "outExpo" });
        } else {
          disc.style.left    = `${targetLeft}px`;
          disc.style.opacity = isCenter ? 1 : 0.5;
        }
      });
    }

    function positionFilterBar() {
      const rect = projectsLink.getBoundingClientRect();
      filterBar.style.top  = `${rect.bottom + 20}px`;
      filterBar.style.left = `${rect.left}px`;
    }

    function showFilterBar() {
      clearTimeout(hideTimeout);
      positionFilterBar();
      filterBar.classList.add("is-visible");
    }

    function scheduleHideFilterBar() {
      hideTimeout = setTimeout(() => filterBar.classList.remove("is-visible"), 150);
    }

    function onScroll() {
      if (panelVisible) return;

      const y         = window.scrollY;
      const vh        = window.innerHeight;
      const delay     = vh * DELAY_RATIO;
      const maxScroll = Math.max(0, grid.scrollHeight - vh);

      let gridY;
      if (y <= delay) {
        gridY = vh;
      } else if (y <= delay + vh) {
        gridY = vh * (1 - (y - delay) / vh);
      } else {
        gridY = -Math.min(y - delay - vh, maxScroll);
      }

      if (gridAnim) gridAnim.pause();
      gridAnim = animate(grid, { translateY: gridY, duration: 400, ease: "outExpo" });

      introEl.classList.toggle("is-blurred", gridY < vh * 0.7);
    }

    function populateFilterGrid(category) {
      filterGrid.innerHTML = "";
      const matching =
        category === "all" ? cards : cards.filter((c) => c.dataset.category === category);
      matching.forEach((card) => filterGrid.appendChild(card.cloneNode(true)));
    }

    function showFilter(category) {
      populateFilterGrid(category);
      panelVisible = true;
      if (panelAnim) panelAnim.pause();
      panelAnim = animate(filterPanel, { translateY: 0, duration: 700, ease: "outExpo" });
    }

    function hideFilter() {
      panelVisible = false;
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      if (panelAnim) panelAnim.pause();
      panelAnim = animate(filterPanel, {
        translateY: filterPanel.clientHeight,
        duration: 500,
        ease: "inOutExpo",
      });
      onScroll();
    }

    // Disc carousel clicks
    const discClickHandlers = discEls.map((disc, i) => {
      const handler = () => {
        if (discAnimating || discOffsets[i] === 0) return;
        discAnimating = true;

        const direction = discOffsets[i] > 0 ? 1 : -1;
        const discW     = discEls[0].getBoundingClientRect().width;
        const spacing   = discSpacing();
        const cxPos     = window.innerWidth / 2;
        const leftAt    = (slot) => cxPos - discW / 2 + slot * spacing;

        discOffsets = discOffsets.map((o) => o - direction);

        discEls.forEach((d, j) => {
          const newOff = discOffsets[j];
          if (Math.abs(newOff) >= 2) {
            const recycled  = -Math.sign(newOff);
            d.style.left    = `${leftAt(recycled * 2)}px`;
            d.style.opacity = "0.5";
            discOffsets[j]  = recycled;
            requestAnimationFrame(() => {
              d.style.cursor = "pointer";
              animate(d, { left: leftAt(recycled), opacity: 0.5, duration: 700, ease: "outExpo" });
            });
          } else {
            d.style.cursor = newOff === 0 ? "default" : "pointer";
            animate(d, {
              left:     leftAt(newOff),
              opacity:  newOff === 0 ? 1 : 0.5,
              duration: 700,
              ease:     "outExpo",
            });
          }
        });

        setTimeout(() => { discAnimating = false; }, 750);
      };
      disc.addEventListener("click", handler);
      return handler;
    });

    // Filter bar hover dropdown
    projectsLink.addEventListener("mouseenter", showFilterBar);
    projectsLink.addEventListener("mouseleave", scheduleHideFilterBar);
    const clearHideTimeout = () => clearTimeout(hideTimeout);
    filterBar.addEventListener("mouseenter", clearHideTimeout);
    filterBar.addEventListener("mouseleave", scheduleHideFilterBar);

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

    // Filter panel card click → close and scroll top
    const filterGridClickHandler = (e) => {
      if (e.target.closest(".card")) {
        hideFilter();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    filterGrid.addEventListener("click", filterGridClickHandler);

    // Nav logo
    const navLogoClickHandler = (e) => {
      e.preventDefault();
      if (panelVisible) hideFilter();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    navLogo.addEventListener("click", navLogoClickHandler);

    // Nav links active state
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const navLinkHandlers = navLinks.map((link) => {
      const handler = function () {
        navLinks.forEach((l) => l.classList.remove("is-active"));
        this.classList.add("is-active");
      };
      link.addEventListener("click", handler);
      return { link, handler };
    });

    // rAF-throttled scroll
    let scrollRafId = null;
    const scrollHandler = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        onScroll();
      });
    };

    const resizeHandler = () => { setup(); onScroll(); };

    setup();
    onScroll();
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", scrollHandler);
      discEls.forEach((disc, i) => disc.removeEventListener("click", discClickHandlers[i]));
      projectsLink.removeEventListener("mouseenter", showFilterBar);
      projectsLink.removeEventListener("mouseleave", scheduleHideFilterBar);
      filterBar.removeEventListener("mouseenter", clearHideTimeout);
      filterBar.removeEventListener("mouseleave", scheduleHideFilterBar);
      filterBtnHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      filterGrid.removeEventListener("click", filterGridClickHandler);
      navLogo.removeEventListener("click", navLogoClickHandler);
      navLinkHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      clearTimeout(hideTimeout);
      if (gridAnim) gridAnim.pause();
      if (panelAnim) panelAnim.pause();
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-logo">Boogpunt</a>
        <ul className="nav-menu">
          <li><a href="#work"    className="nav-link is-active" data-menu="projects">Projects</a></li>
          <li><a href="#"        className="nav-link">Index</a></li>
          <li><a href="#info"    className="nav-link">Info</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>

      <div className="filter-bar">
        <button className="filter-btn" data-filter="all">All Types</button>
        <button className="filter-btn" data-filter="graphic">Graphic</button>
        <button className="filter-btn" data-filter="editorial">Editorial</button>
        <button className="filter-btn" data-filter="website">Website</button>
        <button className="filter-btn" data-filter="identity">Identity</button>
        <button className="filter-btn" data-filter="space">Space</button>
        <button className="filter-btn" data-filter="practice">Practice</button>
      </div>

      <div className="intro">
        <div className="intro-disc"><DiscSVG index={0} /></div>
        <div className="intro-disc"><DiscSVG index={1} /></div>
        <div className="intro-disc"><DiscSVG index={2} /></div>

        <svg className="disc-rail-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="rail-glow" x="-40%" y="-10%" width="180%" height="120%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            id="disc-rail-path"
            className="disc-rail-path"
            fill="none"
            stroke="rgba(160,160,160,0.55)"
            strokeWidth="2"
            filter="url(#rail-glow)"
          />
          <circle r="3" fill="rgba(180,180,180,0.75)" filter="url(#rail-glow)">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#disc-rail-path" />
            </animateMotion>
          </circle>
        </svg>

        <div className="intro-footer">
          <p className="intro-text">
            Brand Experience Designer based in London<br />
            Who are superposition with various fields of<br />
            visual communication.
          </p>
        </div>
      </div>

      <div className="filter-panel">
        <div className="filter-grid"></div>
      </div>

      <main className="grid" id="work">
        {CARDS.map((card, i) => (
          <article key={i} className="card" data-category={card.category}>
            <div className="card-img"></div>
            <p className="card-meta">{card.meta}</p>
          </article>
        ))}
      </main>

      <div className="spacer"></div>
    </>
  );
}
