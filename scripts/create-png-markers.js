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

// Create start marker (green circle with 'S')
function createStartMarker() {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext("2d");

  // Draw green circle
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fillStyle = "#4CAF50";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.stroke();

  // Draw 'S' text
  ctx.font = "bold 14px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("S", 16, 16);

  // Save as PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(outputDir, "start-marker.png"), buffer);
  console.log("Created start marker");
}

// Create end marker (red circle with 'E')
function createEndMarker() {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext("2d");

  // Draw red circle
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fillStyle = "#F44336";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.stroke();

  // Draw 'E' text
  ctx.font = "bold 14px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("E", 16, 16);

  // Save as PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(outputDir, "end-marker.png"), buffer);
  console.log("Created end marker");
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
    // Create start and end markers
    createStartMarker();
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
