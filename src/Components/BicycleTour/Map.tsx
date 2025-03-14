import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import styles from "./Map.module.css";

// Sample route data (Tokyo → Osaka → Kyoto → Tokyo)
const sampleRoute = [
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: 34.6937, lng: 135.5023 }, // Osaka
  { lat: 35.0116, lng: 135.7681 }, // Kyoto
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
];

interface MapProps {
  center?: [number, number];
  zoom?: number;
}

export const BicycleTourMap = ({
  center = [35.6762, 139.6503], // Default center on Tokyo
  zoom = 6,
}: MapProps) => {
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
    <MapContainer center={center} zoom={zoom} className={styles.mapContainer}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={sampleRoute} color="blue" weight={3} opacity={0.7} />
    </MapContainer>
  );
};
