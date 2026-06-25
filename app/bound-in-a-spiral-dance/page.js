import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Bound in a Spiral Dance — Boogpunt",
  description: "Bound in a Spiral Dance Typeface 2026",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/BoundInASpiralDance";

const IMAGES = [
  `${IK}/bsd_1.jpg`,
  `${IK}/bsd_2.jpg`,
  `${IK}/bsd_3.jpg`,
  `${IK}/bsd_4.jpg`,
  `${IK}/bsd_5.jpg`,
  `${IK}/bsd_6.jpg`,
  `${IK}/bsd_7.jpg`,
];

export default function BoundInASpiralDancePage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Bound in a Spiral Dance</FitTitle>
          <div className="project-header-sub">
            <span>Client. Anna Peasonen</span>
            <span>2026</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Bound in a Spiral Dance ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </main>
    </>
  );
}
