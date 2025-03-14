import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "canvas";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to save the marker images
const outputDir = path.join(__dirname, "../public/images/bicycle-tour");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create end marker (checkered flag)
function createEndMarker() {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext("2d");

  // Draw white background circle
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#333333";
  ctx.stroke();

  // Draw checkered flag pattern
  const squareSize = 4;
  const startX = 8;
  const startY = 8;
  const flagSize = 16;

  for (let y = 0; y < flagSize / squareSize; y++) {
    for (let x = 0; x < flagSize / squareSize; x++) {
      if ((x + y) % 2 === 0) {
        ctx.fillStyle = "#000000";
      } else {
        ctx.fillStyle = "#FFFFFF";
      }
      ctx.fillRect(
        startX + x * squareSize,
        startY + y * squareSize,
        squareSize,
        squareSize
      );
    }
  }

  // Save as PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(outputDir, "end-marker.png"), buffer);
  console.log("Created end marker (checkered flag)");
}

// Create day markers (blue circles with day numbers)
function createDayMarker(day) {
  const canvas = createCanvas(24, 24);
  const ctx = canvas.getContext("2d");

  // Draw blue circle
  ctx.beginPath();
  ctx.arc(12, 12, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#2196F3";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.stroke();

  // Draw day number
  ctx.font = `bold ${day > 9 ? 9 : 10}px Arial`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(day.toString(), 12, 12);

  // Save as PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(outputDir, `day-${day}.png`), buffer);
  console.log(`Created day ${day} marker`);
}

// Create all markers
async function createAllMarkers() {
  try {
    // Create end marker (checkered flag)
    createEndMarker();

    // Create day markers (1-10)
    for (let i = 1; i <= 10; i++) {
      createDayMarker(i);
    }

    console.log("All marker images created successfully!");
  } catch (error) {
    console.error("Error creating marker images:", error);
  }
}

// Run the creation process
createAllMarkers();
