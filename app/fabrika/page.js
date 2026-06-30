import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Fabrika — Boogpunt",
  description: "Fabrika / Installation / 2026",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/Fabrika";

const IMAGES = [
  `${IK}/fabrika_0.jpg`,
  `${IK}/fabrika_1.jpg`,
  `${IK}/fabrika_2.jpg`,
  `${IK}/fabrika_3.jpg`,
  `${IK}/fabrika_4.jpg`,
];

export default function FabrikaPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Fabrika</FitTitle>
          <div className="project-header-sub">
            <span>Client. Personal Project</span>
            <span>2026</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Fabrika ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </main>
    </>
  );
}
