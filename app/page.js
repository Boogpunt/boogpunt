"use client";

import { useEffect } from "react";
import { animate } from "animejs";

const DISC_TEXT =
  "SK ENMOVE ZIC — BRAND IDENTITY — 2023 · DOROSIWA — BRAND IDENTITY — 2023 · KISS OF LIFE — BRAND FILM — 2023 · BROKEN BIRDS — ART DIRECTION — 2023 · MONOLITH — NFT DISPLAY — 2022 · EGG CUP — CERAMIC SERIES — 2021 · YEAR OF THE RED HORSE — GRAPHIC — 2024 · BLADE TYPEFACE — TYPE DESIGN — 2023 · INVISIBLE MEMORY — EXHIBITION — 2023 · BREAK — ARCHITECTURE DEMOLITION — 2023 ·";

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

const IK = "https://ik.imagekit.io/qoon/tr:w-1400,q-85/boogpunt";

const CARDS = [
  { category: "identity", meta: "SK enmove ZIC / Brand Identity / 2023",        img: `${IK}/ZIC/ZIC_0.png` },
  { category: "graphic",  meta: "Kiss of Life / Brand Film / 2023",              img: `${IK}/KOF/KOF_1.png` },
  { category: "identity", meta: "Dorosiwa / Brand Identity / 2023",             img: `${IK}/Dorosiwa/Dorosiwa_1.png` },
  { category: "editorial",meta: "Blade Typeface / Type Design / 2023",           img: `${IK}/Blade_Font/Blade_Font_1.png` },
  { category: "graphic",  meta: "Year of the Red Horse / Graphic / 2024",       img: `${IK}/Year_of_the_Red_Horse/Year_of_the_Red_Horse_1.png` },
  { category: "graphic",  meta: "Broken Birds / Art Direction / 2023",           img: `${IK}/BrokenBirds/BrokenBirds_1.png` },
  { category: "graphic",  meta: "Break / Architecture Demolition / 2023",        img: `${IK}/Break___Architecture_Demolition/Break___Architecture_Demolition_1.jpg` },
  { category: "editorial",meta: "Invisible Memory / Exhibition / 2023",          img: `${IK}/Invisible_Memory___Precious_Thing/Invisible_Memory___Precious_Thing_1.png` },
  { category: "editorial",meta: "Egg Cup / Ceramic Series / 2021",               img: `${IK}/EggCup/EggCup_1.jpg` },
  { category: "editorial",meta: "Monolith NFT Display / Exhibition / 2022",      img: `${IK}/Monolith/Monolith_0.png` },
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
    const filterBar    = document.querySelector(".filter-bar");
    const introEl      = document.querySelector(".intro");
    const railPath     = document.querySelector(".disc-rail-path");
    const grid         = document.querySelector(".grid");
    const spacer       = document.querySelector(".spacer");
    const filterPanel  = document.querySelector(".filter-panel");
    const filterGrid   = document.querySelector(".filter-grid");
    const infoPanel    = document.querySelector(".info-panel");
    const projectsLink = document.querySelector('.nav-link[data-menu="projects"]');
    const infoLink     = document.querySelector('.nav-link[data-menu="info"]');
    const navLogo      = document.querySelector(".nav-logo");
    const introFooter  = document.querySelector(".intro-footer");
    const cards        = [...document.querySelectorAll(".grid .card")];
    const discEls      = [...document.querySelectorAll(".intro-disc")];
    const allNavLinks  = [...document.querySelectorAll(".nav-link")];

    const DELAY_RATIO = 0.35;
    let gridAnim, panelAnim, infoPanelAnim;
    let panelVisible      = false;
    let infoPanelVisible  = false;
    let hideTimeout;
    let discOffsets   = [-1, 0, 1];
    let discAnimating = false;

    function setup() {
      const navBottom = nav.getBoundingClientRect().bottom + 8;
      const panelH    = window.innerHeight - navBottom;

      grid.style.paddingTop    = `${navBottom}px`;
      filterPanel.style.top    = `${navBottom}px`;
      filterPanel.style.height = `${panelH}px`;
      infoPanel.style.top      = `${navBottom}px`;
      infoPanel.style.height   = `${panelH}px`;

      if (!panelVisible)     filterPanel.style.transform = `translateY(${panelH}px)`;
      if (!infoPanelVisible) infoPanel.style.transform   = `translateY(${panelH}px)`;

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
      if (panelVisible || infoPanelVisible) return;

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
      if (infoPanelVisible) hideInfo();
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

    function showInfo() {
      if (panelVisible) hideFilter();
      infoPanelVisible = true;
      if (infoPanelAnim) infoPanelAnim.pause();
      infoPanelAnim = animate(infoPanel, { translateY: 0, duration: 700, ease: "outExpo" });
    }

    function hideInfo() {
      infoPanelVisible = false;
      if (infoPanelAnim) infoPanelAnim.pause();
      infoPanelAnim = animate(infoPanel, {
        translateY: infoPanel.clientHeight,
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

    // Info link
    const infoLinkHandler = (e) => {
      e.preventDefault();
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

    // Nav logo
    const navLogoClickHandler = (e) => {
      e.preventDefault();
      if (panelVisible) hideFilter();
      if (infoPanelVisible) hideInfo();
      allNavLinks.forEach((l) => l.classList.remove("is-active"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    navLogo.addEventListener("click", navLogoClickHandler);

    // Nav links active state (excluding info link which has its own handler)
    const navLinkHandlers = allNavLinks.filter((l) => l !== infoLink).map((link) => {
      const handler = function () {
        allNavLinks.forEach((l) => l.classList.remove("is-active"));
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
      infoLink.removeEventListener("click", infoLinkHandler);
      navLogo.removeEventListener("click", navLogoClickHandler);
      navLinkHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      clearTimeout(hideTimeout);
      if (gridAnim) gridAnim.pause();
      if (panelAnim) panelAnim.pause();
      if (infoPanelAnim) infoPanelAnim.pause();
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-logo">Boogpunt</a>
        <ul className="nav-menu">
          <li><a href="#work"    className="nav-link is-active" data-menu="projects">Projects</a></li>
          <li><a href="#"        className="nav-link">Index</a></li>
          <li><a href="#info"    className="nav-link" data-menu="info">Info</a></li>
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
