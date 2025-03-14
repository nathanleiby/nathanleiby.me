import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import styles from "./Map.module.css";
import { type DayRoute } from "./utils/gpxParser";
import { type RoutePoint } from "./utils/routeMetrics";

// Sample route data (Tokyo → Osaka → Kyoto → Tokyo)
const sampleRoute = [
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: 34.6937, lng: 135.5023 }, // Osaka
  { lat: 35.0116, lng: 135.7681 }, // Kyoto
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
];

interface MapProps {
  route: RoutePoint[];
  center?: [number, number];
  zoom?: number;
  days?: DayRoute[];
}

/**
 * Calculates the center point of a route
 * @param route Array of route points with lat/lng coordinates
 * @returns Center coordinates as [lat, lng]
 */
function calculateRouteCenter(route: RoutePoint[]): [number, number] {
  if (route.length === 0) {
    // Default to Tokyo if no route points
    return [35.6762, 139.6503];
  }

  // Calculate the average of all coordinates
  const sumLat = route.reduce((sum, point) => sum + point.lat, 0);
  const sumLng = route.reduce((sum, point) => sum + point.lng, 0);

  return [sumLat / route.length, sumLng / route.length];
}

/**
 * Calculates appropriate zoom level based on route bounds
 * @param route Array of route points with lat/lng coordinates
 * @returns Zoom level (default: 7)
 */
function calculateZoomLevel(route: RoutePoint[]): number {
  if (route.length <= 1) {
    return 7; // Default zoom for single point or empty route
  }

  // Find min/max coordinates to determine bounds
  const lats = route.map((point) => point.lat);
  const lngs = route.map((point) => point.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Calculate the distance
  const latDistance = maxLat - minLat;
  const lngDistance = maxLng - minLng;

  // Simple heuristic for zoom level
  const maxDistance = Math.max(latDistance, lngDistance);

  if (maxDistance > 10) return 5;
  if (maxDistance > 5) return 6;
  if (maxDistance > 2) return 7;
  if (maxDistance > 1) return 8;
  if (maxDistance > 0.5) return 9;
  return 10;
}

// Create custom icons for end and day markers
const createCustomIcon = (iconUrl: string, iconSize: [number, number]) => {
  // Check if we're in a test environment where L.icon might not be available
  if (typeof L.icon !== "function") {
    // For tests, just skip icon creation
    return undefined;
  }

  return L.icon({
    iconUrl,
    iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
    popupAnchor: [0, -iconSize[1]],
  });
};

export function Map({ route, center, zoom, days }: MapProps) {
  // Calculate center and zoom if not provided
  const calculatedCenter = useMemo(
    () => center || calculateRouteCenter(route),
    [route, center]
  );
  const calculatedZoom = useMemo(
    () => zoom || calculateZoomLevel(route),
    [route, zoom]
  );

  // Convert route to array of [lat, lng] for Polyline
  const routePoints = useMemo(
    () => route.map((point) => [point.lat, point.lng] as [number, number]),
    [route]
  );

  // Get end point
  const endPoint = useMemo(
    () => (route.length > 0 ? route[route.length - 1] : null),
    [route]
  );

  // Create custom icons
  const endIcon = useMemo(
    () => createCustomIcon("/images/bicycle-tour/end-marker.png", [32, 32]),
    []
  );

  // Create day marker icons
  const dayIcons = useMemo(() => {
    const icons = [];
    for (let i = 1; i <= 10; i++) {
      icons.push(
        createCustomIcon(`/images/bicycle-tour/day-${i}.png`, [24, 24])
      );
    }
    return icons;
  }, []);

  // Extract day starting points
  const dayStartPoints = useMemo(() => {
    if (!days) return [];

    return days.map((day, index) => ({
      point: day.points[0],
      name: day.name,
      index,
    }));
  }, [days]);

  // Fix for Leaflet icon paths in production
  useEffect(() => {
    // This is needed to fix Leaflet's icon paths in production
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={calculatedCenter}
      zoom={calculatedZoom}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={routePoints} color="blue" weight={3} opacity={0.7} />

      {/* End marker */}
      {endPoint && endIcon && (
        <Marker position={[endPoint.lat, endPoint.lng]} icon={endIcon}>
          <Tooltip>Finish</Tooltip>
        </Marker>
      )}

      {/* Day markers */}
      {dayStartPoints.map((dayPoint, index) => {
        const icon = dayIcons[index % dayIcons.length];
        if (!icon) return null;

        return (
          <Marker
            key={`day-${index + 1}`}
            position={[dayPoint.point.lat, dayPoint.point.lng]}
            icon={icon}
          >
            <Tooltip>
              Day {index + 1}: {dayPoint.name.split(": ")[1] || dayPoint.name}
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
