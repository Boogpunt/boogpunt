"use client";
import { useEffect } from "react";
import { animate } from "animejs";
import { CARDS } from "@/lib/data";

export default function NavWithFilter() {
  useEffect(() => {
    const nav          = document.querySelector(".nav");
    const navToggle    = document.querySelector(".nav-toggle");
    const filterBar    = document.querySelector(".filter-bar");
    const filterPanel  = document.querySelector(".filter-panel");
    const filterGrid   = document.querySelector(".filter-grid");
    const projectsLink = document.querySelector('.nav-link[data-menu="works"]');
    if (!nav || !filterBar || !filterPanel || !projectsLink) return;

    const isMobile    = window.matchMedia("(hover: none)").matches;
    const allNavLinks = [...document.querySelectorAll(".nav-link")];

    let panelAnim    = null;
    let panelVisible = false;

    function updatePanelTops() {
      const navB     = nav.getBoundingClientRect().bottom;
      const panelTop = filterBar.classList.contains("is-visible")
        ? navB + filterBar.getBoundingClientRect().height + 4
        : navB;
      const panelH = window.innerHeight - panelTop;
      filterPanel.style.top    = `${panelTop}px`;
      filterPanel.style.height = `${panelH}px`;
    }

    function positionFilterBar() {
      const rect = projectsLink.getBoundingClientRect();
      filterBar.style.top         = `${nav.getBoundingClientRect().bottom}px`;
      filterBar.style.left        = "0";
      filterBar.style.right       = "0";
      filterBar.style.paddingLeft = isMobile ? "13px" : `${rect.left}px`;
    }

    const spacer = document.querySelector(".filter-bar-spacer");

    function hideFilterBar() {
      filterBar.classList.remove("is-visible");
      if (spacer) spacer.style.height = "0";
      updatePanelTops();
    }

    function showFilterBar() {
      positionFilterBar();
      filterBar.classList.add("is-visible");
      if (spacer) spacer.style.height = `${filterBar.getBoundingClientRect().height}px`;
      updatePanelTops();
    }

    const cardEls = CARDS.map((c) => {
      const el = document.createElement("article");
      el.className = "card";
      el.dataset.category = c.category;
      if (c.slug) el.dataset.slug = c.slug;
      el.innerHTML = `<img class="card-img" src="${c.img}" alt="${c.meta}" loading="lazy" /><p class="card-meta">${c.meta}</p>`;
      return el;
    });

    function populateFilterGrid(category) {
      filterGrid.innerHTML = "";
      const matching = category === "all" ? cardEls : cardEls.filter(el => el.dataset.category === category);
      matching.forEach(el => filterGrid.appendChild(el.cloneNode(true)));
    }

    function showFilter(category) {
      nav.style.background = "#ffffff";
      if (isMobile) { nav.classList.remove("is-open"); nav.classList.remove("in-filter-mode"); hideFilterBar(); }
      document.body.style.overflow = "hidden";
      updatePanelTops();
      if (!panelVisible) filterPanel.style.transform = `translateY(${window.innerHeight}px)`;
      if (panelVisible) {
        if (panelAnim) panelAnim.pause();
        panelAnim = animate(filterPanel, {
          translateY: filterPanel.clientHeight,
          duration: 350, ease: "inExpo",
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
      nav.style.background = "";
      document.body.style.overflow = "";
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));
      if (isMobile) hideFilterBar();
      if (panelAnim) panelAnim.pause();
      panelAnim = animate(filterPanel, { translateY: window.innerHeight, duration: 500, ease: "inOutExpo" });
    }

    const filterGridClickHandler = (e) => {
      const card = e.target.closest(".card");
      if (card) {
        const slug = card.dataset.slug;
        hideFilter();
        if (slug) window.location.href = `/${slug}`;
      }
    };
    filterGrid.addEventListener("click", filterGridClickHandler);

    const filterBtns = [...document.querySelectorAll(".filter-btn")];
    const filterBtnHandlers = filterBtns.map(btn => {
      const handler = function () {
        const wasActive = this.classList.contains("is-active") && panelVisible;
        filterBtns.forEach(b => b.classList.remove("is-active"));
        if (wasActive) hideFilter();
        else { this.classList.add("is-active"); showFilter(this.dataset.filter); }
      };
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    let worksEnterH = null, worksLeaveH = null, fbEnterH = null, fbLeaveH = null;
    if (!isMobile) {
      let hideTimer = null;
      const cancelHide  = () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } };
      const scheduleHide = () => { cancelHide(); hideTimer = setTimeout(hideFilterBar, 200); };
      worksEnterH = () => { cancelHide(); allNavLinks.forEach(l => l.classList.remove("is-active")); projectsLink.classList.add("is-active"); showFilterBar(); };
      worksLeaveH = scheduleHide;
      fbEnterH    = cancelHide;
      fbLeaveH    = scheduleHide;
      projectsLink.addEventListener("mouseenter", worksEnterH);
      projectsLink.addEventListener("mouseleave", worksLeaveH);
      filterBar.addEventListener("mouseenter", fbEnterH);
      filterBar.addEventListener("mouseleave", fbLeaveH);
    }

    const mobileWorksH = isMobile ? (e) => { e.preventDefault(); nav.classList.add("in-filter-mode"); } : null;
    if (mobileWorksH) projectsLink.addEventListener("click", mobileWorksH);

    const navFilterBtns = [...document.querySelectorAll(".nav-filter-btn")];
    const navFilterBtnHandlers = isMobile ? navFilterBtns.map(btn => {
      const handler = () => { nav.classList.remove("is-open"); nav.classList.remove("in-filter-mode"); showFilter(btn.dataset.filter); };
      btn.addEventListener("click", handler);
      return { btn, handler };
    }) : [];

    const navToggleH = navToggle ? () => {
      const isOpen = nav.classList.toggle("is-open");
      if (!isOpen) { hideFilterBar(); nav.classList.remove("in-filter-mode"); }
    } : null;
    if (navToggleH) navToggle.addEventListener("click", navToggleH);

    const resizeH = () => updatePanelTops();
    window.addEventListener("resize", resizeH);

    updatePanelTops();
    filterPanel.style.transform = `translateY(${window.innerHeight}px)`;

    return () => {
      document.body.style.overflow = "";
      if (!isMobile) {
        if (worksEnterH) projectsLink.removeEventListener("mouseenter", worksEnterH);
        if (worksLeaveH) projectsLink.removeEventListener("mouseleave", worksLeaveH);
        if (fbEnterH)    filterBar.removeEventListener("mouseenter", fbEnterH);
        if (fbLeaveH)    filterBar.removeEventListener("mouseleave", fbLeaveH);
      }
      filterBtnHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      filterGrid.removeEventListener("click", filterGridClickHandler);
      if (mobileWorksH) projectsLink.removeEventListener("click", mobileWorksH);
      navFilterBtnHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
      if (navToggleH && navToggle) navToggle.removeEventListener("click", navToggleH);
      window.removeEventListener("resize", resizeH);
      if (panelAnim) panelAnim.pause();
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-row">
          <a href="/" className="nav-logo" onClick={() => sessionStorage.removeItem("filterCategory")}>Boogpunt</a>
          <button className="nav-toggle" aria-label="Menu"><span className="nav-toggle-icon">+</span></button>
        </div>
        <ul className="nav-menu">
          <li className="nav-main-item"><a href="/" className="nav-link is-active" data-menu="works">Works</a></li>
          <li className="nav-main-item"><a href="/" className="nav-link">Index</a></li>
          <li className="nav-main-item"><a href="/" className="nav-link" data-menu="about">About</a></li>
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

      <div className="filter-panel">
        <div className="filter-grid"></div>
      </div>

      <div className="filter-bar-spacer" />
    </>
  );
}
