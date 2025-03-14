import { Container, Grid, Title } from "@mantine/core";
import { Map } from "./Map";
import { RouteMetrics } from "./RouteMetrics";
import { calculateRouteMetrics } from "./utils/routeMetrics";

// Sample route data (Tokyo → Osaka → Kyoto → Tokyo)
const sampleRoute = [
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  { lat: 34.6937, lng: 135.5023, name: "Osaka" },
  { lat: 35.0116, lng: 135.7681, name: "Kyoto" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
];

export function BicycleTourPage() {
  const metrics = calculateRouteMetrics(sampleRoute);

  return (
    <Container size="xl">
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
    </Container>
  );
}
