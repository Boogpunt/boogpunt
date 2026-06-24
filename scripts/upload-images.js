#!/usr/bin/env node
// Usage: npm run upload-images [folder-name]
// Uploads everything in images/ to ImageKit under /boogpunt/
// Optional: npm run upload-images ZIC  → only uploads images/ZIC/

const fs   = require("fs");
const path = require("path");

// Read .env.local
const envPath = path.join(__dirname, "../.env.local");
const env     = Object.fromEntries(
  fs.readFileSync(envPath, "utf-8")
    .split("\n")
    .filter(l => l.includes("="))
    .map(l => { const [k, ...v] = l.split("="); return [k.trim(), v.join("=").trim()]; })
);

const ImageKit = require("imagekit");
const ik = new ImageKit({
  publicKey:   env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey:  env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

const IMAGES_DIR    = path.join(__dirname, "../images");
const IK_BASE_FOLDER = "/boogpunt";

const filterArg = process.argv[2];

function walkDir(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files   = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walkDir(full, base));
    else if (!e.name.startsWith(".")) files.push({ full, rel: path.relative(base, full) });
  }
  return files;
}

async function upload(file) {
  const relDir    = path.dirname(file.rel);
  const ikFolder  = relDir === "." ? IK_BASE_FOLDER : `${IK_BASE_FOLDER}/${relDir}`;
  const fileName  = path.basename(file.rel);
  const fileBuffer = fs.readFileSync(file.full);

  try {
    const res = await ik.upload({
      file:             fileBuffer,
      fileName:         fileName,
      folder:           ikFolder,
      useUniqueFileName: false,
      overwriteFile:    true,
    });
    console.log(`✓  ${file.rel}  →  ${res.url}`);
  } catch (err) {
    console.error(`✗  ${file.rel}  →  ${err.message}`);
  }
}

(async () => {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error("images/ folder not found");
    process.exit(1);
  }

  let files = walkDir(IMAGES_DIR);

  if (filterArg) {
    files = files.filter(f => f.rel.startsWith(filterArg + path.sep) || f.rel.startsWith(filterArg + "/"));
    if (!files.length) { console.log(`No files found under images/${filterArg}/`); process.exit(0); }
  }

  console.log(`Uploading ${files.length} file(s)...\n`);
  for (const file of files) await upload(file);
  console.log("\nDone.");
})();
