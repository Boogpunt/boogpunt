import NavWithFilter from "@/components/NavWithFilter";
import FitTitle from "@/components/FitTitle";
import "../globals.css";

export const metadata = {
  title: "SK enmove ZIC — Boogpunt",
  description: "SK enmove ZIC Brand Identity 2023",
};

const IK = "https://ik.imagekit.io/qoon/tr:w-1920,q-90/boogpunt";

const ZIC_IMAGES = [
  `${IK}/ZIC/ZIC_0.png`,
  `${IK}/ZIC/ZIC_1.jpg`,
  `${IK}/ZIC/ZIC_2.jpg`,
  `${IK}/ZIC/ZIC_3.gif`,
  `${IK}/ZIC/ZIC_4.png`,
  `${IK}/ZIC/ZIC_5.png`,
  `${IK}/ZIC/ZIC_6.png`,
  `${IK}/ZIC/ZIC_7.jpg`,
  `${IK}/ZIC/ZIC_8.jpg`,
  `${IK}/ZIC/ZIC_9.png`,
];

export default function ZICPage() {
  return (
    <>
      <NavWithFilter />
      <main className="project-detail">
        <header className="project-header">
          <FitTitle className="project-title">SK enmove ZIC</FitTitle>
          <div className="project-header-sub">
            <span>Client. SK enmove</span>
            <span>2023</span>
          </div>
        </header>
        {ZIC_IMAGES.map((src, i) => (
          <img
            key={i}
            className="project-detail-img"
            src={src}
            alt={`SK enmove ZIC ${i}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="project-credits">
          <span className="caption">Executive director.</span>
          <span className="caption">Changho Lee</span>

          <span className="caption">Design director.</span>
          <span className="caption">Gibaek Ryu</span>

          <span className="caption">Concept director.</span>
          <span className="caption">Byungsun Jeon</span>

          <span className="caption project-credits-multi">Concept &amp; Design.</span>
          <span className="caption">Geum jo Bae</span>
          <span className="caption">Seonyung Shin</span>
          <span className="caption">Qoon Park</span>
          <span className="caption">Taeun Uhm</span>
        </div>
      </main>
    </>
  );
}
