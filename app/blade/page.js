import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Blade — Boogpunt",
  description: "Blade Typeface 2026",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/Blade";

const IMAGES = [
  `${IK}/Blade_1.jpg`,
  `${IK}/Blade_2.jpg`,
  `${IK}/Blade_3.jpg`,
];

export default function BladePage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Blade </FitTitle>
          <div className="project-header-sub">
            <span>Client. Personal Project</span>
            <span>2026</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Blade ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </main>
    </>
  );
}
