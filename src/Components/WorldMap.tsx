import { useMantineTheme } from "@mantine/core";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps";

import _ from "lodash";
import countries from "./data/countries.json";

interface WorldMapProps {
  markers?: Array<{
    name: string;
    coordinates: [number, number];
  }>;
}

const WorldMap: React.FC<WorldMapProps> = ({ markers = [] }) => {
  const theme = useMantineTheme();

  const visitedPlaces = [
    // Asia
    "Japan",
    "China",
    "India",
    "Sri Lanka",
    "Thailand",
    "Vietnam",
    "Philippines",
    "Taiwan",

    // Europe
    "Spain",
    "Germany",
    "France",
    "United Kingdom",
    "Norway",
    "Netherlands",

    // North America
    "Canada",
    "United States",
    "Panama",
    "Costa Rica",
    "Mexico",
    "Dominican Republic",
    "Haiti",

    // Africa
    "Rwanda",
    "Uganda",
    "Kenya",
    "Tanzania",
    "Botswana",
    "Zambia",
    "Madagascar",

    // South America
    "Brazil",
    "Argentina",
    "Chile",
    "Uruguay",
    "Ecuador",

    // Oceana
    "New Zealand",
  ];

  interface GeoFeature {
    properties: {
      name: string;
    };
  }

  const isVisited = (geo: GeoFeature) => {
    return _.includes(visitedPlaces, geo.properties.name);
  };

  return (
    <ComposableMap>
      <Graticule stroke="#E4E5E6" strokeWidth={2.0} />
      <Geographies
        geography={countries}
        style={{
          outline: "none",
        }}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              stroke={theme.colors.gray[6]}
              fill={
                isVisited(geo) ? theme.colors.green[3] : theme.colors.gray[0]
              }
              // disable onClick border (https://github.com/zcreativelabs/react-simple-maps/issues/252)
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>

      {markers.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={8} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={-12}
            style={{
              fontFamily: "system-ui",
              fill: "#5D5A6D",
              fontSize: ".6rem",
            }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default WorldMap;
