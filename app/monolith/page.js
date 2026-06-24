import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Monolith — Boogpunt",
  description: "Monolith Installation 2022",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/Monolith";

const IMAGES = [
  `${IK}/Monolith_0.png`,
  `${IK}/Monolith_1.jpg`,
  `${IK}/Monolith_2.jpg`,
  `${IK}/Monolith_3.jpg`,
  `${IK}/Monolith_4.jpg`,
];

export default function MonolithPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Monolith</FitTitle>
          <div className="project-header-sub">
            <span>Client. Personal Project</span>
            <span>2022</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Monolith ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <div className="project-credits">
          <span className="caption">Model.</span>
          <span className="caption">harim Lee</span>
        </div>
      </main>
    </>
  );
}
