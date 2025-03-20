import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import {
  combineDayRoutes,
  downsampleRoutePoints,
  getDayEndpoints,
  loadGpxFromUrl,
  loadTour,
  parseGpxString,
  type DayRoute,
  type Tour,
} from "../gpxParser";
import { RoutePoint } from "../routeMetrics";

// Mock fetch for tests
global.fetch = vi.fn();

// Mock DOMParser for tests
class MockDOMParser {
  parseFromString(str: string, type: string) {
    // For invalid XML, return a document with a parsererror element
    if (str === "<invalid>xml</invalid>") {
      return {
        querySelector: (selector: string) => {
          if (selector === "parsererror") return {};
          return null;
        },
        querySelectorAll: () => [],
      };
    }

    // For valid XML, parse it and return a document with the expected structure
    const doc = {
      querySelector: (selector: string) => {
        if (selector === "gpx") return {};
        if (selector === "parsererror") return null;
        return null;
      },
      querySelectorAll: (selector: string) => {
        if (selector === "trkpt") {
          if (str.includes("<trkpt")) {
            // Parse the XML string to extract lat/lon values
            const matches = str.match(/lat="([^"]+)".*lon="([^"]+)"/);
            if (matches) {
              const [, lat, lon] = matches;
              return [
                {
                  getAttribute: (attr: string) => {
                    if (attr === "lat") return lat;
                    if (attr === "lon") return lon;
                    return null;
                  },
                  querySelector: (selector: string) => {
                    if (selector === "ele" && str.includes("<ele>")) {
                      return { textContent: "40" };
                    }
                    if (selector === "time" && str.includes("<time>")) {
                      return { textContent: "2023-01-01T00:00:00Z" };
                    }
                    if (selector === "name" && str.includes("<name>")) {
                      return { textContent: "Test Point" };
                    }
                    return null;
                  },
                },
              ];
            }
          }
          return [];
        }
        return [];
      },
    };
    return doc;
  }
}

// Replace the global DOMParser with our mock
global.DOMParser = MockDOMParser as unknown as typeof DOMParser;

