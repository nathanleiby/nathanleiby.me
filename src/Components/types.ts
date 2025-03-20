// Common types for map components
export interface GeoProperties {
  NAME: string;
  NAME_LONG: string;
  ABBREV: string;
  POSTAL: string;
  [key: string]: string | number | boolean | null;
}

export interface MarkerData {
  name: string;
  coordinates: [number, number];
}

export interface MapState {
  fill: string;
  clickHandler?: (state: string) => void;
}
