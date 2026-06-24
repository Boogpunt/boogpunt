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
          <div className="project-credit-entry">
            <p className="caption">Executive director.</p>
            <p className="caption">Changho Lee</p>
          </div>
          <div className="project-credit-entry">
            <p className="caption">Design director.</p>
            <p className="caption">Gibaek Ryu</p>
          </div>
          <div className="project-credit-entry">
            <p className="caption">Concept director.</p>
            <p className="caption">Byungsun Jeon</p>
          </div>
          <div className="project-credit-entry">
            <p className="caption">Concept &amp; Design.</p>
            <p className="caption">Geum jo Bae, Seonyung Shin, Qoon Park, Taeun Uhm</p>
          </div>
        </div>
      </main>
    </>
  );
}
