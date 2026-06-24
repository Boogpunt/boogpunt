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
