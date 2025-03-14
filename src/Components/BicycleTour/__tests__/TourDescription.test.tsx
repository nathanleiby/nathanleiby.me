import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TourDescription } from "../TourDescription";
import { render } from "./test-utils";

describe("TourDescription", () => {
  it("renders the component with title", () => {
    render(<TourDescription tourId="east-hokkaido" />);

    expect(screen.getByText("Tour Description")).toBeInTheDocument();
  });

  it("displays overview section for East Hokkaido tour", () => {
    render(<TourDescription tourId="east-hokkaido" />);

    // Check that the title is rendered
    expect(screen.getByText("Tour Description")).toBeInTheDocument();

    // Check for text content in the overview section
    expect(
      screen.getByText(/My adventure through Eastern Hokkaido/)
    ).toBeInTheDocument();

    // Find the list items in the overview section
    const listItems = screen.getAllByRole("listitem");

    // Check that the starting point information is present
    const startingPointText = listItems.find(
      (item) =>
        item.textContent?.includes("Starting Point") &&
        item.textContent?.includes("Shiretoko-Shari")
    );
    expect(startingPointText).toBeTruthy();

    // Check that other overview elements are rendered
    const mainJourneyText = listItems.find((item) =>
      item.textContent?.includes("Main Journey")
    );
    expect(mainJourneyText).toBeTruthy();

    const returnText = listItems.find((item) =>
      item.textContent?.includes("Return")
    );
    expect(returnText).toBeTruthy();
  });

  it("displays day-by-day section when clicked", async () => {
    render(<TourDescription tourId="east-hokkaido" />);

    // Click on the Day-by-Day accordion item
    const dayByDayButton = screen.getByText("Day-by-Day");
    await userEvent.click(dayByDayButton);

    // Day-by-day content should now be visible
    await waitFor(() => {
      expect(screen.getByText(/Day 1: Shari to Utoro/)).toBeInTheDocument();
      expect(screen.getByText(/Day 2: Utoro to Rausu/)).toBeInTheDocument();
      expect(
        screen.getByText(/Day 3: Rausu to Nakashibetsu/)
      ).toBeInTheDocument();
    });
  });

  it("displays route tips section when clicked", async () => {
    render(<TourDescription tourId="east-hokkaido" />);

    // Click on the Route Tips accordion item
    const routeTipsButton = screen.getByText("Route Tips");
    await userEvent.click(routeTipsButton);

    // Route tips content should now be visible
    await waitFor(() => {
      expect(
        screen.getByText(/Alternative Starting Point/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Consider starting from Abashiri/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Road Safety/)).toBeInTheDocument();
    });
  });

  it("displays Tokyo to Osaka tour description", () => {
    render(<TourDescription tourId="tokyo-osaka" />);

    // Check that the title is rendered
    expect(screen.getByText("Tour Description")).toBeInTheDocument();

    // Check for text content in the overview section
    expect(
      screen.getByText(/Tokyo to Osaka: A Classic 5-Day Cycling Route/)
    ).toBeInTheDocument();

    // Find the list items in the overview section
    const listItems = screen.getAllByRole("listitem");

    // Check that the starting point information is present
    const startingPointText = listItems.find(
      (item) =>
        item.textContent?.includes("Starting Point") &&
        item.textContent?.includes("Tokyo")
    );
    expect(startingPointText).toBeTruthy();

    // Check that other overview elements are rendered
    const mainJourneyText = listItems.find((item) =>
      item.textContent?.includes("Main Journey")
    );
    expect(mainJourneyText).toBeTruthy();

    // Check that the highlights section is rendered
    expect(screen.getByText("Highlights")).toBeInTheDocument();
  });

  it("shows fallback message for unknown tour ID", () => {
    render(<TourDescription tourId="non-existent-tour" />);

    expect(
      screen.getByText("No description available for this tour.")
    ).toBeInTheDocument();
  });

  it("renders the correct accordion sections based on tour content", () => {
    render(<TourDescription tourId="tokyo-osaka" />);

    // Tokyo-Osaka tour has Overview but no Day-by-Day or Route Tips sections
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.queryByText("Day-by-Day")).not.toBeInTheDocument();
    expect(screen.queryByText("Route Tips")).not.toBeInTheDocument();
  });
});
