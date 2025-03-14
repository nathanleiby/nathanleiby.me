import { Card, Group, Stack, Text, Title } from "@mantine/core";
import {
  IconClock,
  IconFlag,
  IconMountain,
  IconRuler,
} from "@tabler/icons-react";
import { type RouteMetrics as RouteMetricsType } from "./utils/routeMetrics";

/**
 * Props for the RouteMetrics component
 * @interface RouteMetricsProps
 * @property {RouteMetricsType} metrics - The calculated metrics for the bicycle route
 */
interface RouteMetricsProps {
  metrics: RouteMetricsType;
}

/**
 * Displays key metrics for a bicycle route in a card layout
 *
 * This component shows:
 * - Total distance in kilometers
 * - Estimated duration in hours (based on 20 km/h average speed)
 * - Total elevation gain in meters
 * - Start and end points of the route
 *
 * The component uses Mantine's Card component for layout and Tabler icons for visual indicators.
 * All numeric values are properly formatted for display.
 *
 * @component
 * @example
 * ```tsx
 * const metrics = {
 *   distanceKm: 100,
 *   durationHours: 5,
 *   elevationGainMeters: 1000,
 *   startPoint: "Tokyo",
 *   endPoint: "Kyoto"
 * };
 *
 * return <RouteMetrics metrics={metrics} />;
 * ```
 */
export function RouteMetrics({ metrics }: RouteMetricsProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        Route Details
      </Title>
      <Stack gap="md">
        <Group gap="xs">
          <IconRuler size={20} />
          <Text>Distance: {metrics.distanceKm.toFixed(1)} km</Text>
        </Group>
        <Group gap="xs">
          <IconClock size={20} />
          <Text>Duration: {metrics.durationHours.toFixed(1)} hours</Text>
        </Group>
        <Group gap="xs">
          <IconMountain size={20} />
          <Text>Elevation Gain: {metrics.elevationGainMeters} m</Text>
        </Group>
        <Group gap="xs">
          <IconFlag size={20} />
          <Text>
            Route: {metrics.startPoint} → {metrics.endPoint}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
