import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas, loadImage } from "canvas";
import { JSDOM } from "jsdom";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory with SVG files
const svgDir = path.join(__dirname, "../public/images/bicycle-tour");

// Function to convert SVG to PNG
async function convertSvgToPng(svgPath, pngPath, width, height) {
  try {
    // Read SVG file
    const svgContent = fs.readFileSync(svgPath, "utf8");

    // Create a data URL from the SVG content
    const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(
      svgContent
    ).toString("base64")}`;

    // Create canvas with the specified dimensions
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Load the SVG image
    const img = await loadImage(svgDataUrl);

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Save the canvas as PNG
    const pngBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync(pngPath, pngBuffer);

    console.log(`Converted ${path.basename(svgPath)} to PNG`);
  } catch (error) {
    console.error(`Error converting ${svgPath} to PNG:`, error);
  }
}

// Convert all SVG files to PNG
async function convertAllSvgToPng() {
  try {
    // Get all SVG files in the directory
    const files = fs
      .readdirSync(svgDir)
      .filter((file) => file.endsWith(".svg"));

    // Convert each SVG file to PNG
    for (const file of files) {
      const svgPath = path.join(svgDir, file);
      const pngPath = path.join(svgDir, file.replace(".svg", ".png"));

      // Determine dimensions based on filename
      let width, height;
      if (file.startsWith("day-")) {
        width = height = 24;
      } else {
        width = height = 32;
      }

      await convertSvgToPng(svgPath, pngPath, width, height);
    }

    console.log("All SVG files converted to PNG successfully!");
  } catch (error) {
    console.error("Error converting SVG files to PNG:", error);
  }
}

// Run the conversion
convertAllSvgToPng();
