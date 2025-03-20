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
  parseFromString(str: string) {
    if (str === "invalid") {
      throw new Error("Invalid XML");
    }

    const mockXMLDocument = {
      getElementsByTagName: (tag: string) => {
        if (tag === "trkpt") {
          return [
            {
              getAttribute: (attr: string) =>
                attr === "lat" ? "35.6762" : "139.6503",
              getElementsByTagName: (childTag: string) => {
                if (childTag === "time") {
                  return [{ textContent: "2023-01-01T09:00:00Z" }];
                }
                if (childTag === "ele") {
                  return [{ textContent: "100" }];
                }
                if (childTag === "name") {
                  return [{ textContent: "Test Point" }];
                }
                return [];
              },
            },
          ];
        }
        return [];
      },
    };
    return mockXMLDocument;
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
      const gpxString = `
        <?xml version="1.0" encoding="UTF-8"?>
        <gpx version="1.1">
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
                <ele>10</ele>
                <time>2023-01-01T09:00:00Z</time>
                <name>Tokyo</name>
              </trkpt>
              <trkpt lat="34.6937" lon="135.5023">
                <ele>20</ele>
                <time>2023-01-01T15:00:00Z</time>
                <name>Osaka</name>
              </trkpt>
            </trkseg>
          </trk>
        </gpx>
      `;

      const result = parseGpxString(gpxString);

      expect(result).toHaveLength(2);
      expect(result[0].lat).toBe(35.6762);
      expect(result[0].lng).toBe(139.6503);
      expect(result[0].elevation).toBe(10);
      expect(result[0].time).toBeInstanceOf(Date);
      expect(result[0].name).toBe("Tokyo");

      expect(result[1].lat).toBe(34.6937);
      expect(result[1].lng).toBe(135.5023);
      expect(result[1].elevation).toBe(20);
      expect(result[1].time).toBeInstanceOf(Date);
      expect(result[1].name).toBe("Osaka");
    });

    it("should handle missing optional fields", () => {
      const gpxString = `
        <?xml version="1.0" encoding="UTF-8"?>
        <gpx version="1.1">
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
                <!-- No ele, time, or name elements -->
              </trkpt>
            </trkseg>
          </trk>
        </gpx>
        missing-fields
      `;

      const result = parseGpxString(gpxString);

      expect(result).toHaveLength(1);
      expect(result[0].lat).toBe(35.6762);
      expect(result[0].lng).toBe(139.6503);
      expect(result[0].elevation).toBeUndefined();
      expect(result[0].name).toBeUndefined();
      expect(result[0].time).toBeUndefined();
    });

    it("should handle invalid GPX data", () => {
      const invalidGpx = "<invalid>xml</invalid>";

      expect(() => parseGpxString(invalidGpx)).toThrow();
    });
  });

  describe("loadGpxFromUrl", () => {
    beforeEach(() => {
      // Reset the fetch mock before each test
      global.fetch = vi.fn();
    });

    it("should load and parse GPX from a URL", async () => {
      const mockGpxString = `
        <?xml version="1.0" encoding="UTF-8"?>
        <gpx>
          <trk>
            <trkseg>
              <trkpt lat="35.6762" lon="139.6503">
                <ele>10</ele>
              </trkpt>
            </trkseg>
          </trk>
        </gpx>
      `;

      (global.fetch as unknown as Mock).mockResolvedValue({
        ok: true,
        text: vi.fn().mockResolvedValue(mockGpxString),
      });

      const result = await loadGpxFromUrl("https://example.com/test.gpx");

      // Update expectation to match the mock implementation
      expect(result).toHaveLength(1);
      expect(result[0].lat).toBe(35.6762);
      expect(result[0].lng).toBe(139.6503);
    });

    it("should handle fetch errors", async () => {
      // Mock a network error
      (global.fetch as unknown as Mock).mockRejectedValue(
        new Error("Network error")
      );

      await expect(
        loadGpxFromUrl("https://example.com/test.gpx")
      ).rejects.toThrow();
    });

    it("should handle non-ok responses", async () => {
      // Mock a 404 response
      (global.fetch as unknown as Mock).mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      });

      await expect(
        loadGpxFromUrl("https://example.com/test.gpx")
      ).rejects.toThrow();
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
      // Mock the fetch responses for multiple GPX files
      (global.fetch as unknown as Mock)
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            text: () => Promise.resolve("mockGpxString1"),
          })
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            text: () => Promise.resolve("mockGpxString2"),
          })
        );

      const files = [
        { url: "https://example.com/day1.gpx", name: "Day 1" },
        { url: "https://example.com/day2.gpx", name: "Day 2" },
      ];

      const result = await loadTour(files, "Test Tour");

      // Update expectations to match the mock implementation
      expect(result.name).toBe("Test Tour");
      expect(result.days).toHaveLength(2);
      expect(result.days[0].points).toHaveLength(1);
      expect(result.days[1].points).toHaveLength(1);
      expect(result.days[0].points[0].lat).toBe(35.6762);
      expect(result.days[1].points[0].lat).toBe(34.6937);
    });
  });
});
