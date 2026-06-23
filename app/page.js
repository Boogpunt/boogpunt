"use client";

import { useEffect } from "react";
import { animate } from "animejs";

const CATEGORIES = ["Branding", "Graphic", "Installation", "Direction"];
const PX_PER_STEP = 70; // px of scroll per 30° rotation step

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

function DiscSVG() {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        {/* bgpt_pt.svg path, centered at x=0, base at y=0 (outer), tip at y=50 (inner) */}
        <path id="cat-tick" d="M14.255.23l-14.26,49.77L-14.255.23c4.73-.15,9.48-.23,14.25-.23s9.53.08,14.26.23Z" />
      </defs>
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
    </svg>
  );
}

const IK = "https://ik.imagekit.io/qoon/tr:w-1400,q-85/boogpunt";

const CATEGORY_IMAGES = {
  Branding:     { src: `${IK}/ZIC/ZIC_0.png`,                                      mode: "cover"    },
  Graphic:      { src: `${IK}/Bound_in_a_spiral_dance/bsd_t_D1SKK0lpE.jpg`,        mode: "portrait" },
  Installation: { src: `${IK}/Watching/Watching_t_Ef-caLY9R.jpg`,                  mode: "cover"    },
  Direction:    null,
};

const CARDS = [
  { category: "branding",     meta: "SK enmove ZIC / Brand Identity / 2023",       img: `${IK}/ZIC/ZIC_0.png` },
  { category: "graphic",      meta: "Kiss of Life / Brand Film / 2023",             img: `${IK}/KOF/KOF_1.png` },
  { category: "branding",     meta: "Dorosiwa / Brand Identity / 2023",            img: `${IK}/Dorosiwa/Dorosiwa_1.png` },
  { category: "direction",    meta: "Blade Typeface / Type Design / 2023",          img: `${IK}/Blade_Font/Blade_Font_1.png` },
  { category: "graphic",      meta: "Year of the Red Horse / Graphic / 2024",      img: `${IK}/Year_of_the_Red_Horse/Year_of_the_Red_Horse_1.png` },
  { category: "direction",    meta: "Broken Birds / Art Direction / 2023",          img: `${IK}/BrokenBirds/BrokenBirds_1.png` },
  { category: "installation", meta: "Break / Architecture Demolition / 2023",       img: `${IK}/Break___Architecture_Demolition/Break___Architecture_Demolition_1.jpg` },
  { category: "installation", meta: "Invisible Memory / Exhibition / 2023",         img: `${IK}/Invisible_Memory___Precious_Thing/Invisible_Memory___Precious_Thing_1.png` },
  { category: "installation", meta: "Egg Cup / Ceramic Series / 2021",              img: `${IK}/EggCup/EggCup_1.jpg` },
  { category: "direction",    meta: "Monolith NFT Display / Exhibition / 2022",     img: `${IK}/Monolith/Monolith_0.png` },
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
    const linesGroupEl    = document.querySelector(".clock-lines-group");
    const catLabelEl      = document.querySelector(".disc-label--cat");
    const hoverBgEl       = document.querySelector(".hover-bg");
    const hoverBgImg      = hoverBgEl.querySelector("img");

    // On touch devices (no hover), background auto-shows on scroll instead of mouse hover
    const useScrollBg = window.matchMedia("(hover: none)").matches;

    let panelAnim, infoPanelAnim;
    let panelVisible     = false;
    let infoPanelVisible = false;
    let hideTimeout;
    let currentStep      = -1;
    let currentCatIndex  = 0;

    function updateLabelPos() {
      if (!discEl || !catLabelEl) return;
      const rect  = discEl.getBoundingClientRect();
      const scale = rect.width / 500;
      // 9 o'clock inner tip: SVG x = 250 + 207·cos(180°) = 43, y = 250
      catLabelEl.style.left = `${rect.left + 43 * scale + 8}px`;
      catLabelEl.style.top  = `${rect.top  + 250 * scale}px`;
    }

    function setup() {
      const navBottom = nav.getBoundingClientRect().bottom + 4;
      const panelH    = window.innerHeight - navBottom;

      filterPanel.style.top    = `${navBottom}px`;
      filterPanel.style.height = `${panelH}px`;
      infoPanel.style.top      = `${navBottom}px`;
      infoPanel.style.height   = `${panelH}px`;

      if (!panelVisible)     filterPanel.style.transform = `translateY(${panelH}px)`;
      if (!infoPanelVisible) infoPanel.style.transform   = `translateY(${panelH}px)`;

      introEl.style.height = `${window.innerHeight}px`;
      // Enough scroll for multiple full rotations across all 4 categories
      spacer.style.height  = `${window.innerHeight * 5}px`;

      updateLabelPos();
    }

    function positionFilterBar() {
      const rect = projectsLink.getBoundingClientRect();
      filterBar.style.top         = `${rect.bottom + 6}px`;
      filterBar.style.left        = "0";
      filterBar.style.right       = "0";
      filterBar.style.paddingLeft = window.innerWidth <= 640 ? "13px" : `${rect.left}px`;
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

      const totalSteps = Math.floor(window.scrollY / PX_PER_STEP);
      if (totalSteps === currentStep) return;
      currentStep = totalSteps;

      // Rotate lines by 30° per step (CSS transition handles the snap animation)
      linesGroupEl.style.transform = `rotate(${totalSteps * 30}deg)`;

      // Cycle category every 3 steps (90° = one category)
      const newCatIndex = Math.floor(totalSteps / 3) % CATEGORIES.length;
      if (newCatIndex !== currentCatIndex) {
        currentCatIndex = newCatIndex;
        catLabelEl.textContent = CATEGORIES[currentCatIndex];
        if (!useScrollBg) hoverBgEl.classList.remove("is-visible");
      }

      // Show label only at the 1st stop of each 3-step group
      const isLabelStep = totalSteps % 3 === 0;
      catLabelEl.classList.toggle("is-visible", isLabelStep);

      // Mobile: auto dissolve background on label step
      if (useScrollBg) {
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

    function populateFilterGrid(category) {
      filterGrid.innerHTML = "";
      const matching =
        category === "all" ? cards : cards.filter((c) => c.dataset.category === category);
      matching.forEach((card) => filterGrid.appendChild(card.cloneNode(true)));
    }

    function showFilter(category) {
      if (infoPanelVisible) hideInfo();
      if (panelVisible) {
        // Slide current panel down, then bring new category up
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
      if (panelAnim) panelAnim.pause();
      panelAnim = animate(filterPanel, {
        translateY: filterPanel.clientHeight,
        duration: 500,
        ease: "inOutExpo",
      });
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
    }

    // Category label hover → dissolve in background image + auto-invert text on dark bg
    const onLabelEnter = () => {
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
      scrollRafId = requestAnimationFrame(() => { scrollRafId = null; onScroll(); });
    };

    const resizeHandler = () => { setup(); onScroll(); };

    setup();
    onScroll();
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", scrollHandler);
      catLabelEl.removeEventListener("mouseenter", onLabelEnter);
      catLabelEl.removeEventListener("mouseleave", onLabelLeave);
      catLabelEl.removeEventListener("click", onLabelClick);
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
        <button className="filter-btn" data-filter="all">All</button>
        <button className="filter-btn" data-filter="branding">Branding</button>
        <button className="filter-btn" data-filter="graphic">Graphic</button>
        <button className="filter-btn" data-filter="installation">Installation</button>
        <button className="filter-btn" data-filter="direction">Direction</button>
      </div>

      <div className="intro">
        <div className="hover-bg"><img alt="" /></div>
        <div className="intro-disc"><DiscSVG /></div>
        <div className="disc-label disc-label--cat">Branding</div>
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
