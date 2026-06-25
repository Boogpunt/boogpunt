import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Break — Boogpunt",
  description: "Break Graphic 2024",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/Break";

const IMAGES = [
  `${IK}/Break___Architecture_Demolition_1.jpg`,
];

export default function BreakPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">{"Break "}</FitTitle>
          <div className="project-header-sub">
            <span>Client. Personal Project</span>
            <span>2024</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Break ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </main>
    </>
  );
}
