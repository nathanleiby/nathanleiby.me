import { useMantineTheme } from "@mantine/core";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import _ from "lodash";
import countries from "./data/countries.json";

export function WorldMap() {
  const theme = useMantineTheme();

  const visitedPlaces = [
    // Asia
    "Japan",
    "China",
    "India",
    "Thailand",
    "Vietnam",

    // Europe
    "Spain",
    "Germany",
    "France",
    "United Kingdom",

    // North America
    "Canada",
    "United States",
    "Panama",
    "Costa Rica",
    "Mexico",
    "Norway",
    "Dominican Republic",
    "Haiti",

    // Africa
    "Rwanda",
    "Uganda",
    "Kenya",
    "Tanzania",
    "Botswana",
    "Zambia",

    // South America
    "Brazil",
    "Argentina",
    "Chile",
    "Uruguay",

    // Oceana
    "New Zealand",
  ];

  const isVisited = (geo: any) => {
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
    </ComposableMap>
  );
}
