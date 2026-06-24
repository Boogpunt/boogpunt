import NavWithFilter from "@/components/NavWithFilter";
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
          <h1 className="project-title">SK enmove ZIC</h1>
          <div className="project-credits-row">
            <div>
              <p>Client. SK enmove</p>
              <p>2023</p>
            </div>
            <div>
              <p>Executive director. Changho Lee</p>
              <p>Design director. Gibaek Ryu</p>
              <p>Concept director. Byungsun Jeon</p>
            </div>
            <div>
              <p>Concept &amp; Design. Geum jo Bae</p>
              <p>Seonyung Shin</p>
              <p>Qoon Park</p>
              <p>Taeun Uhm</p>
            </div>
            <div />
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
      </main>
    </>
  );
}
