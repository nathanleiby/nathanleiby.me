import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TourSelector, type TourOption } from "../TourSelector";

// Wrapper component with MantineProvider for testing
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("TourSelector", () => {
  const mockTours: TourOption[] = [
    { value: "east-hokkaido", label: "East Hokkaido Tour" },
    { value: "tokyo-osaka", label: "Tokyo to Osaka" },
  ];

  it("renders with the correct selected tour", () => {
    render(
      <TourSelector
        tours={mockTours}
        selectedTour="east-hokkaido"
        onTourChange={() => {}}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("Select Tour")).toBeInTheDocument();
    expect(screen.getByText("East Hokkaido Tour")).toBeInTheDocument();
  });

  it("calls onTourChange when a new tour is selected", async () => {
    const handleTourChange = vi.fn();

    render(
      <TourSelector
        tours={mockTours}
        selectedTour="east-hokkaido"
        onTourChange={handleTourChange}
      />,
      { wrapper: TestWrapper }
    );

    // Open the dropdown
    fireEvent.click(screen.getByText("East Hokkaido Tour"));

    // Select the second option
    fireEvent.click(screen.getByText("Tokyo to Osaka"));

    expect(handleTourChange).toHaveBeenCalledWith("tokyo-osaka");
  });

  it("displays all available tours in the dropdown", async () => {
    render(
      <TourSelector
        tours={mockTours}
        selectedTour="east-hokkaido"
        onTourChange={() => {}}
      />,
      { wrapper: TestWrapper }
    );

    // Open the dropdown
    fireEvent.click(screen.getByText("East Hokkaido Tour"));

    // Check that all options are displayed
    expect(screen.getByText("East Hokkaido Tour")).toBeInTheDocument();
    expect(screen.getByText("Tokyo to Osaka")).toBeInTheDocument();
  });

  it("handles empty tours array gracefully", () => {
    render(
      <TourSelector tours={[]} selectedTour="" onTourChange={() => {}} />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("Select Tour")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Choose a bicycle tour")
    ).toBeInTheDocument();
  });
});
