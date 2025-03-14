import { MantineProvider } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BicycleTourPage } from "../BicycleTourPage";
import * as gpxParser from "../utils/gpxParser";

// Mock the gpxParser module
vi.mock("../utils/gpxParser", () => ({
  loadTour: vi.fn(),
  combineDayRoutes: vi.fn(),
}));

// Wrapper component with MantineProvider for testing
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("BicycleTourPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state while fetching GPX data", () => {
    // Mock loadTour to return a promise that doesn't resolve immediately
    vi.mocked(gpxParser.loadTour).mockReturnValue(new Promise(() => {}));

    render(<BicycleTourPage />, { wrapper: TestWrapper });

    // Check that loading indicator is displayed (Loader component)
    expect(screen.getByTestId("mantine-loader")).toBeInTheDocument();
  });

  it("displays error message when GPX loading fails", async () => {
    // Mock loadTour to return a rejected promise
    vi.mocked(gpxParser.loadTour).mockRejectedValue(
      new Error("Failed to load GPX")
    );

    render(<BicycleTourPage />, { wrapper: TestWrapper });

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText("Failed to load tour data. Please try again later.")
      ).toBeInTheDocument();
    });
  });

  it("displays tour data when GPX loading succeeds", async () => {
    // Mock successful tour data
    const mockTourData = {
      name: "Test Tour",
      days: [
        {
          name: "Day 1",
          date: new Date("2023-01-01"),
          points: [
            {
              lat: 35.6762,
              lng: 139.6503,
              elevation: 10,
              time: new Date(),
              name: "Tokyo",
            },
            {
              lat: 35.68,
              lng: 139.77,
              elevation: 20,
              time: new Date(),
              name: "Tokyo Tower",
            },
          ],
        },
      ],
    };

    // Mock the combineDayRoutes function
    vi.mocked(gpxParser.combineDayRoutes).mockReturnValue([
      {
        lat: 35.6762,
        lng: 139.6503,
        elevation: 10,
        time: new Date(),
        name: "Tokyo",
      },
      {
        lat: 35.68,
        lng: 139.77,
        elevation: 20,
        time: new Date(),
        name: "Tokyo Tower",
      },
    ]);

    vi.mocked(gpxParser.loadTour).mockResolvedValue(mockTourData);

    render(<BicycleTourPage />, { wrapper: TestWrapper });

    // Wait for the tour data to load and render
    await waitFor(() => {
      // Check that the tour selector is displayed
      expect(screen.getByText("Select Tour")).toBeInTheDocument();

      // Check that the loading indicator is no longer displayed
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

      // Check that the error message is not displayed
      expect(
        screen.queryByText("Failed to load tour data. Please try again later.")
      ).not.toBeInTheDocument();
    });
  });
});
