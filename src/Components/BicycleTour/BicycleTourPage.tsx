import { Container, Grid, Space, Title } from "@mantine/core";
import { Map } from "./Map";
import { PhotoGallery, type Photo } from "./PhotoGallery";
import { RouteMetrics } from "./RouteMetrics";
import { calculateRouteMetrics } from "./utils/routeMetrics";

// Sample route data (Tokyo → Osaka → Kyoto → Tokyo)
const sampleRoute = [
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  { lat: 34.6937, lng: 135.5023, name: "Osaka" },
  { lat: 35.0116, lng: 135.7681, name: "Kyoto" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
];

// Sample photos for the route
const tourPhotos: Photo[] = [
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
  {
    src: "/images/bicycle-tour/kyoto.jpg",
    alt: "Kyoto temple",
    caption: "Beautiful temples in Kyoto",
  },
];

export function BicycleTourPage() {
  const metrics = calculateRouteMetrics(sampleRoute);

  return (
    <Container size="md">
      <Title order={2} mb="lg">
        Bicycle Touring
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Map route={sampleRoute} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <RouteMetrics metrics={metrics} />
        </Grid.Col>
      </Grid>

      <Space h="xl" />

      <Title order={3} mb="md">
        Tour Photos
      </Title>
      <PhotoGallery photos={tourPhotos} />
    </Container>
  );
}
