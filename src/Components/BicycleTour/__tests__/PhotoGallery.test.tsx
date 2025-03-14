import { describe, expect, it } from "vitest";
import { PhotoGallery, type Photo } from "../PhotoGallery";
import { render, screen } from "./test-utils";

describe("PhotoGallery", () => {
  const samplePhotos: Photo[] = [
    {
      src: "/images/bicycle-tour/tokyo.jpg",
      alt: "Tokyo skyline",
      caption: "Starting point: Tokyo",
    },
    {
      src: "/images/bicycle-tour/osaka.jpg",
      alt: "Osaka castle",
      caption: "Midpoint: Osaka Castle",
    },
  ];

  it("renders all photos with captions", () => {
    render(<PhotoGallery photos={samplePhotos} />);

    // Check if all images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    // Check if all captions are displayed
    expect(screen.getByText("Starting point: Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Midpoint: Osaka Castle")).toBeInTheDocument();
  });

  it("renders correctly with a single photo", () => {
    const singlePhoto = [samplePhotos[0]];
    render(<PhotoGallery photos={singlePhoto} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(screen.getByText("Starting point: Tokyo")).toBeInTheDocument();
  });

  it("handles empty photo array", () => {
    render(<PhotoGallery photos={[]} />);

    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });
});
