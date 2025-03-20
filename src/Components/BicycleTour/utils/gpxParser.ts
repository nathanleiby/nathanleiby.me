import { RoutePoint } from "./routeMetrics";

/**
 * Interface for a day's route in a tour
 */
export interface DayRoute {
  name: string;
  date: Date;
  points: RoutePoint[];
}

/**
 * Interface for a complete tour
 */
export interface Tour {
  name: string;
  days: DayRoute[];
}

/**
 * Parse a GPX string and extract route points
 * @param gpxString - The GPX file content as a string
 * @returns Array of route points
 */
export function parseGpxString(gpxString: string): RoutePoint[] {
  try {
    // Create a DOM parser to parse the GPX XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxString, "text/xml");

    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Invalid XML format");
    }

    // Validate that this is a GPX document
    const gpxElement = xmlDoc.querySelector("gpx");
    if (!gpxElement) {
      throw new Error("Not a GPX document");
    }

    // Extract track points from the GPX
    const trackPoints = Array.from(xmlDoc.querySelectorAll("trkpt"));
    if (trackPoints.length === 0) {
      throw new Error("No track points found");
    }

    // Convert track points to RoutePoint objects
    return trackPoints.map((point) => {
      const lat = parseFloat(point.getAttribute("lat") || "0");
      const lng = parseFloat(point.getAttribute("lon") || "0");

      // Extract elevation if available
      const elevationElement = point.querySelector("ele");
      const elevation = elevationElement
        ? parseFloat(elevationElement.textContent || "0")
        : undefined;

      // Extract time if available
      const timeElement = point.querySelector("time");
      const time = timeElement
        ? new Date(timeElement.textContent || "")
        : undefined;

      // Extract name if available
      const nameElement = point.querySelector("name");
      const name = nameElement
        ? nameElement.textContent || undefined
        : undefined;

      return { lat, lng, elevation, time, name };
    });
  } catch (error: unknown) {
    console.error("Error parsing GPX string:", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse GPX data: ${message}`);
  }
}

/**
 * Load a GPX file from a URL and parse it
 * @param url - URL of the GPX file
 * @returns Promise resolving to an array of route points
 */
export async function loadGpxFromUrl(url: string): Promise<RoutePoint[]> {
  try {
    console.log(`Loading GPX file from ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to load GPX file: ${response.statusText}`);
    }

    const gpxString = await response.text();
    console.log(
      `Parsing GPX file (${(gpxString.length / 1024).toFixed(2)} KB)`
    );

    const points = parseGpxString(gpxString);
    console.log(`Parsed ${points.length} points from GPX file`);

    // Downsample large files more aggressively
    return downsampleRoutePoints(points, points.length > 10000 ? 500 : 1000);
  } catch (error) {
    console.error("Error loading GPX file:", error);
    throw error;
  }
}

/**
 * Load multiple GPX files to create a multi-day tour
 * @param files - Array of file objects with URL and name
 * @param tourName - Name of the tour
 * @returns Promise resolving to a Tour object
 */
export async function loadTour(
  files: { url: string; name: string }[],
  tourName: string
): Promise<Tour> {
  try {
    console.log(`Loading tour: ${tourName} with ${files.length} days`);

    // Load each day's route in parallel
    const daysPromises = files.map(async (file, index) => {
      const points = await loadGpxFromUrl(file.url);

      return {
        name: file.name,
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000), // Simulate consecutive days
        points,
      };
    });

    const days = await Promise.all(daysPromises);
    console.log(`Successfully loaded all ${days.length} days of the tour`);

    return {
      name: tourName,
      days,
    };
  } catch (error) {
    console.error("Error loading tour:", error);
    throw error;
  }
}

/**
 * Downsample route points for performance
 * @param points - Array of route points
 * @param maxPoints - Maximum number of points to keep
 * @returns Downsampled array of route points
 */
export function downsampleRoutePoints(
  points: RoutePoint[],
  maxPoints: number = 1000
): RoutePoint[] {
  if (points.length <= maxPoints) {
    console.log(`No downsampling needed (${points.length} points)`);
    return points;
  }

  console.log(`Downsampling from ${points.length} to ~${maxPoints} points`);

  // Calculate the sampling interval
  const interval = Math.ceil(points.length / maxPoints);

  // Sample points at regular intervals, but always keep first and last points
  const sampledPoints = [points[0]];

  for (let i = interval; i < points.length - 1; i += interval) {
    sampledPoints.push(points[i]);
  }

  sampledPoints.push(points[points.length - 1]);

  console.log(`Downsampled to ${sampledPoints.length} points`);
  return sampledPoints;
}

/**
 * Combine multiple day routes into a single route
 * @param days - Array of day routes
 * @returns Combined array of route points
 */
export function combineDayRoutes(days: DayRoute[]): RoutePoint[] {
  const allPoints = days.reduce((allPoints, day) => {
    return [...allPoints, ...day.points];
  }, [] as RoutePoint[]);

  console.log(
    `Combined ${days.length} days into a single route with ${allPoints.length} points`
  );

  // Downsample the combined route if it's very large
  return allPoints.length > 2000
    ? downsampleRoutePoints(allPoints, 2000)
    : allPoints;
}

/**
 * Get start and end points for each day in a tour
 * @param tour - Tour object
 * @returns Array of start and end points for each day
 */
export function getDayEndpoints(
  tour: Tour
): { start: RoutePoint; end: RoutePoint }[] {
  return tour.days.map((day) => {
    const points = day.points;
    return {
      start: points[0],
      end: points[points.length - 1],
    };
  });
}
