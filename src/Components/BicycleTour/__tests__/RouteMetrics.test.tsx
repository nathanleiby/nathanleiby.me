import { describe, expect, it } from "vitest";
import { RouteMetrics } from "../RouteMetrics";
import { render, screen } from "./test-utils";

describe("RouteMetrics", () => {
  const sampleMetrics = {
    distanceKm: 800,
    durationHours: 40,
    elevationGainMeters: 1200,
    startPoint: "Tokyo",
    endPoint: "Tokyo",
  };

  it("renders all metrics correctly", () => {
    render(<RouteMetrics metrics={sampleMetrics} />);

    // Check if all metrics are displayed
    expect(screen.getByText(/800.0 km/)).toBeInTheDocument();
    expect(screen.getByText(/40.0 hours/)).toBeInTheDocument();
    expect(screen.getByText(/1200 m/)).toBeInTheDocument();
    expect(screen.getByText(/Tokyo → Tokyo/)).toBeInTheDocument();
  });

  it("handles zero values appropriately", () => {
    const zeroMetrics = {
      distanceKm: 0,
      durationHours: 0,
      elevationGainMeters: 0,
      startPoint: "N/A",
      endPoint: "N/A",
    };

    render(<RouteMetrics metrics={zeroMetrics} />);

    expect(screen.getByText(/0.0 km/)).toBeInTheDocument();
    expect(screen.getByText(/0.0 hours/)).toBeInTheDocument();
    expect(screen.getByText(/0 m/)).toBeInTheDocument();
    expect(screen.getByText(/N\/A → N\/A/)).toBeInTheDocument();
  });
});
