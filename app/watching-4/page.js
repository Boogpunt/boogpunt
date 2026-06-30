import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Who are you, When no one is watching 4 — Boogpunt",
  description: "Who are you, When no one is watching 4 / Graphic / 2026",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/FortuneOrigami";

const IMAGES = [
  `${IK}/fo_0.gif`,
  `${IK}/fo_1.png`,
  `${IK}/fo_2.png`,
];

export default function Watching4Page() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Who are you, When no one is watching 4</FitTitle>
          <div className="project-header-sub">
            <span>Client. Personal Project</span>
            <span>2026</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Who are you when no one is watching 4 — ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </main>
    </>
  );
}
