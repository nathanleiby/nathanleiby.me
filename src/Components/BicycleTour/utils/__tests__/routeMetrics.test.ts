import { describe, expect, it } from "vitest";
import { calculateRouteMetrics, type RoutePoint } from "../routeMetrics";

describe("routeMetrics", () => {
  const sampleRoute: RoutePoint[] = [
    { lat: 35.6762, lng: 139.6503, name: "Tokyo", elevation: 0 },
    { lat: 34.6937, lng: 135.5023, name: "Osaka", elevation: 500 },
    { lat: 35.0116, lng: 135.7681, name: "Kyoto", elevation: 300 },
    { lat: 35.6762, lng: 139.6503, name: "Tokyo", elevation: 0 },
  ];

  it("calculates route metrics correctly", () => {
    const metrics = calculateRouteMetrics(sampleRoute);

    // Distance between Tokyo and Osaka is ~400km, Osaka to Kyoto ~40km, and Kyoto back to Tokyo ~360km
    // Total should be around 800km
    expect(metrics.distanceKm).toBeCloseTo(800, -2); // Within 100km accuracy
    expect(metrics.durationHours).toBeCloseTo(metrics.distanceKm / 20, 2);
    // Only positive elevation changes are counted: 0->500 = 500, 500->300 = 0, 300->0 = 0
    expect(metrics.elevationGainMeters).toBe(500);
    expect(metrics.startPoint).toBe("Tokyo");
    expect(metrics.endPoint).toBe("Tokyo");
  });

  it("handles empty route", () => {
    const metrics = calculateRouteMetrics([]);
    expect(metrics.distanceKm).toBe(0);
    expect(metrics.durationHours).toBe(0);
    expect(metrics.elevationGainMeters).toBe(0); // No elevation gain for empty route
    expect(metrics.startPoint).toBe("N/A");
    expect(metrics.endPoint).toBe("N/A");
  });

  it("handles single point route", () => {
    const singlePoint: RoutePoint[] = [
      { lat: 35.6762, lng: 139.6503, name: "Tokyo", elevation: 100 },
    ];
    const metrics = calculateRouteMetrics(singlePoint);
    expect(metrics.distanceKm).toBe(0);
    expect(metrics.durationHours).toBe(0);
    expect(metrics.elevationGainMeters).toBe(0); // No elevation gain for single point
    expect(metrics.startPoint).toBe("Tokyo");
    expect(metrics.endPoint).toBe("Tokyo");
  });

  it("handles route points without names", () => {
    const routeWithoutNames: RoutePoint[] = [
      { lat: 35.6762, lng: 139.6503 },
      { lat: 34.6937, lng: 135.5023 },
    ];
    const metrics = calculateRouteMetrics(routeWithoutNames);
    expect(metrics.startPoint).toBe("35.6762, 139.6503");
    expect(metrics.endPoint).toBe("34.6937, 135.5023");
  });
});
