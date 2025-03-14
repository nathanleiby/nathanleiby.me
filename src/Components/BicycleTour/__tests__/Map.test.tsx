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
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Polyline: () => <div data-testid="polyline" />,
}));

describe("Map", () => {
  const sampleRoute = [
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: 34.6937, lng: 135.5023 }, // Osaka
  ];

  it("renders map container with default props", () => {
    render(<Map route={sampleRoute} />);
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });

  it("renders tile layer", () => {
    render(<Map route={sampleRoute} />);
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
  });

  it("renders route polyline", () => {
    render(<Map route={sampleRoute} />);
    expect(screen.getByTestId("polyline")).toBeInTheDocument();
  });

  it("accepts custom center and zoom props", () => {
    const customCenter: [number, number] = [35.0116, 135.7681]; // Kyoto
    const customZoom = 12;
    render(<Map route={sampleRoute} center={customCenter} zoom={customZoom} />);
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });
});
