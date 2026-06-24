import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Who are you, When no one is watching 1 — Boogpunt",
  description: "Who are you, When no one is watching 1 Graphic 2026",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/Watching";

const IMAGES = [
  `${IK}/Watching_t.jpg`,
];

export default function WatchingPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Who are you, When no one is watching 1</FitTitle>
          <div className="project-header-sub">
            <span>Client. Personal Project</span>
            <span>2026</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Who are you, When no one is watching 1 ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <div className="project-credits">
          <span className="caption">Natural Matters Lab.</span>
          <span className="caption">Maria Lee</span>
        </div>
      </main>
    </>
  );
}
