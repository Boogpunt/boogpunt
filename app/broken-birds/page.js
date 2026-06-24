import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Broken Birds — Boogpunt",
  description: "Broken Birds Graphic 2023",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/BrokenBirds";

const IMAGES = [
  `${IK}/BrokenBirds_1.png`,
  `${IK}/BrokenBirds_2.jpg`,
  `${IK}/BrokenBirds_3.jpg`,
  `${IK}/BrokenBirds_4.jpg`,
  `${IK}/BrokenBirds_5.jpg`,
];

export default function BrokenBirdsPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Broken Birds</FitTitle>
          <div className="project-header-sub">
            <span>Client. Rainbow Cube</span>
            <span>2023</span>
          </div>
        </header>
        {IMAGES.map((src, i) => (
          <img key={i} className="project-detail-img" src={src} alt={`Broken Birds ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <div className="project-credits">
          <span className="caption">Photo.</span>
          <span className="caption">i_bomyeoreum</span>
        </div>
      </main>
    </>
  );
}
