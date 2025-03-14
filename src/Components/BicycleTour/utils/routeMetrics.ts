export interface RoutePoint {
  lat: number;
  lng: number;
  elevation?: number;
  name?: string;
  time?: Date;
}

export interface RouteMetrics {
  distanceKm: number;
  durationHours: number;
  elevationGainMeters: number;
  startPoint: string;
  endPoint: string;
}

const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers
const AVG_CYCLING_SPEED_KMH = 20; // Average cycling speed in km/h

/**
 * Calculates the distance between two points using the Haversine formula
 */
function calculateDistance(point1: RoutePoint, point2: RoutePoint): number {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  const lat1 = toRad(point1.lat);
  const lat2 = toRad(point2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Calculates total route distance in kilometers
 */
function calculateTotalDistance(route: RoutePoint[]): number {
  if (route.length < 2) return 0;

  return route.reduce((total, point, index) => {
    if (index === 0) return 0;
    return total + calculateDistance(route[index - 1], point);
  }, 0);
}

/**
 * Estimates duration based on distance and average cycling speed
 */
function estimateDuration(distanceKm: number): number {
  return distanceKm / AVG_CYCLING_SPEED_KMH;
}

/**
 * Calculates elevation gain in meters
 */
function calculateElevationGain(route: RoutePoint[]): number {
  if (route.length < 2) return 0;

  let gain = 0;

  for (let i = 1; i < route.length; i++) {
    const prevElevation = route[i - 1].elevation || 0;
    const currentElevation = route[i].elevation || 0;

    // Only count positive elevation changes
    if (currentElevation > prevElevation) {
      gain += currentElevation - prevElevation;
    }
  }

  return gain;
}

/**
 * Calculates all metrics for a given route
 */
export function calculateRouteMetrics(route: RoutePoint[]): RouteMetrics {
  const distanceKm = calculateTotalDistance(route);
  const durationHours = estimateDuration(distanceKm);
  const elevationGainMeters = calculateElevationGain(route);

  // Handle empty route case
  if (route.length === 0) {
    return {
      distanceKm,
      durationHours,
      elevationGainMeters,
      startPoint: "N/A",
      endPoint: "N/A",
    };
  }

  return {
    distanceKm,
    durationHours,
    elevationGainMeters,
    startPoint:
      route[0].name || `${route[0].lat.toFixed(4)}, ${route[0].lng.toFixed(4)}`,
    endPoint:
      route[route.length - 1].name ||
      `${route[route.length - 1].lat.toFixed(4)}, ${route[
        route.length - 1
      ].lng.toFixed(4)}`,
  };
}
