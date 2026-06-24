import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Invisible Memory — Boogpunt",
  description: "Invisible Memory Graphic 2025",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/InvisibleMemory";

const IMAGES = [
  `${IK}/Invisible_Memory___Precious_Thing_1.png`,
];

export default function InvisibleMemoryPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Invisible Memory</FitTitle>
          <div className="project-header-sub">
            <span>Client. Personal Project</span>
            <span>2025</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Invisible Memory ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </main>
    </>
  );
}
