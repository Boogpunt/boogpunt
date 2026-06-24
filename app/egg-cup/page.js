import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Egg Cup — Boogpunt",
  description: "Egg Cup Installation 2022",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/EggCup";

const IMAGES = [
  `${IK}/EggCup_1.jpg`,
  `${IK}/EggCup_2.jpg`,
  `${IK}/EggCup_3.jpg`,
  `${IK}/EggCup_4.jpg`,
  `${IK}/EggCup_5.jpg`,
  `${IK}/EggCup_6.jpg`,
  `${IK}/EggCup_7.jpg`,
];

export default function EggCupPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Egg Cup</FitTitle>
          <div className="project-header-sub">
            <span>Client. Park&#39;s Club</span>
            <span>2022</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Egg Cup ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </main>
    </>
  );
}
