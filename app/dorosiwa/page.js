import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "Dorosiwa — Boogpunt",
  description: "Dorosiwa Brand Identity 2023",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt/Dorosiwa";
const VK = "https://ik.imagekit.io/qoon/boogpunt/Dorosiwa";

const MEDIA = [
  { video: true,  src: `${VK}/Dorosiwa_1.mp4` },
  { src: `${IK}/Dorosiwa_1.png` },
  { src: `${IK}/Dorosiwa_2.png` },
  { src: `${IK}/Dorosiwa_3.png` },
  { src: `${IK}/Dorosiwa_4.png` },
  { video: true,  src: `${VK}/Dorosiwa_5.mp4` },
  { src: `${IK}/Dorosiwa_6.png` },
  { src: `${IK}/Dorosiwa_7.png` },
  { src: `${IK}/Dorosiwa_8.png` },
  { src: `${IK}/Dorosiwa_9.png` },
  { src: `${IK}/Dorosiwa_10.png` },
  { src: `${IK}/Dorosiwa_11.png` },
  { src: `${IK}/Dorosiwa_12.png` },
  { src: `${IK}/Dorosiwa_13.png` },
];

export default function DorosiwaPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">Dorosiwa</FitTitle>
          <div className="project-header-sub">
            <span>Client. Dorosiwa</span>
            <span>2023</span>
          </div>
        </header>
        {MEDIA.map((item, i) =>
          item.video
            ? <video key={i} className="project-detail-img" src={item.src} autoPlay muted loop playsInline />
            : <img key={i} className="project-detail-img" src={item.src} alt={`Dorosiwa ${i}`} loading={i === 0 ? "eager" : "lazy"} />
        )}
        <div className="project-credits">
          <span className="caption">Direction.</span>
          <span className="caption">Hana Na</span>
          <span className="caption">Design.</span>
          <span className="caption">Qoon Park</span>
          <span className="caption">Products and videos.</span>
          <span className="caption">Dorosiwa</span>
        </div>
      </main>
    </>
  );
}
