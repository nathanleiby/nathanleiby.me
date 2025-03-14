import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to save the marker images
const outputDir = path.join(__dirname, "../public/images/bicycle-tour");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate start marker
const startMarker = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14" fill="#4CAF50" stroke="white" stroke-width="2" />
  <text x="16" y="21" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="white">S</text>
</svg>
`;

// Generate end marker
const endMarker = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14" fill="#F44336" stroke="white" stroke-width="2" />
  <text x="16" y="21" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="white">E</text>
</svg>
`;

// Generate day markers (1-10)
const generateDayMarker = (day) => `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="#2196F3" stroke="white" stroke-width="2" />
  <text x="12" y="16" font-family="Arial" font-size="${
    day > 9 ? "9" : "10"
  }" font-weight="bold" text-anchor="middle" fill="white">${day}</text>
</svg>
`;

// Save start and end markers
fs.writeFileSync(path.join(outputDir, "start-marker.svg"), startMarker.trim());
fs.writeFileSync(path.join(outputDir, "end-marker.svg"), endMarker.trim());

// Save day markers
for (let i = 1; i <= 10; i++) {
  fs.writeFileSync(
    path.join(outputDir, `day-${i}.svg`),
    generateDayMarker(i).trim()
  );
}

console.log("Marker SVGs generated successfully!");
