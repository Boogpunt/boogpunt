export const IK = "https://ik.imagekit.io/qoon/tr:w-1400,q-85/boogpunt";

export const CARDS = [
  { categories: ["graphic"],                  meta: "Who are you, When no one is watching 4 / Graphic / 2026",    img: `${IK}/FortuneOrigami/fo_t.png`,                                              slug: "watching-4" },
  { categories: ["installation"],             meta: "Who are you, When no one is watching 2 / Installation / 2026", img: `${IK}/Minkowski/Minkowski_0.jpg`,                                          slug: "minkowski" },
  { categories: ["graphic", "installation"],  meta: "Who are you, When no one is watching 1 / Graphic / 2026",    img: `${IK}/Watching/Watching_t.jpg`,                                              slug: "watching" },
  { categories: ["typeface", "graphic"],      meta: "Bound in a Spiral Dance / Typeface / 2026",                  img: `${IK}/BoundInASpiralDance/bsd_t.jpg`,                                        slug: "bound-in-a-spiral-dance" },
  { categories: ["installation"],             meta: "Fabrika / Installation / 2026",                              img: `${IK}/Fabrika/fabrika_t.jpg`,                                                slug: "fabrika" },
  { categories: ["typeface"],                 meta: "Blade / Typeface / 2026",                                    img: `${IK}/Blade/Blade_t.jpg`,                                                    slug: "blade" },
  { categories: ["branding"],                 meta: "SK enmove ZIC / Brand Identity / 2023",                      img: `${IK}/ZIC/ZIC_0.png`,                                                        slug: "zic" },
  { categories: ["typeface"],                 meta: "Kiss of Life Film Logo / Typeface / 2023",                   img: `${IK}/KissOfLife/KOF_t.png`,                                                 slug: "kiss-of-life" },
  { categories: ["graphic"],                  meta: "Runaway / Graphic / 2026",                                   img: `${IK}/Runaway/Runaway_t.jpg`,                                                slug: "runaway" },
  { categories: ["graphic"],                  meta: "Eyelight / Graphic / 2026",                                  img: `${IK}/Eyelight/Eyelight_t.jpg`,                                              slug: "eyelight" },
  { categories: ["graphic"],                  meta: "Break / Graphic / 2024",                                     img: `${IK}/Break/Break___Architecture_Demolition_1.jpg`,                          slug: "break" },
  { categories: ["branding"],                 meta: "Dorosiwa / Branding / 2023",                                 img: `${IK}/Dorosiwa/Dorosiwa_1.png`,                                              slug: "dorosiwa" },
  { categories: ["installation"],             meta: "Egg Cup / Installation / 2022",                              img: `${IK}/EggCup/EggCup_1.jpg`,                                                  slug: "egg-cup" },
  { categories: ["installation"],             meta: "Monolith / Installation / 2022",                             img: `${IK}/Monolith/Monolith_0.jpg`,                                              slug: "monolith" },
  { categories: ["graphic"],                  meta: "Broken Birds / Graphic / 2023",                              img: `${IK}/BrokenBirds/BrokenBirds_1.png`,                                        slug: "broken-birds" },
  { categories: ["graphic"],                  meta: "Invisible Memory / Graphic / 2025",                          img: `${IK}/InvisibleMemory/Invisible_Memory___Precious_Thing_t.jpg`,               slug: "invisible-memory" },
];

export const INDEX_LINES = [
  "Who are you when no one is watching 4 | Who are you when no one is watching 2 | Who are you when no one is watching 1 | Ghent bookfair | Outland publishing book fair | Bounding in a spiral dance | Korea cultural centre UK | Gaeun Lee symbol | Socialed credentials",
  "Fabrika for across RCA | Yunseok Jang web | Blade typeface | Como clinic | Alice monde wedding | Hanel hair salon | Leadvault luggage | Xray 21 radiology | Josun hotel and resort",
  "The miraculous flight | SK enmove ZIC | Powerplants dialogue 01 | Kiss of Life logotype | 1ha web and motion | Brooklyn museum appearal | Runaway | Eyelight | Break",
  "Dorosiwa | Mother offline | Egg cup ceramics | Park's club popup store | Monolith NFT display | Broken Birds | Invisible Memory",
];

export const ALL_INDEX_ITEMS = INDEX_LINES.flatMap(line => line.split(" | "));
