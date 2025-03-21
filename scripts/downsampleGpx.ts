import { DOMParser } from "@xmldom/xmldom";
import fs from "fs";
import path from "path";
import { downsampleRoutePoints } from "../src/Components/BicycleTour/utils/gpxParser";
import type { RoutePoint } from "../src/Components/BicycleTour/utils/routeMetrics";

const TOURS_DIR = path.join(process.cwd(), "data", "tours");
const PUBLIC_DIR = path.join(process.cwd(), "public", "data", "gpx");

// Ensure the output directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Parse GPX string using xmldom
function parseGpxString(gpxString: string): RoutePoint[] {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxString, "text/xml");

    // Check for parsing errors (xmldom doesn't create parsererror elements)
    if (!xmlDoc.documentElement) {
      throw new Error("Invalid XML format");
    }

    // Validate that this is a GPX document
    const gpxElement = xmlDoc.getElementsByTagName("gpx")[0];
    if (!gpxElement) {
      throw new Error("Not a GPX document");
    }

    // Extract track points from the GPX
    const trackPoints = xmlDoc.getElementsByTagName("trkpt");
    if (trackPoints.length === 0) {
      throw new Error("No track points found");
    }

    // Convert track points to RoutePoint objects
    const points: RoutePoint[] = [];
    for (let i = 0; i < trackPoints.length; i++) {
      const point = trackPoints[i];
      const lat = parseFloat(point.getAttribute("lat") || "0");
      const lng = parseFloat(point.getAttribute("lon") || "0");

      // Extract elevation if available
      const elevationElement = point.getElementsByTagName("ele")[0];
      const elevation = elevationElement
        ? parseFloat(elevationElement.textContent || "0")
        : undefined;

      // Extract time if available
      const timeElement = point.getElementsByTagName("time")[0];
      const time = timeElement
        ? new Date(timeElement.textContent || "")
        : undefined;

      // Extract name if available
      const nameElement = point.getElementsByTagName("name")[0];
      const name = nameElement
        ? nameElement.textContent || undefined
        : undefined;

      points.push({ lat, lng, elevation, time, name });
    }

    return points;
  } catch (error: unknown) {
    console.error("Error parsing GPX string:", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse GPX data: ${message}`);
  }
}

// Process a single GPX file
async function processGpxFile(sourcePath: string, targetPath: string) {
  console.log(`Processing ${sourcePath}`);

  // Read the GPX file
  const gpxString = fs.readFileSync(sourcePath, "utf-8");

  // Parse and downsample the route
  const points = parseGpxString(gpxString);
  const downsampledPoints = downsampleRoutePoints(
    points,
    points.length > 10000 ? 500 : 1000
  );

  // Convert back to GPX format
  const downsampledGpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1">
  <trk>
    <trkseg>
      ${downsampledPoints
        .map(
          (point) => `
      <trkpt lat="${point.lat}" lon="${point.lng}">
        ${point.elevation ? `<ele>${point.elevation}</ele>` : ""}
        ${point.time ? `<time>${point.time.toISOString()}</time>` : ""}
        ${point.name ? `<name>${point.name}</name>` : ""}
      </trkpt>`
        )
        .join("")}
    </trkseg>
  </trk>
</gpx>`;

  // Write the downsampled GPX file
  fs.writeFileSync(targetPath, downsampledGpx);

  console.log(`Wrote downsampled file to ${targetPath}`);
  console.log(
    `Original points: ${points.length}, Downsampled points: ${downsampledPoints.length}`
  );
}

// Process all GPX files in the tours directory
async function processAllGpxFiles() {
  // Process each tour directory
  const tours = fs
    .readdirSync(TOURS_DIR)
    .filter((item) => fs.statSync(path.join(TOURS_DIR, item)).isDirectory());

  for (const tour of tours) {
    const tourGpxDir = path.join(TOURS_DIR, tour, "gpx");
    const targetTourDir = path.join(PUBLIC_DIR, tour);

    // Skip if tour doesn't have a gpx directory
    if (!fs.existsSync(tourGpxDir)) continue;

    // Create target directory
    if (!fs.existsSync(targetTourDir)) {
      fs.mkdirSync(targetTourDir, { recursive: true });
    }

    // Process each GPX file in the tour
    const gpxFiles = fs
      .readdirSync(tourGpxDir)
      .filter((file) => file.toLowerCase().endsWith(".gpx"));

    for (const file of gpxFiles) {
      const sourcePath = path.join(tourGpxDir, file);
      const targetPath = path.join(targetTourDir, file);
      await processGpxFile(sourcePath, targetPath);
    }
  }
}

// Run the script
processAllGpxFiles().catch((error) => {
  console.error("Error processing GPX files:", error);
  process.exit(1);
});
