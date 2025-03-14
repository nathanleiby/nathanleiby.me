import {
  Center,
  Container,
  Grid,
  Loader,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Map } from "./Map";
import { PhotoGallery, type Photo } from "./PhotoGallery";
import { RouteMetrics } from "./RouteMetrics";
import { TourSelector, type TourOption } from "./TourSelector";
import { combineDayRoutes, loadTour, type Tour } from "./utils/gpxParser";
import { calculateRouteMetrics, type RoutePoint } from "./utils/routeMetrics";

// Tour photos organized by tour ID
const tourPhotosMap: Record<string, Photo[]> = {
  "east-hokkaido": [
    {
      src: "/images/bicycle-tour/hokkaido1.jpg",
      alt: "Kushiro wetlands",
      caption: "Kushiro wetlands - Starting point",
    },
    {
      src: "/images/bicycle-tour/hokkaido2.jpg",
      alt: "Lake Akan",
      caption: "Beautiful Lake Akan",
    },
    {
      src: "/images/bicycle-tour/hokkaido3.jpg",
      alt: "Shiretoko Peninsula",
      caption: "Scenic views of Shiretoko Peninsula",
    },
  ],
  "tokyo-osaka": [
    {
      src: "/images/bicycle-tour/tokyo.jpg",
      alt: "Tokyo skyline",
      caption: "Starting point: Tokyo",
    },
    {
      src: "/images/bicycle-tour/osaka.jpg",
      alt: "Osaka castle",
      caption: "Destination: Osaka Castle",
    },
    {
      src: "/images/bicycle-tour/kyoto.jpg",
      alt: "Kyoto temple",
      caption: "Beautiful temples in Kyoto",
    },
  ],
};

// Available tours
const availableTours: Record<
  string,
  { files: { url: string; name: string }[]; name: string }
> = {
  "east-hokkaido": {
    name: "East Hokkaido Tour",
    files: [
      {
        url: "/data/gpx/east-hokkaido/day1.gpx",
        name: "Day 1: Kushiro to Lake Akan",
      },
      {
        url: "/data/gpx/east-hokkaido/day2.gpx",
        name: "Day 2: Lake Akan to Abashiri",
      },
      {
        url: "/data/gpx/east-hokkaido/day3.gpx",
        name: "Day 3: Abashiri to Utoro",
      },
      {
        url: "/data/gpx/east-hokkaido/day4.gpx",
        name: "Day 4: Utoro to Rausu",
      },
      {
        url: "/data/gpx/east-hokkaido/day5.gpx",
        name: "Day 5: Rausu to Nakashibetsu",
      },
      {
        url: "/data/gpx/east-hokkaido/day6.gpx",
        name: "Day 6: Nakashibetsu to Kushiro",
      },
    ],
  },
  "tokyo-osaka": {
    name: "Tokyo to Osaka",
    files: [
      { url: "/data/gpx/tokyo-osaka/day1.gpx", name: "Day 1: Tokyo to Hakone" },
      {
        url: "/data/gpx/tokyo-osaka/day2.gpx",
        name: "Day 2: Hakone to Shizuoka",
      },
      {
        url: "/data/gpx/tokyo-osaka/day3.gpx",
        name: "Day 3: Shizuoka to Nagoya",
      },
      { url: "/data/gpx/tokyo-osaka/day4.gpx", name: "Day 4: Nagoya to Kyoto" },
      { url: "/data/gpx/tokyo-osaka/day5.gpx", name: "Day 5: Kyoto to Osaka" },
    ],
  },
};

// Convert to tour options for the selector
const tourOptions: TourOption[] = Object.entries(availableTours).map(
  ([value, tour]) => ({
    value,
    label: tour.name,
  })
);

export function BicycleTourPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tour, setTour] = useState<Tour | null>(null);
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [metrics, setMetrics] = useState(calculateRouteMetrics([]));
  const [selectedTour, setSelectedTour] = useState("east-hokkaido");

  useEffect(() => {
    async function loadTourData() {
      try {
        setLoading(true);
        setError(null);

        const tourConfig = availableTours[selectedTour];
        if (!tourConfig) {
          throw new Error(`Tour not found: ${selectedTour}`);
        }

        // Load the selected tour
        const tourData = await loadTour(tourConfig.files, tourConfig.name);
        setTour(tourData);

        // Combine all day routes into a single route
        const combinedRoute = combineDayRoutes(tourData.days);
        setRoute(combinedRoute);

        // Calculate metrics for the combined route
        const routeMetrics = calculateRouteMetrics(combinedRoute);
        setMetrics(routeMetrics);
      } catch (err) {
        console.error("Error loading tour data:", err);
        setError("Failed to load tour data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadTourData();
  }, [selectedTour]);

  const handleTourChange = (tourId: string) => {
    setSelectedTour(tourId);
  };

  // Get the photos for the selected tour, or use empty array as fallback
  const currentTourPhotos = tourPhotosMap[selectedTour] || [];

  return (
    <Container size="md">
      <Title order={2} mb="lg">
        Bicycle Touring
      </Title>

      <TourSelector
        tours={tourOptions}
        selectedTour={selectedTour}
        onTourChange={handleTourChange}
      />

      {loading ? (
        <Center style={{ height: "400px" }}>
          <Loader size="xl" data-testid="mantine-loader" />
        </Center>
      ) : error ? (
        <Center style={{ height: "400px" }}>
          <Text color="red">{error}</Text>
        </Center>
      ) : (
        <>
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Map route={route} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <RouteMetrics metrics={metrics} />
            </Grid.Col>
          </Grid>

          <Space h="xl" />

          <Title order={3} mb="md">
            Tour Photos
          </Title>
          <PhotoGallery photos={currentTourPhotos} />
        </>
      )}
    </Container>
  );
}
