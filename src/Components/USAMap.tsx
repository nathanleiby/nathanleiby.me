import { geoCentroid } from "d3-geo";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { useMantineTheme } from "@mantine/core";
import _ from "lodash";
import usStates from "./data/us-states.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets: { [state_code: string]: [number, number] } = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const visitedPlaces = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  // "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  // "Idaho",
  "Illinois",
  "Indiana",
  // "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  // "Montana",
  "Nebraska",
  "Nevada",
  // "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  // "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  // "West Virginia",
  // "Wisconsin",
  // "Wyoming",
];

export const USAMap = () => {
  const theme = useMantineTheme();

  const isVisited = (geo: any) => {
    return _.includes(visitedPlaces, geo.properties.name);
  };

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke={theme.colors.gray[6]}
                geography={geo}
                fill={
                  isVisited(geo) ? theme.colors.green[3] : theme.colors.gray[0]
                }
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = usStates.find((s) => s.val === geo.id);
              const visited = isVisited(geo);

              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text
                          y="2"
                          fontSize={14}
                          textAnchor="middle"
                          fill={visited ? "green" : "black"}
                        >
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                        // @ts-ignore
                        connectorProps={undefined}
                      >
                        <text
                          x={4}
                          fontSize={14}
                          alignmentBaseline="middle"
                          fill={visited ? "green" : "black"}
                        >
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};