describe("GPX Parser", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("parseGpxString", () => {
    it("should parse a simple GPX string", () => {
      const gpxString = `<?xml version="1.0"?>
        <gpx>
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
                <ele>40</ele>
                <time>2023-01-01T00:00:00Z</time>
                <name>Test Point</name>
              </trkpt>
            </trkseg>
          </trk>
        </gpx>`;

      const result = parseGpxString(gpxString);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        lat: 35.6762,
        lng: 139.6503,
        elevation: 40,
        time: new Date("2023-01-01T00:00:00Z"),
        name: "Test Point",
      });
    });

    it("should handle missing optional fields", () => {
      const gpxString = `<?xml version="1.0"?>
        <gpx>
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
              </trkpt>
            </trkseg>
          </trk>
        </gpx>`;

      const result = parseGpxString(gpxString);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        lat: 35.6762,
        lng: 139.6503,
        elevation: undefined,
        time: undefined,
        name: undefined,
      });
    });

    it("should handle invalid GPX data", () => {
      const invalidGpx = "<invalid>xml</invalid>";
      expect(() => parseGpxString(invalidGpx)).toThrow(
        "Failed to parse GPX data: Invalid XML format"
      );
    });
  });

  describe("loadGpxFromUrl", () => {
    beforeEach(() => {
      // Reset the fetch mock before each test
      global.fetch = vi.fn();
    });

    it("should load and parse GPX from a URL", async () => {
      const mockGpxString = `<?xml version="1.0"?>
        <gpx>
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
                <ele>40</ele>
                <time>2023-01-01T00:00:00Z</time>
              </trkpt>
            </trkseg>
          </trk>
        </gpx>`;

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockGpxString),
      }) as Mock;

      const result = await loadGpxFromUrl("https://example.com/test.gpx");
      expect(result).toHaveLength(1);
      expect(result[0].lat).toBe(35.6762);
      expect(result[0].lng).toBe(139.6503);
    });

    it("should handle fetch errors", async () => {
      global.fetch = vi
        .fn()
        .mockRejectedValue(new Error("Network error")) as Mock;

      await expect(
        loadGpxFromUrl("https://example.com/test.gpx")
      ).rejects.toThrow("Network error");
    });

    it("should handle non-ok responses", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      }) as Mock;

      await expect(
        loadGpxFromUrl("https://example.com/test.gpx")
      ).rejects.toThrow("Failed to load GPX file: Not Found");
    });
  });

  describe("downsampleRoutePoints", () => {
    it("should downsample a large array of points", () => {
      const points: RoutePoint[] = Array.from({ length: 2000 }, (_, i) => ({
        lat: i * 0.001,
        lng: i * 0.002,
      }));

      const result = downsampleRoutePoints(points, 100);

      // Should have approximately 100 points
      expect(result.length).toBeLessThanOrEqual(100 + 2); // +2 for first and last points

      // Should always include first and last points
      expect(result[0]).toEqual(points[0]);
      expect(result[result.length - 1]).toEqual(points[points.length - 1]);
    });

    it("should not downsample if points are fewer than maxPoints", () => {
      const points: RoutePoint[] = Array.from({ length: 50 }, (_, i) => ({
        lat: i * 0.1,
        lng: i * 0.2,
      }));

      const result = downsampleRoutePoints(points, 100);

      // Should return the original array
      expect(result).toEqual(points);
      expect(result.length).toBe(50);
    });
  });

  describe("combineDayRoutes", () => {
    it("should combine multiple day routes into a single route", () => {
      const days: DayRoute[] = [
        {
          name: "Day 1",
          date: new Date("2023-01-01"),
          points: [
            { lat: 35.6762, lng: 139.6503 },
            { lat: 35.7, lng: 139.7 },
          ],
        },
        {
          name: "Day 2",
          date: new Date("2023-01-02"),
          points: [
            { lat: 35.7, lng: 139.7 },
            { lat: 35.8, lng: 139.8 },
          ],
        },
      ];

      const result = combineDayRoutes(days);

      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ lat: 35.6762, lng: 139.6503 });
      expect(result[3]).toEqual({ lat: 35.8, lng: 139.8 });
    });

    it("should handle empty days array", () => {
      const result = combineDayRoutes([]);
      expect(result).toEqual([]);
    });
  });

  describe("getDayEndpoints", () => {
    it("should get start and end points for each day", () => {
      const tour: Tour = {
        name: "Test Tour",
        days: [
          {
            name: "Day 1",
            date: new Date("2023-01-01"),
            points: [
              { lat: 35.6762, lng: 139.6503 },
              { lat: 35.7, lng: 139.7 },
            ],
          },
          {
            name: "Day 2",
            date: new Date("2023-01-02"),
            points: [
              { lat: 35.7, lng: 139.7 },
              { lat: 35.8, lng: 139.8 },
            ],
          },
        ],
      };

      const result = getDayEndpoints(tour);

      expect(result).toHaveLength(2);
      expect(result[0].start).toEqual({ lat: 35.6762, lng: 139.6503 });
      expect(result[0].end).toEqual({ lat: 35.7, lng: 139.7 });
      expect(result[1].start).toEqual({ lat: 35.7, lng: 139.7 });
      expect(result[1].end).toEqual({ lat: 35.8, lng: 139.8 });
    });
  });

  describe("loadTour", () => {
    it("should load multiple GPX files to create a tour", async () => {
      const mockGpxData = [
        `<?xml version="1.0"?>
        <gpx>
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
                <ele>40</ele>
                <time>2023-01-01T00:00:00Z</time>
              </trkpt>
            </trkseg>
          </trk>
        </gpx>`,
        `<?xml version="1.0"?>
        <gpx>
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
                <ele>40</ele>
                <time>2023-01-02T00:00:00Z</time>
              </trkpt>
            </trkseg>
          </trk>
        </gpx>`,
      ];

      // Mock fetch responses
      global.fetch = vi.fn().mockImplementation((url: string) => {
        const index = url === "https://example.com/day1.gpx" ? 0 : 1;
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(mockGpxData[index]),
        });
      }) as Mock;

      const result = await loadTour(
        [
          { url: "https://example.com/day1.gpx", name: "Day 1: Tokyo" },
          { url: "https://example.com/day2.gpx", name: "Day 2: Tokyo" },
        ],
        "Test Tour"
      );

      expect(result.name).toBe("Test Tour");
      expect(result.days).toHaveLength(2);
      expect(result.days[0].points).toHaveLength(1);
      expect(result.days[1].points).toHaveLength(1);
      expect(result.days[0].points[0].lat).toBe(35.6762);
      expect(result.days[1].points[0].lat).toBe(35.6762);
    });
  });
});
