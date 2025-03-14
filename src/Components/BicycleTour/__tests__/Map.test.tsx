import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Map } from "../Map";

// Mock leaflet to avoid DOM manipulation in tests
vi.mock("leaflet", () => ({
  default: {
    Icon: {
      Default: {
        prototype: {
          _getIconUrl: vi.fn(),
        },
        mergeOptions: vi.fn(),
      },
    },
  },
}));

// Mock react-leaflet components
vi.mock("react-leaflet", () => ({
  MapContainer: ({
    children,
    center,
    zoom,
  }: {
    children: React.ReactNode;
    center: [number, number];
    zoom: number;
  }) => (
    <div
      data-testid="map-container"
      data-center={JSON.stringify(center)}
      data-zoom={zoom}
    >
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Polyline: ({ positions }: { positions: [number, number][] }) => (
    <div data-testid="polyline" data-positions={JSON.stringify(positions)} />
  ),
}));

describe("Map", () => {
  const sampleRoute = [
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: 34.6937, lng: 135.5023 }, // Osaka
  ];

  it("renders map container with auto-calculated center", () => {
    render(<Map route={sampleRoute} />);
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();

    // Check that center is calculated as average of route points
    const centerAttr = mapContainer.getAttribute("data-center");
    expect(centerAttr).not.toBeNull();

    if (centerAttr) {
      const center = JSON.parse(centerAttr);
      // Expected center: average of Tokyo and Osaka coordinates
      const expectedLat = (35.6762 + 34.6937) / 2;
      const expectedLng = (139.6503 + 135.5023) / 2;

      expect(center[0]).toBeCloseTo(expectedLat, 4);
      expect(center[1]).toBeCloseTo(expectedLng, 4);
    }
  });

  it("renders tile layer", () => {
    render(<Map route={sampleRoute} />);
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
  });

  it("renders route polyline with correct positions", () => {
    render(<Map route={sampleRoute} />);
    const polyline = screen.getByTestId("polyline");
    expect(polyline).toBeInTheDocument();

    const positionsAttr = polyline.getAttribute("data-positions");
    expect(positionsAttr).not.toBeNull();

    if (positionsAttr) {
      const positions = JSON.parse(positionsAttr);
      expect(positions).toHaveLength(2);
      expect(positions[0][0]).toBeCloseTo(35.6762);
      expect(positions[0][1]).toBeCloseTo(139.6503);
      expect(positions[1][0]).toBeCloseTo(34.6937);
      expect(positions[1][1]).toBeCloseTo(135.5023);
    }
  });

  it("accepts and prioritizes custom center and zoom props", () => {
    const customCenter: [number, number] = [35.0116, 135.7681]; // Kyoto
    const customZoom = 12;
    render(<Map route={sampleRoute} center={customCenter} zoom={customZoom} />);

    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();

    const centerAttr = mapContainer.getAttribute("data-center");
    const zoomAttr = mapContainer.getAttribute("data-zoom");

    expect(centerAttr).not.toBeNull();
    expect(zoomAttr).not.toBeNull();

    if (centerAttr && zoomAttr) {
      const center = JSON.parse(centerAttr);
      const zoom = parseInt(zoomAttr, 10);

      expect(center[0]).toBeCloseTo(customCenter[0]);
      expect(center[1]).toBeCloseTo(customCenter[1]);
      expect(zoom).toBe(customZoom);
    }
  });

  it("handles empty route gracefully", () => {
    render(<Map route={[]} />);
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();

    // Should default to Tokyo coordinates
    const centerAttr = mapContainer.getAttribute("data-center");
    expect(centerAttr).not.toBeNull();

    if (centerAttr) {
      const center = JSON.parse(centerAttr);
      expect(center[0]).toBeCloseTo(35.6762);
      expect(center[1]).toBeCloseTo(139.6503);
    }
  });
});
