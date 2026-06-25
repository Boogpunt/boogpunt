import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Kiss of Life Film Logo — Boogpunt",
  description: "Kiss of Life Film Logo Typeface 2023",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/KissOfLife";

const IMAGES = [
  `${IK}/KOF_1.png`,
  `${IK}/KOF_2.jpg`,
];

export default function KissOfLifePage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Kiss of Life Film Logo</FitTitle>
          <div className="project-header-sub">
            <span>Client. S2 Entertainment</span>
            <span>2023</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Kiss of Life ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <div className="project-video">
          <iframe
            src="https://www.youtube.com/embed/i3lqCquDMJY?si=UHCJ_4hBhmdgVpUZ&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="project-credits">
          <span className="caption">Design.</span>
          <span className="caption">Doyeon Kim, Qoon Park</span>
          <span className="caption">Film and Production.</span>
          <span className="caption">S2 Entertainments</span>
        </div>
      </main>
    </>
  );
}
