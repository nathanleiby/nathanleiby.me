import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BicycleTourMap } from "../Map";

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

describe("BicycleTourMap", () => {
  it("renders map container with default props", () => {
    render(<BicycleTourMap />);
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });

  it("renders tile layer", () => {
    render(<BicycleTourMap />);
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
  });

  it("renders route polyline", () => {
    render(<BicycleTourMap />);
    expect(screen.getByTestId("polyline")).toBeInTheDocument();
  });

  it("accepts custom center and zoom props", () => {
    const customCenter: [number, number] = [35.0116, 135.7681]; // Kyoto
    const customZoom = 12;
    render(<BicycleTourMap center={customCenter} zoom={customZoom} />);
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });
});
