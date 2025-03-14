import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Map } from "../Map";

// Mock react-leaflet components
vi.mock("react-leaflet", () => {
  return {
    MapContainer: ({ children, center, zoom, className }: any) => (
      <div
        data-testid="map-container"
        data-center={center}
        data-zoom={zoom}
        className={className}
      >
        {children}
      </div>
    ),
    TileLayer: ({ url, attribution }: any) => (
      <div
        data-testid="tile-layer"
        data-url={url}
        data-attribution={attribution}
      ></div>
    ),
    Polyline: ({ positions, color, weight, opacity }: any) => (
      <div
        data-testid="polyline"
        data-positions={JSON.stringify(positions)}
        data-color={color}
        data-weight={weight}
        data-opacity={opacity}
      ></div>
    ),
    Marker: ({ position, children }: any) => (
      <div data-testid="marker" data-position={JSON.stringify(position)}>
        {children}
      </div>
    ),
    Tooltip: ({ children }: any) => <div data-testid="tooltip">{children}</div>,
  };
});

// Mock leaflet
vi.mock("leaflet", () => {
  return {
    default: {
      icon: vi.fn(),
      Icon: {
        Default: {
          prototype: {
            _getIconUrl: {},
          },
          mergeOptions: vi.fn(),
        },
      },
    },
  };
});

describe("Map", () => {
  const sampleRoute = [
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: 34.6937, lng: 135.5023 }, // Osaka
  ];

  const sampleDays = [
    {
      name: "Day 1: Tokyo to Osaka",
      points: [
        { lat: 35.6762, lng: 139.6503 }, // Tokyo
        { lat: 35.3, lng: 138.5 }, // Midpoint
        { lat: 34.6937, lng: 135.5023 }, // Osaka
      ],
    },
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
