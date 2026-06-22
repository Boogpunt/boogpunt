"use client";

import { useEffect } from "react";
import { animate } from "animejs";

// 12 equally spaced lines, extending inward from disc circumference
// k=0 → 12 o'clock (top), k=9 → 9 o'clock (left)
const CLOCK_LINES = Array.from({ length: 12 }, (_, k) => {
  const deg = k * 30 - 90;
  const rad = (deg * Math.PI) / 180;
  const r1 = 220, r2 = 207; // inward 13 units = 20% of original 66-unit length
  return {
    x1: +(250 + r1 * Math.cos(rad)).toFixed(1),
    y1: +(250 + r1 * Math.sin(rad)).toFixed(1),
    x2: +(250 + r2 * Math.cos(rad)).toFixed(1),
    y2: +(250 + r2 * Math.sin(rad)).toFixed(1),
    isNine: k === 9,
  };
});

function DiscSVG() {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      {CLOCK_LINES.map((ln, i) => (
        <g key={i}>
          <line
            className={`clock-line${ln.isNine ? " clock-line--nine" : ""}`}
            x1={ln.x1} y1={ln.y1}
            x2={ln.x2} y2={ln.y2}
          />
          {/* wider transparent hit area for 9 o'clock line */}
          {ln.isNine && (
            <line
              className="clock-line-hit"
              x1={ln.x1} y1={ln.y1}
              x2={ln.x2} y2={ln.y2}
              stroke="transparent" strokeWidth="24"
              style={{ pointerEvents: "auto", cursor: "pointer" }}
            />
          )}
        </g>
      ))}
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
    const nav             = document.querySelector(".nav");
    const filterBar       = document.querySelector(".filter-bar");
    const introEl         = document.querySelector(".intro");
    const grid            = document.querySelector(".grid");
    const spacer          = document.querySelector(".spacer");
    const filterPanel     = document.querySelector(".filter-panel");
    const filterGrid      = document.querySelector(".filter-grid");
    const infoPanel       = document.querySelector(".info-panel");
    const projectsLink    = document.querySelector('.nav-link[data-menu="projects"]');
    const infoLink        = document.querySelector('.nav-link[data-menu="info"]');
    const navLogo         = document.querySelector(".nav-logo");
    const cards           = [...document.querySelectorAll(".grid .card")];
    const allNavLinks     = [...document.querySelectorAll(".nav-link")];
    const discEl          = document.querySelector(".intro-disc");
    const clockLines      = [...document.querySelectorAll(".clock-line")];
    const lineHit         = document.querySelector(".clock-line-hit");
    const brandingLabelEl = document.querySelector(".disc-label--branding");

    const DELAY_RATIO = 0.35;
    let gridAnim, panelAnim, infoPanelAnim;
    let panelVisible     = false;
    let infoPanelVisible = false;
    let hideTimeout, labelHideTimeout;

    function updateDiscLabelPos() {
      if (!discEl || !brandingLabelEl) return;
      const rect  = discEl.getBoundingClientRect();
      const scale = rect.width / 500;
      // 9 o'clock line ends at SVG x2 = 250 - 315 = -65, y2 = 250
      // 9 o'clock inner tip: SVG x = 250 + 207·cos(180°) = 43, y = 250
      brandingLabelEl.style.left = `${rect.left + 43 * scale + 8}px`;
      brandingLabelEl.style.top  = `${rect.top  + 250 * scale}px`;
    }

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

      updateDiscLabelPos();
    }

    function positionFilterBar() {
      const rect = projectsLink.getBoundingClientRect();
      filterBar.style.top  = `${rect.bottom + 6}px`;
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

    // 9 o'clock line → Branding label hover
    const onLineEnter = () => {
      clearTimeout(labelHideTimeout);
      clockLines.forEach(l => { if (!l.classList.contains("clock-line--nine")) l.style.opacity = "0.5"; });
      brandingLabelEl.classList.add("is-visible");
    };
    const onLineLeave = () => {
      labelHideTimeout = setTimeout(() => {
        clockLines.forEach(l => { l.style.opacity = ""; });
        brandingLabelEl.classList.remove("is-visible");
      }, 80);
    };
    const onLabelEnter = () => clearTimeout(labelHideTimeout);
    const onLabelLeave = () => {
      clockLines.forEach(l => { l.style.opacity = ""; });
      brandingLabelEl.classList.remove("is-visible");
    };
    const onLabelClick = () => {
      allNavLinks.forEach(l => l.classList.remove("is-active"));
      showFilter("all");
    };

    lineHit.addEventListener("mouseenter", onLineEnter);
    lineHit.addEventListener("mouseleave", onLineLeave);
    brandingLabelEl.addEventListener("mouseenter", onLabelEnter);
    brandingLabelEl.addEventListener("mouseleave", onLabelLeave);
    brandingLabelEl.addEventListener("click", onLabelClick);

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

    const filterGridClickHandler = (e) => {
      if (e.target.closest(".card")) {
        hideFilter();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    filterGrid.addEventListener("click", filterGridClickHandler);

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

    const navLogoClickHandler = (e) => {
      e.preventDefault();
      if (panelVisible) hideFilter();
      if (infoPanelVisible) hideInfo();
      allNavLinks.forEach((l) => l.classList.remove("is-active"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    navLogo.addEventListener("click", navLogoClickHandler);

    const navLinkHandlers = allNavLinks.filter((l) => l !== infoLink).map((link) => {
      const handler = function () {
        allNavLinks.forEach((l) => l.classList.remove("is-active"));
        this.classList.add("is-active");
      };
      link.addEventListener("click", handler);
      return { link, handler };
    });

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
      lineHit.removeEventListener("mouseenter", onLineEnter);
      lineHit.removeEventListener("mouseleave", onLineLeave);
      brandingLabelEl.removeEventListener("mouseenter", onLabelEnter);
      brandingLabelEl.removeEventListener("mouseleave", onLabelLeave);
      brandingLabelEl.removeEventListener("click", onLabelClick);
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
      clearTimeout(labelHideTimeout);
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
        <div className="intro-disc">
          <DiscSVG />
        </div>
        <div className="disc-label disc-label--branding">Branding</div>
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
