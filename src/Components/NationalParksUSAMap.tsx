import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { useMantineTheme } from "@mantine/core";
import _ from "lodash";
import nationalParks from "./data/national-parks.geo.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// TODO: Consider a different viz of regions vs points
// - https://observablehq.com/@erincaughey/national-parks-geojson
// - https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States#/map/0
// - https://www.nps.gov/maps/tools/npmap.js/examples/geojson-layer/index.html

// https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States
// TODO: This list (63 items) doesn't quite align

const visitedPlaces = [
  // "Wolf Trap National Park for the Performing Arts",
  // "National Park of American Samoa",
  // "Virgin Islands National Park",
  "Hot Springs National Park",
  "Acadia National Park",
  // "Haleakala National Park",
  // "Congaree National Park",
  // "Black Canyon Of The Gunnison National Park",
  // "Cuyahoga Valley National Park",
  "Carlsbad Caverns National Park",
  // "Hawaii Volcanoes National Park",
  // "Mammoth Cave National Park",
  "Crater Lake National Park",
  // "Everglades National Park",
  "Grand Canyon National Park",
  "Great Smoky Mountains National Park",
  // "Isle Royale National Park",
  "Mount Rainier National Park",
  "North Cascades National Park",
  "Olympic National Park",
  "Rocky Mountain National Park",
  // "Saguaro National Park",
  "Shenandoah National Park",
  // "Glacier National Park",
  "Arches National Park",
  // "Voyageurs National Park",
  // "Theodore Roosevelt National Park",
  // "Dry Tortugas National Park",
  "Bryce Canyon National Park",
  // "Yellowstone National Park",
  // "Grand Teton National Park",
  // "Badlands National Park",
  "Zion National Park",
  // "Mesa Verde National Park",
  // "Great Basin National Park",
  "Capitol Reef National Park",
  "Canyonlands National Park",
  // "Great Sand Dunes National Park & Preserve",
  "Lassen Volcanic National Park",
  "Petrified Forest National Park",
  // "Biscayne National Park",
  // "Guadalupe Mountains National Park",
  // "Wind Cave National Park",
  // "Big Bend National Park",
  "Death Valley National Park",
  "Yosemite National Park",
  // "Kings Canyon National Park",
  "Joshua Tree National Park",
  // "Sequoia & Kings Canyon National Parks",
  // "Channel Islands National Park",
  // "Denali National Park & Preserve",
  // "Gates Of The Arctic National Park & Preserve",
  "Glacier Bay National Park & Preserve",
  // "Katmai National Park & Preserve",
  // "Kenai Fjords National Park",
  // "Kobuk Valley National Park",
  // "Lake Clark National Park & Preserve",
  // "Wrangell - St Elias National Park & Preserve",
  //// TODO:
  // "White Sands National Park",
];

const nationalParksOnly = _.filter(nationalParks.features, (x) => {
  return _.includes(x.properties.Name, "National Park");
});

const geography = {
  type: "FeatureCollection",
  features: nationalParksOnly,
};

console.log(nationalParksOnly.map((x) => x.properties.Name));

export const NationalParksUSAMap = () => {
  const theme = useMantineTheme();

  const isVisited = (geo: any) => {
    return _.includes(visitedPlaces, geo.properties.Name);
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
                fill={theme.colors.gray[0]}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))}
          </>
        )}
      </Geographies>

      <Geographies geography={geography}>
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
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};
