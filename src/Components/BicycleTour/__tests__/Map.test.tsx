import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Map from "../Map";

interface MockMapContainerProps {
  children: ReactNode;
  center: [number, number];
  zoom: number;
}

interface MockTileLayerProps {
  url: string;
}

interface MockPolylineProps {
  positions: [number, number][];
}

interface MockMarkerProps {
  position: [number, number];
  children: ReactNode;
}

interface MockTooltipProps {
  children: ReactNode;
}

// Mock Leaflet components
vi.mock("react-leaflet", () => ({
  MapContainer: ({ children, center, zoom }: MockMapContainerProps) => (
    <div data-testid="map-container" data-center={center} data-zoom={zoom}>
      {children}
    </div>
  ),
  TileLayer: ({ url }: MockTileLayerProps) => (
    <div data-testid="tile-layer" data-url={url} />
  ),
  Polyline: ({ positions }: MockPolylineProps) => (
    <div data-testid="polyline" data-positions={JSON.stringify(positions)} />
  ),
  Marker: ({ position, children }: MockMarkerProps) => (
    <div data-testid="marker" data-position={JSON.stringify(position)}>
      {children}
    </div>
  ),
  Tooltip: ({ children }: MockTooltipProps) => (
    <div data-testid="tooltip">{children}</div>
  ),
}));

// Mock Leaflet library
vi.mock("leaflet", () => ({
  default: {
    icon: vi.fn(() => ({
      iconUrl: "",
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, 0],
    })),
    Icon: {
      Default: {
        prototype: {},
        mergeOptions: vi.fn(),
      },
    },
  },
}));

describe("Map", () => {
  const sampleRoute = [
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: 34.6937, lng: 135.5023 }, // Osaka
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders map container with auto-calculated center", () => {
    render(<Map route={sampleRoute} />);
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();

    // Center should be calculated as average of route points
    const expectedCenter = [(35.6762 + 34.6937) / 2, (139.6503 + 135.5023) / 2];
    expect(mapContainer.getAttribute("data-center")).toBe(
      expectedCenter.toString()
    );
  });

  it("renders tile layer", () => {
    render(<Map route={sampleRoute} />);
    const tileLayer = screen.getByTestId("tile-layer");
    expect(tileLayer).toBeInTheDocument();
    expect(tileLayer.getAttribute("data-url")).toBe(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
  });

  it("renders route polyline with correct positions", () => {
    render(<Map route={sampleRoute} />);
    const polyline = screen.getByTestId("polyline");
    expect(polyline).toBeInTheDocument();

    const positions = JSON.parse(
      polyline.getAttribute("data-positions") || "[]"
    );
    expect(positions).toHaveLength(2);
    expect(positions[0]).toEqual([35.6762, 139.6503]);
    expect(positions[1]).toEqual([34.6937, 135.5023]);
  });

  it("accepts and prioritizes custom center and zoom props", () => {
    const customCenter: [number, number] = [40, 140];
    const customZoom = 10;

    render(<Map route={sampleRoute} center={customCenter} zoom={customZoom} />);

    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer.getAttribute("data-center")).toBe(
      customCenter.toString()
    );
    expect(mapContainer.getAttribute("data-zoom")).toBe(customZoom.toString());
  });

  it("handles empty route gracefully", () => {
    render(<Map route={[]} />);

    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();

    // Should default to Tokyo coordinates
    expect(mapContainer.getAttribute("data-center")).toBe("35.6762,139.6503");
  });
});
